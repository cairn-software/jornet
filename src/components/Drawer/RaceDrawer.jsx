import React, {PropTypes} from 'react';
import styled from 'styled-components';
import Drawer from 'material-ui/Drawer';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import RaceForm from 'components/Form/RaceForm';
import {primary, primary3} from 'variables';

const StyledDrawer = styled(Drawer)`
  z-index: 1000 !important;
`;

const Heading = styled.h1`
  border-bottom: 1px solid ${primary};
  padding: 3px;
`;

const RaceHref = styled(FontIcon)`color: ${primary3} !important;`;

const RaceDrawer = ({isOpen, onClose, race}) => {
  return (
    <StyledDrawer width={500} openSecondary={true} open={isOpen} docked={true}>
      <Heading>
        {race.name}
        <IconButton target="_blank" href={race.website}>
          <RaceHref className="material-icons"> open_in_new </RaceHref>
        </IconButton>
      </Heading>
      <RaceForm onCancel={onClose} initialValues={race} />
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
