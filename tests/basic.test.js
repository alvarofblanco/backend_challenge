const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
	it('Should return Hello, world!', async () => {
		const res = await request(app).get('/');
		expect(res.statusCode).toBe(200);
	});
});

describe('User', () => {
	it('Should login the user', async () => {
		const res = await request(app).post('/login').send({ username: 'admin', password: 'password' });
		expect(res.statusCode).toBe(200);
		expect(res.headers["Content-Type"]).toMatch(/json/);
		expect(res.body.message).toBe('Login Successful');
		expect(res.body.jwt).toBeTruthy();
	})
});

describe('404', () => {
	it('Should return 404', async () => {
		const res = await request(app).get('/notFound');
		expect(res.statusCode).toBe(404);
	});
});