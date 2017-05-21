import {isNil} from 'ramda';
import jwt from 'jsonwebtoken';
import fs from 'fs';
const SECRET = fs.readFileSync('private.key');

import pg from './pg';
import logger from '../logger';

const toJornetUser = stravaUser => ({
  strava_id: stravaUser.athlete.id,
  email_address: stravaUser.athlete.email,
  first_name: stravaUser.athlete.firstname,
  last_name: stravaUser.athlete.lastname,
  city: stravaUser.athlete.city,
  state: stravaUser.athlete.state,
  country: stravaUser.athlete.country,
  sex: stravaUser.athlete.sex,
  photo: stravaUser.athlete.profile,
  bearer_token: jwt.sign({access_token: stravaUser.access_token}, SECRET),
});

/**
 * Creates a new user
 * @param {object} stravaUser The strava user to create in jornet
 * @return {object} The newly created user
 */
const create = stravaUser => {
  logger.log(`Creating strava user: ${JSON.stringify(stravaUser)}`);
  const newUser = toJornetUser(stravaUser);
  return pg('jornet_user').returning('*').insert(newUser).then(users => (isNil(users) ? null : users[0]));
};

/**
 * Retrieve a user by their jornet ID
 * @param {number} jornetId The jornet user ID
 * @return {object} The user with the given jornet ID
 */
const retrieve = jornetId => {
  logger.log(`Loading user with id: ${jornetId}`);
  return pg('jornet_user').where({id: jornetId}).select().then(users => (isNil(users) ? null : users[0]));
};

/**
 * Updates a strava user in the database
 * @param {object} stravaUser The strava user to update
 * @return {object} The updated user
 */
const update = stravaUser => {
  logger.log(`Updating strava user: ${stravaUser.athlete.id}`);
  const updateUser = toJornetUser(stravaUser);
  return pg('jornet_user')
    .returning('*')
    .where('strava_id', '=', stravaUser.athlete.id)
    .update(updateUser)
    .then(users => (isNil(users) ? null : users[0]));
};

/**
 * Upserts a user into the DB
 * @param {object} stravaUser The strava user
 * @return {object} The upserted user
 */
const upsert = stravaUser => {
  return pg('jornet_user').where({strava_id: stravaUser.athlete.id}).select().then(user => {
    return isNil(user) || user.length <= 0 ? create(stravaUser) : update(stravaUser);
  });
};

export {create, retrieve, upsert};
