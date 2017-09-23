import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {loadCoordinates} from 'state/maps';

/* Denver */
const DEFAULT_CENTER_COORDINATES = {lat: 39.732, lng: -104.99};

const WithCoordinates = WrappedComponent => {
  class WithCoordinatesClass extends React.Component {
    static propTypes = {
      address: PropTypes.string.isRequired,
      isCoordinatesLoaded: PropTypes.bool,
      load: PropTypes.func.isRequired,
      coordinates: PropTypes.object,
    };

    componentDidMount() {
      const {address, isCoordinatesLoaded, load} = this.props;
      if (!isCoordinatesLoaded) {
        load(address);
      }
    }

    render() {
      const {isCoordinatesLoaded, coordinates} = this.props;
      return isCoordinatesLoaded ? <WrappedComponent {...this.props} coordinates={coordinates} /> : null;
    }
  }

  const mapStateToProps = state => {
    const {user} = state.authentication;
    const {coordinates} = state.maps;
    return {
      address: `${user.city}, ${user.state}, ${user.country}`,
      coordinates: coordinates.loaded ? coordinates.geometry.location : DEFAULT_CENTER_COORDINATES,
      isCoordinatesLoaded: coordinates.loaded,
    };
  };

  const mapDispatchToProps = dispatch => ({
    load: address => dispatch(loadCoordinates(address)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithCoordinatesClass);
};

export default WithCoordinates;
