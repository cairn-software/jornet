import {isNil} from 'ramda';
import jwt from 'jsonwebtoken';
import fs from 'fs';
const SECRET = fs.readFileSync('private.key');

import pg from './pg';
import logger from '../logger';

const toStravaDbUser = stravaUser => ({
  id: stravaUser.athlete.id,
  email_address: stravaUser.athlete.email,
  first_name: stravaUser.athlete.firstname,
  last_name: stravaUser.athlete.lastname,
  city: stravaUser.athlete.city,
  state: stravaUser.athlete.state,
  country: stravaUser.athlete.country,
  sex: stravaUser.athlete.sex,
  photo: stravaUser.athlete.profile,
  bearer_token: jwt.sign({access_token: stravaUser.access_token}, SECRET)
});

/**
 * Creates a new user
 * @param {object} stravaUser The strava user to create in jornet
 * @return {object} The newly created user
 */
const create = (stravaUser) => {
  logger.log(`Creating strava user: ${stravaUser.id}`);
  const newUser = toStravaDbUser(stravaUser);
  return pg('strava_user')
    .returning('id')
    .insert(newUser)
    .then(stravaId => {
      return pg('jornet_user')
        .returning()
        .insert({strava_id: Number(stravaId)})
        .then(jornetUser => jornetUser);
    });
};

/**
 * Retrieve a user by their jornet ID
 * @param {number} jornetId The jornet user ID
 * @return {object} The user with the given jornet ID
 */
const retrieve = (jornetId) => {
  logger.log(`Loading user with id: ${jornetId}`);
  return pg('jornet_user')
    .innerJoin('strava_user', 'strava_user.id', 'jornet_user.strava_id')
    .where({id: jornetId})
    .select()
    .then(users => isNil(users) ? null : users[0]);
};

/**
 * Updates a strava user in the database
 * @param {object} stravaUser The strava user to update
 * @return {object} The updated user
 */
const update = stravaUser => {
  logger.log(`Updating strava user: ${stravaUser.athlete.id}`);
  const updateUser = toStravaDbUser(stravaUser);
  return pg('strava_user')
    .returning()
    .where('id', '=', stravaUser.athlete.id)
    .update(updateUser)
    .then(() => {
      return pg('jornet_user')
        .returning(['id', 'strava_id', 'last_login'])
        .where('strava_id', '=', stravaUser.athlete.id)
        .update({strava_id: stravaUser.athlete.id})
        .then(jornetUsers => jornetUsers[0]);
    });
};

/**
 * Upserts a strava user into the DB
 * @param {object} stravaUser The strava user
 * @return {object} The upserted user
 */
const upsert = stravaUser => {
  return pg('strava_user')
    .where({id: stravaUser.athlete.id})
    .select()
    .then(user => {
      return isNil(user) || user.length <= 0 ?
        create(stravaUser) :
        update(stravaUser);
    });
};


export {create, retrieve, upsert};
