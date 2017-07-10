import React, {PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components';

import Drawer from 'material-ui/Drawer';

const StyledDrawer = styled(Drawer)`
  z-index: 1000 !important;
`;

const RaceDrawer = ({isOpen, onClose, raceId}) => {
  const findRaceName = () => {
    switch (raceId) {
      case 1:
        return 'Colfax Marathon';
      case 2:
        return 'Leadville 100';
      case 3:
        return 'Hardrock 100';
      default:
        return '';
    }
  };
  return (
    <StyledDrawer width={400} openSecondary={true} open={isOpen}>
      <h1>{findRaceName()}</h1>
      <br />
      <h4>Date: 5/12/17</h4>
      <RaisedButton label="Close" secondary={true} onClick={onClose} />
    </StyledDrawer>
  );
};
RaceDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  raceId: PropTypes.number,
};

export default RaceDrawer;
