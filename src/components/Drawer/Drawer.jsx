import React, {PropTypes} from 'react';
import styled from 'styled-components';
import MaterialDrawer from 'material-ui/Drawer';
import {primary} from 'variables';

const StyledDrawer = styled(MaterialDrawer)`z-index: 1000 !important;`;

const Heading = styled.h1`
  border-bottom: 1px solid ${primary};
  padding: 3px;
`;

const Drawer = ({children, heading, isOpen}) => {
  return (
    <StyledDrawer width={500} openSecondary={true} open={isOpen} docked={true}>
      <Heading>{heading}</Heading>
      {isOpen && children}
    </StyledDrawer>
  );
};
Drawer.propTypes = {
  children: PropTypes.any.isRequired,
  heading: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Drawer;
