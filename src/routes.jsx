import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {UserAuthWrapper} from 'redux-auth-wrapper';
import {routerActions} from 'react-router-redux';

import Login from 'pages/Login/Login';
import Profile from 'pages/Login/Profile';

import Races from 'pages/Races/Races';

import Layout from 'components/PageTemplates/Layout';
import LoggedInTemplate from 'components/PageTemplates/LoggedInTemplate';
import NotFound from 'pages/NotFound';

import ManageRaces from 'pages/Admin/ManageRaces';

// Redirects to /login by default
const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.authentication.user,
  redirectAction: newLoc => dispatch => dispatch(routerActions.replace(newLoc)),
});

export default (
  <Route path="/" component={Layout}>
    <Route path="/login" component={Login} />

    // All routes below require authentication
    <Route component={UserIsAuthenticated(LoggedInTemplate)}>
      <IndexRoute component={Races} />
      <Route path="/profile" component={Profile} />
      <Route path="/races" component={Races} />

      <Route path="/admin/races" component={ManageRaces} />
    </Route>

    <Route path="*" component={NotFound} />
  </Route>
);
