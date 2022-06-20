/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../app.js');
const { Dog, Temperament, conn } = require('../../db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
  temperament: "Quiet"
};

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
});

describe('Temperament routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Temperament.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /temperament', () => {
    it('should get 200', () =>
      agent.get('/temperament').expect(200)
    );
  });
});


