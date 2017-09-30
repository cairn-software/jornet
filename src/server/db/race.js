import pg from './pg';
import logger from '../logger';
import {buildWhereRaw} from './util';

const allFields = ['id', 'name', 'start_date', 'type', 'website', 'distance', 'location', 'latitude', 'longitude'];

const toJsonTypes = race => ({
  ...race,
  distance: Number(race.distance),
  latitude: Number(race.latitude),
  longitude: Number(race.longitude),
});

const create = race => {
  logger.log(`Creating new race with name: ${race.name}`);
  return pg('race')
    .insert(race, allFields)
    .then(races => toJsonTypes(races[0]));
};

const load = search => {
  logger.log(`Loading races ${search ? JSON.stringify(search) : null}`);
  const where = buildWhereRaw(search);
  return pg('race')
    .whereRaw(where.raw, where.bindings)
    .select()
    .then(races => races.map(toJsonTypes));
};

const update = (id, race) => {
  logger.log(`Updating race with ID: ${id}`);
  return pg('race')
    .where('id', '=', id)
    .update(race, allFields)
    .then(races => toJsonTypes(races[0]));
};

const deleteRace = id => {
  logger.log(`Deleting race with ID: ${id}`);
  return pg('race')
    .where('id', '=', id)
    .delete();
};

export {create, load, update, deleteRace};
