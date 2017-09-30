import fetch from 'isomorphic-fetch';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import chai, {expect} from 'chai';
chai.use(require('chai-json-schema'));

const BASE_URL = 'http://localhost:7347/api';
const SECRET = fs.readFileSync('private.key');
const SIXTY_SECONDS = 60;
const DEFAULT_USER = {jornetUser: {id: 1, strava_id: 1, email_address: 'frank.ricard@oldschool.com', is_admin: false}};
const DEFAULT_TOKEN = jwt.sign(DEFAULT_USER, SECRET, {expiresIn: SIXTY_SECONDS});

const RACE_SCHEMA = {
  title: 'JornetRaceSchema',
  type: 'object',
  required: ['id', 'type', 'name', 'start_date', 'location', 'distance', 'latitude', 'longitude'],
  properties: {
    id: {
      type: 'string',
    },
    type: {
      type: 'string',
      enum: ['Road Run', 'Trail Run'],
    },
    name: {
      type: 'string',
    },
    start_date: {
      type: 'string',
    },
    website: {
      type: 'string',
    },
    location: {
      type: 'string',
    },
    distance: {
      type: 'number',
    },
    latitude: {
      type: 'number',
    },
    longitude: {
      type: 'number',
    },
  },
};

describe('api', () => {
  const request = (method, url, body, token = DEFAULT_TOKEN) => {
    const config = {
      method: method,
      json: true,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'jornet/test',
      },
      body: body ? JSON.stringify(body) : null,
    };
    return fetch(`${BASE_URL}${url}`, config);
  };

  it('should expire a JWT token', () => {
    const jornetUser = {id: 1, strava_id: 1, email_address: 'frank.ricard@oldschool.com', is_admin: false};
    const token = jwt.sign({jornetUser}, SECRET, {expiresIn: 0});
    return request('get', '/races', null, token).then(r => {
      expect(r.status).to.equal(401);
    });
  });

  it('should support retrieving all races', () => {
    return request('get', '/races')
      .then(r => r.json())
      .then(races => {
        expect(races).to.have.length.above(0);
        expect(races[0]).to.be.jsonSchema(RACE_SCHEMA);
      });
  });

  it('should not allowing creating or updating a race if user is not an admin', () => {
    return request('post', '/races').then(r => {
      expect(r.status).to.equal(403);
    });
  });

  it('should support creating, updating, and deleting a race as an admin', () => {
    const jornetUser = {id: 2, strava_id: 2, email_address: 'joseph.pulaski@oldschool.com', is_admin: true};
    const token = jwt.sign({jornetUser}, SECRET, {expiresIn: SIXTY_SECONDS});
    const body = {
      name: 'TestRace',
      type: 'Trail Run',
      location: 'Denver, CO',
      start_date: '2017/01/30',
      website: 'http://fake.com',
      latitude: 10,
      longitude: 10,
      distance: 50,
    };
    const updateBody = Object.assign({}, {name: 'TestRace-Update'});
    return request('post', '/races', body, token)
      .then(r => r.json())
      .then(race => {
        expect(race).to.be.jsonSchema(RACE_SCHEMA);
        expect(race.name).to.equal(body.name);
        return race;
      })
      .then(race => request('patch', `/races/${race.id}`, updateBody, token))
      .then(r => r.json())
      .then(race => {
        expect(race).to.be.jsonSchema(RACE_SCHEMA);
        expect(race.name).to.equal(updateBody.name);
        return race;
      })
      .then(race => request('delete', `/races/${race.id}`, null, token))
      .then(r => {
        expect(r.status).to.equal(204);
      });
  });

  it('should return a 400 if missing a required field on create', () => {
    const jornetUser = {id: 2, strava_id: 2, email_address: 'joseph.pulaski@oldschool.com', is_admin: true};
    const token = jwt.sign({jornetUser}, SECRET, {expiresIn: SIXTY_SECONDS});
    const body = {
      name: 'TestRace',
      location: 'Denver, CO',
      start_date: '2017/01/30',
      website: 'http://fake.com',
      latitude: 10,
      longitude: 10,
      distance: 50,
    };
    return request('post', '/races', body, token)
      .then(r => {
        expect(r.status).to.equal(400);
        return r.json();
      })
      .then(errorResponse => {
        expect(errorResponse.error).to.contain('type');
      });
  });
});
