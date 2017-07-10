import React, {Component} from 'react';
import styled from 'styled-components';
import {isNil} from 'ramda';

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

  toggleDrawer(raceId) {
    this.setState({selectedRace: raceId});
  }

  render() {
    return (
      <Wrapper>
        <Map>
          <Race type="run" name="Colfax Marathon" onClick={() => this.toggleDrawer(1)} lat={39.7392} lng={-104.9903} />
          <Race type="run" name="Leadville 100" onClick={() => this.toggleDrawer(2)} lat={39.2058} lng={-106.2925} />
          <Race type="run" name="Hardrock 100" onClick={() => this.toggleDrawer(3)} lat={37.8119} lng={-107.6645} />
        </Map>
        <RaceDrawer
          isOpen={!isNil(this.state.selectedRace)}
          raceId={this.state.selectedRace}
          onClose={() => this.toggleDrawer(null)}
        />
      </Wrapper>
    );
  }
}

export default Races;
