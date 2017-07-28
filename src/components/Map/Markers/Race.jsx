import React, {Component, PropTypes} from 'react';
import FontIcon from 'material-ui/FontIcon';
import {primary, primary3} from 'variables';
import styled from 'styled-components';

import {iconFromType} from 'util/tools';

const RaceName = styled.h5`
  color: ${primary3};
  margin: 0px 0px 0px -50px;
  min-width: 200px;
`;

const RaceIcon = styled(FontIcon)`
  color: ${props => (props['data-hover'] ? primary3 : primary)} !important;
  cursor: pointer;
`;

class Race extends Component {
  render() {
    const {name, onClick, type, $hover} = this.props;
    return (
      <div>
        <RaceIcon className="material-icons" data-hover={$hover} onClick={onClick}>
          {iconFromType(type)}
        </RaceIcon>
        {$hover && <RaceName>{name}</RaceName>}
      </div>
    );
  }
}
Race.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  $hover: PropTypes.bool, // comes from Google Maps
};

export default Race;
