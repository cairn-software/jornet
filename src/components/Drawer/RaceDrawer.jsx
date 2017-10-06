import React, {PropTypes} from 'react';
import styled from 'styled-components';
import Drawer from 'material-ui/Drawer';
import RaceForm from 'components/Form/RaceForm';
import {primary} from 'variables';

const StyledDrawer = styled(Drawer)`z-index: 1000 !important;`;

const Heading = styled.h1`
  border-bottom: 1px solid ${primary};
  padding: 3px;
`;

const RaceDrawer = ({isOpen, onClose, race}) => {
  return (
    <StyledDrawer width={500} openSecondary={true} open={isOpen} docked={true}>
      <Heading>{race.name}</Heading>
      {isOpen && <RaceForm onClose={onClose} initialValues={race} />}
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
