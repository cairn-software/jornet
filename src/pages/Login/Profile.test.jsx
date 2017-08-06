import React from 'react';
import {Provider} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {mount} from 'enzyme';
import {expect} from 'chai';

import Profile from 'pages/Login/Profile';

import {mockStore} from 'test/mocks';

describe('Profile', () => {
  it('should show the user picture and basic user fields', () => {
    const state = {
      authentication: {
        user: {
          first_name: 'Foo',
          last_name: 'Bar',
          email: 'foo@bar.com',
          city: 'Denver',
          state: 'CO',
          country: 'USA',
          photo: 'fake_prof_pic.com',
        },
      },
    };
    const component = mount(
      <MuiThemeProvider>
        <Provider store={mockStore(state)}>
          <Profile />
        </Provider>
      </MuiThemeProvider>,
    );

    // validate heading has "User Profile" header and the img
    const h1 = component.find('h1');
    expect(h1.text()).to.equal('User Profile');
    const img = component.find('img');
    expect(img.props().src).to.equal(state.authentication.user.photo);

    // email, first_name, last_name, location
    const labels = component.find('label');
    expect(labels).to.have.length(4);
  });
});
