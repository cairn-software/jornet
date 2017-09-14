import {isNil} from 'ramda';

const FEET_PER_METER = 3.28084;

/**
 * Converts meters to feet, rounding to two decimal places
 * @param {number} m The number of metersToFeet
 * @return {number} The number of feet that is roughly equivalent to the number of meters given
 */
const metersToFeet = m => Math.round(m * FEET_PER_METER * 100) / 100;

/**
 * Given a race type, this will return the proper icon to use to represent that Races
 * @param {string} type The race type (run, bike, triathlon)
 * @return {string} The material UI icon for this race type
 */
const iconFromType = type => {
  switch (type) {
    case 'Trail Run':
    case 'Road Run':
      return 'directions_run';
    case 'Road Bike':
    case 'Mtn Bike':
    case 'CycloCross Bike':
      return 'directions_bike';
    default:
      return 'whatshot';
  }
};

const sortByField = (a, b, field) => {
  let aField = a;
  let bField = b;

  if (field) {
    if (!isNil(a[field])) {
      aField = typeof a[field] === 'string' ? a[field].toUpperCase() : a[field];
    }

    if (!isNil(b[field])) {
      bField = typeof b[field] === 'string' ? b[field].toUpperCase() : b[field];
    }
  }
  if (aField < bField) {
    return -1;
  }
  if (aField > bField) {
    return 1;
  }

  // names must be equal
  return 0;
};

export {iconFromType, metersToFeet, sortByField};
