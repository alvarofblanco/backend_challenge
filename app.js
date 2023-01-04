const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const userRouter = require('./src/routers/userRouter');

const app = express();

// Middlewares
// Web server like loggin
app.use(morgan('dev'));
// Accept json body
app.use(express.json())

app.get('/', (req, res) => res.send('Hello, World!'));

app.use('/api/auth', userRouter);

app.use((req, res) => {
	return res.status(404).json({
		status: 404,
		message: 'Not Found',
	});

});

app.use((err, req, res, next) => {
	const errorCode = err.code || 500;
	console.error(err);
	return res.status(errorCode).json({ status: false, message: err.message })
})

module.exports = app;