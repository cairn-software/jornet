import {CALL_API} from 'state/types';
import {sortByField} from 'util/tools';

export const CREATE_RACE = 'RACES:CREATE_RACE';
export const LOAD_RACES = 'RACES:LOAD_RACES';
export const UPDATE_RACE = 'RACES:UPDATE_RACE';

const sortById = (a, b) => sortByField(a, b, 'id');

const initialState = {loaded: false, all: []};
const reducer = (state = initialState, {payload, type}) => {
  switch (type) {
    case LOAD_RACES:
      return Object.assign({}, state, {
        loaded: true,
        all: payload.sort(sortById),
      });
    case CREATE_RACE:
      return Object.assign({}, state, {
        all: state.all.concat(payload).sort(sortById),
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

const createRace = race => ({
  [CALL_API]: {
    method: 'POST',
    endpoint: '/races',
    types: [CREATE_RACE],
    payload: race,
  },
});

const updateRace = (id, race) => ({
  [CALL_API]: {
    method: 'PUT',
    endpoint: `/races/${id}`,
    types: [UPDATE_RACE],
    payload: race,
  },
});

const loadRaces = () => ({
  [CALL_API]: {
    method: 'GET',
    endpoint: '/races',
    types: [LOAD_RACES],
  },
});

export {reducer, createRace, loadRaces, updateRace};
