import React, {PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components';

import Drawer from 'material-ui/Drawer';

const StyledDrawer = styled(Drawer)`
  z-index: 1000 !important;
`;

const RaceDrawer = ({isOpen, onClose, race}) => {
  return (
    <StyledDrawer width={400} openSecondary={true} open={isOpen}>
      <h1>{race.name}</h1>
      <br />
      <ul>
        <li><b>Type: </b>{race.type}</li>
        <li><b>Location: </b>{race.location}</li>
        <li><b>Distance (miles): </b>{race.distance}</li>
        <li><b>Website: </b>{race.website}</li>
        <li><b>Start Date: </b>{race.start_date}</li>
      </ul>
      <RaisedButton label="Close" secondary={true} onClick={onClose} />
    </StyledDrawer>
  );
};
RaceDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  race: PropTypes.object.isRequired,
};
RaceDrawer.defaultProps = {
  race: {},
};

export default RaceDrawer;
