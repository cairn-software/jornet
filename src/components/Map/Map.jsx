import React, {Component, PropTypes} from 'react';
import GoogleMapReact from 'google-map-react';
import properties from 'properties';
import WithCoordinates from 'components/With/WithCoordinates';

class Map extends Component {
  render() {
    const {children, coordinates, zoom} = this.props;

    const mapOptions = maps => {
      return {
        mapTypeId: maps.MapTypeId.TERRAIN,
        mapTypeControl: true,
        zoomControlOptions: {
          position: maps.ControlPosition.TOP_RIGHT,
          style: maps.ZoomControlStyle.SMALL,
        },
        mapTypeControlOptions: {
          position: maps.ControlPosition.TOP_RIGHT,
          style: maps.MapTypeControlStyle.DROPDOWN_MENU,
          mapTypeIds: [maps.MapTypeId.TERRAIN, maps.MapTypeId.SATELLITE],
        },
      };
    };

    return (
      <GoogleMapReact
        bootstrapURLKeys={{
          key: properties.googleMapsKey,
          language: 'en',
        }}
        defaultCenter={coordinates}
        defaultZoom={zoom}
        hoverDistance={40 / 2}
        options={mapOptions}
      >
        {children}
      </GoogleMapReact>
    );
  }
}
Map.propTypes = {
  children: PropTypes.any,
  coordinates: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  zoom: PropTypes.number.isRequired,
};
Map.defaultProps = {
  zoom: 7,
};

export default WithCoordinates(Map);
