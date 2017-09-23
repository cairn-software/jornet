import React, {Component, PropTypes} from 'react';
import styled from 'styled-components';
import {isNil} from 'ramda';

import WithRaces from 'components/With/WithRaces';
import Map from 'components/Map/Map';
import Race from 'components/Map/Markers/Race';
import RaceDrawer from 'components/Drawer/RaceDrawer';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

class Races extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRace: null,
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer(race) {
    this.setState({selectedRace: race});
  }

  render() {
    const {races} = this.props;
    const RaceMarkers = races.map(race => {
      return (
        <Race
          key={race.id}
          type={race.type}
          name={race.name}
          onClick={() => this.toggleDrawer(race)}
          lat={race.latitude}
          lng={race.longitude}
        />
      );
    });

    return (
      <Wrapper>
        <Map>{RaceMarkers}</Map>
        <RaceDrawer
          isOpen={!isNil(this.state.selectedRace)}
          race={isNil(this.state.selectedRace) ? {} : this.state.selectedRace}
          onClose={() => this.toggleDrawer(null)}
        />
      </Wrapper>
    );
  }
}
Races.propTypes = {
  races: PropTypes.array.isRequired,
};

export default WithRaces(Races);
