import fetch from 'isomorphic-fetch';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import {isNil} from 'ramda';

import {upsert} from './db/user';
import logger from './logger';

const SEVEN_DAYS_IN_SECONDS = 60 * 60 * 24 * 7;
const SECRET = fs.readFileSync('private.key');

/**
 * If user does not exist, create user, then create session and return mashup of them all
 * @param {object} stravaUser The strava user to create
 * @param {object} res The express response object
 * @return {object} The newly created user and session token
 */
const createUserAndToken = stravaUser => {
  return upsert(stravaUser).then(jornetUser => {
    logger.log(`Creating JWT token for jornet user: ${jornetUser.id}`);
    const jwtToken = jwt.sign({jornetUser}, SECRET, {expiresIn: SEVEN_DAYS_IN_SECONDS});
    return {...jornetUser, token: jwtToken};
  });
};

/**
 * Handles authenticating with strava, by exchanging the OAuth code for an access token
 * @param {object} req The express request object
 * @param {object} res The express response object
 */
const authenticate = (req, res) => {
  const {code} = req.body;
  const clientSecret = process.env.JORNET_STRAVA_CLIENT_SECRET;
  const clientId = process.env.JORNET_STRAVA_CLIENT_ID;

  const config = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': 'jornet',
    },
    body: JSON.stringify({code, client_secret: clientSecret, client_id: clientId}),
  };

  logger.log(`Making request to Strava with config: ${JSON.stringify(config)}`);
  return fetch('https://www.strava.com/oauth/token', config)
    .then(response => {
      return response.json().then(json => {
        if (!response.ok) {
          res.status(502);
          res.json(json);
          return null;
        }

        return createUserAndToken(json).then(user => res.json(user));
      });
    })
    .catch(e => {
      logger.error(e);
      if (e.name && e.name === 'FetchError') {
        res.status(502);
        return res.json({error: 'Failed to exchange OAuth code for access token', details: e.reason});
      }

      res.status(500);
      return res.json({error: 'Failed to exchange OAuth code for access token'});
    });
};

/**
 * Ensures that the given request has a valid Bearer token
 * @param {object} req The express request object
 * @param {object} res The express response object
 * @param {Function} next Next function
 */
const authMiddleware = (req, res, next) => {
  // check if the user is authenticated and, if so, attach user to the request
  const bearer = req.headers.authorization;
  if (isNil(bearer)) {
    res.status(401);
    return res.json({error: 'Invalid bearer token'});
  }

  const onJwtDecoded = (err, decodedJwt) => {
    if (err) {
      logger.error(`Failed to decode bearer token: ${err}`);
      res.status(401);
      return res.json({error: 'Bearer token has expired'});
    }

    req.user = decodedJwt.user;
    return next();
  };

  // Bearer abc --> abc
  const token = bearer.split(' ')[1];
  return jwt.verify(token, SECRET, onJwtDecoded);
};

/**
 * Top level function that defines what functions will handle what API requests
 * @param {object} expressApp The express app to add any API definitions to
 */
const init = expressApp => {
  expressApp.use(bodyParser.json());
  expressApp.get('/api/races', authMiddleware, () => ({todo: true}));
  expressApp.post('/api/oauth', authenticate);
};

export default init;
