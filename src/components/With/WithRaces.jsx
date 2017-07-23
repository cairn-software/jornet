import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {loadRaces} from 'state/races';

const WithRaces = WrappedComponent => {
  class WithRacesClass extends React.Component {
    static propTypes = {
      isRacesLoaded: PropTypes.bool,
      load: PropTypes.func.isRequired,
      races: PropTypes.array,
    };

    componentDidMount() {
      const {isRacesLoaded, load} = this.props;
      if (!isRacesLoaded) {
        load();
      }
    }

    render() {
      const {isRacesLoaded, races} = this.props;
      return isRacesLoaded ? <WrappedComponent {...this.props} races={races} /> : null;
    }
  }

  const mapStateToProps = state => {
    return {
      isRacesLoaded: state.races.loaded,
      races: state.races.all,
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      load: () => dispatch(loadRaces()),
    };
  };
  return connect(mapStateToProps, mapDispatchToProps)(WithRacesClass);
};

export default WithRaces;
