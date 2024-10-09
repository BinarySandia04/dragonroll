const supertest = require('supertest');
const { app, server } = require('../server.js');
const request = supertest(app);

const { connectDB, disconnectDB } = require('../services/database');

describe('API test', () => {
  beforeAll(() => {
    connectDB();
  });

  afterAll(() => {
    disconnectDB();
    server.close();
  });

  describe('GET /user/has-admin', () => {
    it('should get if app is configured', async () => {
      const response = await request.get('/user/has-admin')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      expect(response.body.status).toEqual('init');
    });
  });
});