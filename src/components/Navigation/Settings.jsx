import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {withRouter} from 'react-router';
import styled from 'styled-components';

import {logoutUser} from 'state/authentication';

const FlexContainer = styled.div`display: flex;`;

const ProfilePic = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
`;

const SettingsButton = styled(IconButton)`padding: 0 !important;`;

const Settings = ({logout, router, user}) => {
  return (
    <div>
      <FlexContainer>
        <IconMenu
          iconButtonElement={
            <SettingsButton>
              <ProfilePic src={`${user.photo}`} />
            </SettingsButton>
          }
        >
          <MenuItem primaryText="Profile" onClick={() => router.push('/profile')} />
          {user.is_admin && <MenuItem primaryText="Manage Races" onClick={() => router.push('/admin/races')} />}
          <MenuItem primaryText="Sign out" onClick={logout} />
        </IconMenu>
      </FlexContainer>
    </div>
  );
};

Settings.muiName = 'IconMenu';
Settings.propTypes = {
  router: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    user: state.authentication.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Settings));
