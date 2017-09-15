import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import styled from 'styled-components';
import Settings from 'components/Navigation/Settings';
import {primary} from 'variables';

const Bar = styled.div`
  background-color: ${primary} !important;
  display: flex;
  justify-content: flex-end;
  padding: 5px 5px 0 0;
`;

const SearchButton = styled(FontIcon)`
  cursor: pointer;
  padding: 15px;
`;

/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchFilters: false,
    };
    this.showSearchFilters = this.showSearchFilters.bind(this);
  }

  showSearchFilters() {
    this.setState({showSearchFilters: !this.state.showSearchFilters});
  }

  render() {
    return (
      <Bar>
        {this.state.showSearchFilters && <p>Coming soon...</p>}
        <SearchButton className="material-icons" onClick={this.showSearchFilters}> search </SearchButton>
        <Settings />
      </Bar>
    );
  }
}

export default NavigationBar;
