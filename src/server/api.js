import fetch from 'isomorphic-fetch';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import {isNil} from 'ramda';

import {upsert as upsertUser} from './db/user';
import {create as createRace, load as loadRaces, update as updateRace} from './db/race';
import logger from './logger';

const SEVEN_DAYS_IN_SECONDS = 60 * 60 * 24 * 7;
const SECRET = fs.readFileSync('private.key');
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

        return upsertUser(json).then(jornetUser => {
          logger.log(`Creating JWT token for jornet user: ${jornetUser.id}`);
          const jwtToken = jwt.sign({jornetUser}, SECRET, {expiresIn: SEVEN_DAYS_IN_SECONDS});
          return {...jornetUser, token: jwtToken};
        });
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

/** /races */
const postRace = (req, res) => {
  return createRace(req.body).then(race => res.json(race));
};

const getRaces = (req, res) => {
  const search = req.query ? req.query : {};
  return loadRaces(search)
    .then(races => res.json(races));
};

const putRace = (req, res) => {
  return updateRace(req.params.id, req.body).then(race => res.json(race));
};

/**
 * Ensures that the given request has a valid Bearer token
 * @param {object} req The express request object
 * @param {object} res The express response object
 * @param {Function} next Next function
 */
const authMiddleware = (req, res, next, isAdminRequired = false) => {
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

    // validate admin privileges
    if (isAdminRequired && !decodedJwt.jornetUser.is_admin) {
      logger.error(`${decodedJwt.jornetUser.email_address} is not an admin but is trying to execute ${req.url}`);
      res.status(403);
      return res.json({error: 'Admin prilileges required to execute this API'});
    }

    req.user = decodedJwt.jornetUser;
    return next();
  };

  // Bearer abc --> abc
  const token = bearer.split(' ')[1];
  return jwt.verify(token, SECRET, onJwtDecoded);
};

const adminMiddleware = (req, res, next) => authMiddleware(req, res, next, true);

/**
 * Top level function that defines what functions will handle what API requests
 * @param {object} expressApp The express app to add any API definitions to
 */
const init = expressApp => {
  expressApp.use(bodyParser.json());
  /* authenticating in via OAuth */
  expressApp.post('/api/oauth', authenticate);

  /* retrieve all races */
  expressApp.get('/api/races', authMiddleware, getRaces);

  // requires admin privileges
  expressApp.post('/api/races', adminMiddleware, postRace);
  expressApp.put('/api/races/:id', adminMiddleware, putRace);
};

export default init;
