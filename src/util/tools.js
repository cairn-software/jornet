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

export {iconFromType, metersToFeet};
