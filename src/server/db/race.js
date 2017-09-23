import pg from './pg';
import logger from '../logger';

const allFields = ['id', 'name', 'start_date', 'type', 'website', 'distance', 'location', 'latitude', 'longitude'];

const toJsonTypes = race => ({
  ...race,
  distance: Number(race.distance),
  latitude: Number(race.latitude),
  longitude: Number(race.longitude),
});

const create = race => {
  logger.log(`Creating new race with name: ${race.name}`);
  return pg('race').insert(race, allFields).then(races => toJsonTypes(races[0]));
};

const load = search => {
  logger.log(`Loading races ${search ? JSON.stringify(search) : null}`);
  return pg('race')
    .where({
      type: search.type,

    })
    .select()
    .then(races => races.map(toJsonTypes));
};

const update = (id, race) => {
  logger.log(`Updating race with ID: ${id}`);
  return pg('race').where('id', '=', id).update(race, allFields).then(races => toJsonTypes(races[0]));
};

export {create, load, update};
