// A mock store to pass to container components
const mockStore = state => ({
  default() {},
  subscribe() {},
  dispatch() {},
  getState() {
    return {...state};
  },
});

export {mockStore};
