import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {isNil} from 'ramda';
import {routerActions} from 'react-router-redux';
import styled from 'styled-components';

import {primary} from 'variables';
import {oauthLogin} from 'state/authentication';
import properties from 'properties';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-image: url('/assets/img/background.jpg');
  background-size: 100% 100%;
`;

const Body = styled.div`
  background-color: ${primary};
  padding: 30px;
  border-radius: 5px;
  text-align: center;
`;

const Heading = styled.h1`
  padding: 2px;
  font-size: 4rem;
`;

const StravaButton = styled.img`
  flex: 1 1 auto;
  cursor: pointer
  border-radius: 5%;
  padding-top: 20px;
`;

class Login extends Component {
  componentWillMount() {
    const {authenticated, location, login, replace, redirect} = this.props;
    if (location.query && location.query.code) {
      login(location.query.state, location.query.code);
    } else if (authenticated) {
      replace(redirect);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {authenticated, replace, redirect} = nextProps;
    const {authenticated: wasAuthenticated} = this.props;
    if (!wasAuthenticated && authenticated) {
      replace(redirect);
    }
  }

  render() {
    const onConnect = e => {
      e.preventDefault();
      window.location = `https://www.strava.com/oauth/authorize?client_id=${properties.stravaClientId}&response_type=code&state=hideMe&approvalPrompt=force&redirect_uri=${properties.redirectUri}`;
    };

    return (
      <Container>
        <Body>
          <div>
            <Heading>Cairn</Heading>
            <i>Suffer smarter.</i>
          </div>
          <StravaButton src="/assets/img/strava-connect-orange.svg" onClick={onConnect} />
        </Body>
      </Container>
    );
  }
}
Login.propTypes = {
  location: PropTypes.object,
  login: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  replace: PropTypes.func.isRequired,
  redirect: PropTypes.string.isRequired,
};

const mapStateToProps = (state, props) => {
  return {
    authenticated: !isNil(state.authentication.user),
    redirect: props.location.query.redirect || '/races',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (state, code) => dispatch(oauthLogin(state, code)),
    replace: redirect => dispatch(routerActions.replace(redirect)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
