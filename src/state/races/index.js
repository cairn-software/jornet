import {CALL_API} from 'state/types';
import {sortByField} from 'util/tools';

export const CREATE_RACE = 'RACES:CREATE_RACE';
export const DELETE_RACE = 'RACES:DELETE_RACE';
export const LOAD_RACES = 'RACES:LOAD_RACES';
export const UPDATE_RACE = 'RACES:UPDATE_RACE';

const sortById = (a, b) => sortByField(a, b, 'id');

const initialState = {loaded: false, all: []};
const reducer = (state = initialState, {metadata, payload, type}) => {
  switch (type) {
    case CREATE_RACE:
      return Object.assign({}, state, {
        all: state.all.concat(payload).sort(sortById),
      });
    case DELETE_RACE:
      return Object.assign({}, state, {
        all: state.all.filter(race => race.id !== metadata.id),
      });
    case LOAD_RACES:
      return Object.assign({}, state, {
        loaded: true,
        all: payload.sort(sortById),
      });
    case UPDATE_RACE:
      return Object.assign({}, state, {
        all: state.all
          .filter(race => race.id !== payload.id)
          .concat(payload)
          .sort(sortById),
      });
    default:
      return state;
  }
};

const createRace = (race, onSuccessCallback) => ({
  [CALL_API]: {
    method: 'POST',
    endpoint: '/races',
    types: [CREATE_RACE],
    payload: race,
    onSuccessAlert: `Successfully created race`,
    onSuccessCallback,
  },
});

const updateRace = (id, race, onSuccessCallback) => ({
  [CALL_API]: {
    method: 'PATCH',
    endpoint: `/races/${id}`,
    types: [UPDATE_RACE],
    payload: race,
    onSuccessAlert: `Successfully updated race`,
    onSuccessCallback,
  },
});

const deleteRace = (id, onSuccessCallback) => ({
  [CALL_API]: {
    method: 'DELETE',
    endpoint: `/races/${id}`,
    types: [DELETE_RACE],
    metadata: {id},
    onSuccessAlert: `Successfully deleted race`,
    onSuccessCallback,
  },
});

const loadRaces = () => ({
  [CALL_API]: {
    method: 'GET',
    endpoint: '/races',
    types: [LOAD_RACES],
  },
});

export {reducer, createRace, deleteRace, loadRaces, updateRace};
