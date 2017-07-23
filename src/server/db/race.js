import pg from './pg';
import logger from '../logger';

const load = () => {
  // TODO - JJW - this needs to be filter based on min/max lat/long
  logger.log(`Loading races`);
  return pg('race').select().then(races => {
    return races.map(race => {
      return {
        ...race,
        distance: Number(race.distance),
        latitude: Number(race.latitude),
        longitude: Number(race.longitude),
      };
    });
  });
};

export {load};
