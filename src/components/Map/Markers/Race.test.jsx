import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {mount} from 'enzyme';
import {expect} from 'chai';

import Race from 'components/Map/Markers/Race';

describe('Race', () => {
  it('should not show the name by default', () => {
    const component = mount(
      <MuiThemeProvider>
        <Race name="Foo" />
      </MuiThemeProvider>,
    );

    const h5 = component.find('h5');
    expect(h5).to.have.length(0);
  });

  it('should show the name on hover', () => {
    const component = mount(
      <MuiThemeProvider>
        <Race $hover={true} name="Foo" />
      </MuiThemeProvider>,
    );

    const h5 = component.find('h5');
    expect(h5).to.have.length(1);
  });
});
