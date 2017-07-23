-- race table
DROP TABLE IF EXISTS race CASCADE;
CREATE TABLE race (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  start_date TIMESTAMP NOT NULL,
  type TEXT NOT NULL,
  website TEXT NOT NULL,
  distance DECIMAL NOT NULL,
  location TEXT NOT NULL,
  latitude DECIMAL NOT NULL,
  longitude DECIMAL NOT NULL
);

CREATE UNIQUE INDEX id_idx ON race(id);

-- insert a few races
INSERT INTO
  race
    (name, start_date, type, website, distance, location, latitude, longitude)
  VALUES
    ('Hardrock 100', '7/14/2017 07:00:00', 'Trail Run', 'http://hardrock100.com/', 100, 'Silverton, CO', 37.8119, -107.6645);

INSERT INTO
  race
    (name, start_date, type, website, distance, location, latitude, longitude)
  VALUES
    ('Colfax Marathon', '5/20/2018 06:00:00', 'Road Run', 'http://www.runcolfax.org/', 26.2, 'Denver, CO', 39.7392, -104.9903);
