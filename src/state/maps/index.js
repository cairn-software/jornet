import {CALL_API} from 'state/types';
import properties from 'properties';

/* Constants */
export const LOAD_ADDRESS_COORDINATES = 'GOOGLE_MAPS:LOAD_ADDRESS_COORDINATES';

/* Actions */
const loadCoordinates = address => ({
  [CALL_API]: {
    method: 'GET',
    endpoint: 'https://maps.googleapis.com/maps/api/geocode/json',
    types: [LOAD_ADDRESS_COORDINATES],
    query: {address, key: properties.googleMapsKey},
    message: 'Loading coordinates from address...',
  },
});

/* Reducer */
const initialState = {
  coordinates: {
    loaded: false,
  },
};

const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case LOAD_ADDRESS_COORDINATES:
      return Object.assign({}, state, {
        coordinates: {
          loaded: true,
          ...payload.results[0],
        },
      });
    default:
      return state;
  }
};

export {reducer, loadCoordinates};
