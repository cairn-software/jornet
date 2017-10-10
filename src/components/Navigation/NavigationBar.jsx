import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import styled from 'styled-components';
import Settings from 'components/Navigation/Settings';
import Drawer from 'components/Drawer/Drawer';
import SearchCriteriaForm from 'components/Form/SearchCriteriaForm';
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
const TopRight = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
`;

/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchDrawer: false,
    };
    this.toggleSearchDrawer = this.toggleSearchDrawer.bind(this);
  }

  toggleSearchDrawer() {
    this.setState({showSearchDrawer: !this.state.showSearchDrawer});
  }

  render() {
    return (
      <Bar>
        <TopLeft>
          <Icon href="/" img="cairn.svg" />
        </TopLeft>
        <TopRight>
          <SearchButton className="material-icons" onClick={this.toggleSearchDrawer}>
            search
          </SearchButton>
          <Settings />
        </TopRight>
        <Drawer heading="Search" isOpen={this.state.showSearchDrawer}>
          <SearchCriteriaForm onClose={this.toggleSearchDrawer} />
        </Drawer>
      </Bar>
    );
  }
}

export default NavigationBar;
