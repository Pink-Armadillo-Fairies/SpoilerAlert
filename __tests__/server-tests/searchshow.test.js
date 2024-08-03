const request = require('supertest');
const app = require('../../server/server.js');

describe('GET /searchshows', () => {
    it('should return show object', async () => {
        const searchQuery = 'Breaking Bad';
        const response = await request(app).get(`/searchshows?searchQuery=${searchQuery}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.name).toBe('Breaking Bad');
    });
  });


