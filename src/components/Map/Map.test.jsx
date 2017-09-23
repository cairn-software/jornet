import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Provider} from 'react-redux';

import {mount} from 'enzyme';
import {expect} from 'chai';

import {mockStore} from 'test/mocks';
import Map from 'components/Map/Map';

describe('Map', () => {
  it('should render the children of the Map', () => {
    // to ignore the google maps props that are passed down
    const Temp = () => <h1>Foo</h1>;
    const store = mockStore({
      authentication: {
        user: {
          city: 'Denver',
          state: 'CO',
          country: 'United States',
        },
      },
      maps: {
        coordinates: {
          loaded: true,
          geometry: {
            location: {lat: 39.732, lng: -104.99},
          },
        },
      },
    });
    const component = mount(
      <MuiThemeProvider>
        <Provider store={store}>
          <Map>
            <Temp />
          </Map>
        </Provider>
      </MuiThemeProvider>,
    );

    const h1 = component.find('h1');
    expect(h1).to.have.length(1);
    expect(h1.text()).to.equal('Foo');
  });
});
