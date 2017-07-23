import {expect} from 'chai';

import {reducer, LOAD_RACES} from 'state/races';

describe('races', () => {
  context('reducer', () => {
    it('should support LOAD_RACES', () => {
      const initialState = {};
      const action = {
        type: LOAD_RACES,
        payload: [{name: 'Hardrock 100'}, {name: 'Leadville 100'}],
      };
      const nextState = reducer(initialState, action);

      expect(nextState.loaded).to.be.true;
      expect(nextState.all).to.have.length(2);
      expect(nextState.all).to.deep.equal(action.payload);
    });
  });
});
