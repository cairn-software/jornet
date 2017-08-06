import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import {connect} from 'react-redux';
import styled from 'styled-components';

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const Wrapper = styled.div`
  margin: 20px;
  text-align: center;
`;

const Fields = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
`;

const ProfilePic = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: 15px 0 15px 15px;
`;

class Profile extends Component {
  render() {
    const {user} = this.props;
    return (
      <Wrapper>
        <Header>
          <ProfilePic src={`${user.photo}`} />
          <h1>User Profile</h1>
        </Header>
        <Fields>
          <TextField disabled floatingLabelText={'Email'} value={user.email_address} /> <br />
          <TextField disabled floatingLabelText={'First Name'} value={user.first_name} /> <br />
          <TextField disabled floatingLabelText={'Last Name'} value={user.last_name} /> <br />
          <TextField disabled floatingLabelText={'Home'} value={`${user.city}, ${user.state} - ${user.country}`} />
          <br />
        </Fields>
      </Wrapper>
    );
  }
}
Profile.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    user: state.authentication.user,
  };
};

export default connect(mapStateToProps)(Profile);
