import {CALL_API} from 'state/types';

const LOAD_RACES = 'RACES:LOAD_RACES';

const initialState = {loaded: false, all: []};
const reducer = (state = initialState, {payload, type}) => {
  switch (type) {
    case LOAD_RACES:
      return Object.assign({}, state, {loaded: true, all: payload});
    default:
      return state;
  }
};

const loadRaces = () => ({
  [CALL_API]: {
    method: 'GET',
    endpoint: '/races',
    types: [LOAD_RACES],
  },
});

export {reducer, loadRaces};
