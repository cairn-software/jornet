export const CREATE_SEARCH_CRITERIA = 'RACES:CREATE_SEARCH_CRITERIA';

const initialState = {
  criteria: {
    min_distance: 0,
    max_distance: 100,
  },
};
const reducer = (state = initialState, {payload, type}) => {
  switch (type) {
    case CREATE_SEARCH_CRITERIA:
      return Object.assign({}, state, {criteria: payload});
    default:
      return state;
  }
};

const createSearchCriteria = criteria => ({
  payload: criteria,
  type: CREATE_SEARCH_CRITERIA,
});

export {reducer, createSearchCriteria};
