import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import styled from 'styled-components';
import Settings from 'components/Navigation/Settings';
import {primary} from 'variables';
import Icon from 'components/Icon/Icon';

const Bar = styled.div`
  background-color: ${primary} !important;
  display: flex;
  justify-content: space-between;
  padding: 5px 5px 0 0;
  height: 50px;
`;

const SearchButton = styled(FontIcon)`
  cursor: pointer;
  padding: 10px;
`;

const TopLeft = styled.div`
  display: flex;
  img {
    height: 100%;
    padding-left: 5px;
  }
`;
const TopRight = styled.div`display: flex;`;

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
        <TopLeft>
          <Icon href="/" img="cairn.svg" />
        </TopLeft>
        <TopRight>
          <SearchButton className="material-icons" onClick={this.showSearchFilters}>
            {' '}
            search{' '}
          </SearchButton>
          <Settings />
        </TopRight>
      </Bar>
    );
  }
}

export default NavigationBar;
