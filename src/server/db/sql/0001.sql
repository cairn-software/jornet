-- jornet_user table
DROP TABLE IF EXISTS jornet_user CASCADE;
CREATE TABLE jornet_user (
  id BIGSERIAL PRIMARY KEY,
  strava_id BIGINT NOT NULL,
  email_address TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  country TEXT NOT NULL,
  sex TEXT NOT NULL,
  photo TEXT,
  bearer_token TEXT NOT NULL,
  last_login TIMESTAMP NOT NULL DEFAULT now(),
  is_admin BOOLEAN NOT NULL DEFAULT false
);

CREATE UNIQUE INDEX strava_id_idx ON jornet_user(strava_id);
