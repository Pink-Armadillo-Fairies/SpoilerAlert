const request = require('supertest');
const app = require('../../server/server.js');


describe('GET /getcomments', () => {
    it('should return array of comment objects, for passed in showId', async () => {
        const showId = 133;
        const response = await request(app).get(`/getcomments?showId=${showId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body[0].show_id).toBe('133');
    });
  });