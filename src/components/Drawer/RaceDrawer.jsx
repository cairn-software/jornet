import React, {PropTypes} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components';
import Drawer from 'material-ui/Drawer';
import {primary} from 'variables';

const StyledDrawer = styled(Drawer)`
  z-index: 1000 !important;
`;

const Heading = styled.h1`
  border-bottom: 1px solid ${primary};
  padding: 3px;
`;

const Details = styled.ul`
  list-style: none;
`;

const DataPoint = styled.li`
  font-style: bold;
  padding: 2px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

const CloseButton = styled(RaisedButton)`
  background-color: ${primary};
`;

const RaceDrawer = ({isOpen, onClose, race}) => {
  return (
    <StyledDrawer width={400} openSecondary={true} open={isOpen}>
      <Heading>{race.name}</Heading>
      <Details>
        <DataPoint>{race.type}</DataPoint>
        <DataPoint>{race.location}</DataPoint>
        <DataPoint>{race.distance} (miles)</DataPoint>
        <DataPoint><a target="_blank" href={race.website}>Race Website</a></DataPoint>
        <DataPoint>{race.start_date}</DataPoint>
      </Details>
      <Buttons>
        <CloseButton label="Close" backgroundColor={primary} onClick={onClose} />
      </Buttons>
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
