const request = require('supertest');
const app = require('../app');
let token;

beforeEach(async (done) => {
	token = await request(app).post('/login').send({ username: 'user_one', password: 'password' });
});

describe('Get One Note', () => {
	it('Should get one note', async () => {
		const res = await request(app).get('/notes/1');
		expect(res.statusCode).toBe(200);
		expect(res.body.status).toBe(true);
		expect(res.body.message).toBeTruthy();
		expect(res.body.data).toBeTruthy();
		expect(res.body.data.title).toBeTruthy();
		expect(res.body.data.body).toBeTruthy();
		expect(res.body.data.createdAt).toBeTruthy();
	})
})