import {CALL_API} from 'state/types';
import properties from 'properties';

/* Constants */
export const LOAD_ADDRESS_COORDINATES = 'GOOGLE_MAPS:LOAD_ADDRESS_COORDINATES';

/* Actions */
const loadCoordinates = (address, onSuccessCallback) => ({
  [CALL_API]: {
    method: 'GET',
    endpoint: 'https://maps.googleapis.com/maps/api/geocode/json',
    types: [LOAD_ADDRESS_COORDINATES],
    query: {address, key: properties.googleMapsKey},
    message: 'Loading coordinates from address...',
    metadata: {address},
    onSuccessCallback,
  },
});

/* Reducer */
const initialState = {
  coordinates: {},
};

const reducer = (state = initialState, {type, payload, metadata}) => {
  switch (type) {
    case LOAD_ADDRESS_COORDINATES:
      // Keep a list of lat:lng values key'ed off of the address that was loaded, so we don't reaload addresses
      const geometry = payload.results ? payload.results[0].geometry : {};
      return Object.assign({}, state, {
        coordinates: {
          ...state.coordinates,
          [metadata.address]: geometry.location,
        },
      });
    default:
      return state;
  }
};

export {reducer, loadCoordinates};
