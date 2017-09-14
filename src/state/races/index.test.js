import {expect} from 'chai';

import {reducer, CREATE_RACE, LOAD_RACES, UPDATE_RACE} from 'state/races';

describe('races', () => {
  context('reducer', () => {
    it('should support LOAD_RACES', () => {
      const initialState = {};
      const action = {
        type: LOAD_RACES,
        payload: [{id: 1, name: 'Hardrock 100'}, {id: 2, name: 'Leadville 100'}],
      };
      const nextState = reducer(initialState, action);

      expect(nextState.loaded).to.be.true;
      expect(nextState.all).to.have.length(2);
      expect(nextState.all).to.deep.equal(action.payload);
    });

    it('should support CREATE_RACE', () => {
      const initialState = {
        loaded: true,
        all: [{id: 1, name: 'Hardrock 100'}, {id: 2, name: 'Leadville 100'}],
      };
      const action = {
        type: CREATE_RACE,
        payload: {
          id: 3,
          name: 'Bighorn 100',
        },
      };
      const nextState = reducer(initialState, action);

      expect(nextState.loaded).to.be.true;
      expect(nextState.all).to.have.length(3);
    });

    it('should support UPDATE_RACE', () => {
      const initialState = {
        loaded: true,
        all: [{id: 1, name: 'Hardrock 100'}, {id: 2, name: 'Leadville 100'}],
      };
      const action = {
        type: UPDATE_RACE,
        payload: {
          id: 1,
          name: 'Hardwalk 100',
        },
      };
      const nextState = reducer(initialState, action);

      expect(nextState.loaded).to.be.true;
      expect(nextState.all).to.have.length(2);
      expect(nextState.all.filter(race => race.name === action.payload.name)).to.have.length(1);
    });
  });
});
