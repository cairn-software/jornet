import React from 'react';
import {Provider} from 'react-redux';
import {mount} from 'enzyme';
import {expect} from 'chai';
import {mockStore} from 'test/mocks';

import WithRaces from 'components/With/WithRaces';

describe('WithRaces', () => {
  it('should pass down the races to the wrapped component', () => {
    const races = {
      loaded: true,
      all: [
        {
          name: 'Hardrock 100',
          location: 'Silverton, CO',
        },
        {
          name: 'Leadville 100',
          location: 'Leadville, CO',
        },
      ],
    };

    const store = mockStore({races});
    const TempComponent = () => <h1>Foo</h1>;
    const WrappedTempComponent = WithRaces(TempComponent);
    const wrapper = mount(
      <Provider store={store}>
        <WrappedTempComponent />
      </Provider>,
    );

    const foundTempComponent = wrapper.find('TempComponent');

    const tempProps = foundTempComponent.props();
    expect(tempProps).to.be.an('object');
    expect(tempProps.races).to.be.an('array');
    expect(tempProps.races).to.have.length(2);
  });
});
