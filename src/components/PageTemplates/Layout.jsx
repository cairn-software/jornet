import React, {PropTypes} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {connect} from 'react-redux';
import {isNil} from 'ramda';
import {injectGlobal} from 'styled-components';
import styled from 'styled-components';
import {primary, primary1} from 'variables';
import {clearAllAlerts} from 'state/notifications';
import Snackbar from 'material-ui/Snackbar';
import Mask from 'components/Mask/Mask';

// Needed for onTouchTap - http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

injectGlobal`
  @font-face {
  }
  body {
    margin: 0;
    font-family: "Montserrat", "Open Sans", "Helvetica Neue", "Arial", "Helvetica", sans-serif;
    font-weight: 400;
    font-size: 100%;
    line-height: 1.25rem;
  }
  body, h1, h2, h3, h4 {
    font-size-adjust: 0.5;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: "Montserrat", "Ubuntu", "Helvetica Neue", "Arial", "Helvetica", sans-serif;
    font-weight: 700;
    margin: 1rem 0;
  }
  h1 {
    font-size: 2rem;
    margin: 1.3rem;
    color: ${primary1};
    line-height: 2rem;
  }
  h2 {
    font-size: 1.625rem;
    color: ${primary};
    line-height: 1.625rem;
  }
  h3 {
    font-size: 1.375rem;
    color: ${primary};
    line-height: 1.375rem;
  }
  h4 {
    font-size: 1.125rem;
    color: ${primary};
    line-height: 1.125rem;
  }
  h5, h6{
    font-size: 1rem;
    color: ${primary1};
  }
  p{
    line-height: 1.5rem;
    font-size: 1.2rem;
  }
}
`;

const App = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
  overflow: auto;
`;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: auto;
`;

const Alerts = styled(Snackbar)`
  div {
    color: white;
    background-color: ${props => (props['data-alertType'] === 'error' ? 'red' : 'green')} !important;
  }
`;

const Layout = ({alert, children, clearAlerts, mask}) => {
  return (
    <App>
      <MuiThemeProvider>
        <Wrapper>
          {children}
          {!isNil(mask) && !isNil(mask.message) && <Mask key={mask.message} message={mask.message} />}
          <Alerts
            data-alertType={alert ? alert.type : null}
            open={!isNil(alert)}
            message={alert ? alert.message : ''}
            autoHideDuration={3000}
            onRequestClose={clearAlerts}
          />
        </Wrapper>
      </MuiThemeProvider>
    </App>
  );
};
Layout.propTypes = {
  alert: PropTypes.object,
  children: PropTypes.any,
  clearAlerts: PropTypes.func.isRequired,
  mask: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    mask: state.notifications.mask,
    alert: state.notifications.alert,
  };
};

const mapDispatchToProps = dispatch => ({
  clearAlerts: () => dispatch(clearAllAlerts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
