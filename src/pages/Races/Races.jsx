import React from 'react';

import Map from 'components/Map/Map';
import Race from 'components/Map/Markers/Race';

const Races = () => {
  return (
    <Map>
      <Race type="run" name="Colfax Marathon" lat={39.7392} lng={-104.9903} />
    </Map>
  );
};

export default Races;
