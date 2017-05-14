import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {loadAllRaces} from 'state/races';

const WithRaces = WrappedComponent => {
  class WithRacesClass extends React.Component {
    static propTypes = {
      isRacesLoaded: PropTypes.bool,
      loadRaces: PropTypes.func.isRequired,
      races: PropTypes.array,
    };

    componentDidMount() {
      const {isRacesLoaded, loadRaces} = this.props;
      if (!isRacesLoaded) {
        loadRaces();
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
    return {loadRaces: () => dispatch(loadAllRaces())};
  };
  return connect(mapStateToProps, mapDispatchToProps)(WithRacesClass);
};

export default WithRaces;
