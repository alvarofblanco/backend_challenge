const express = require('express');
const morgan = require('morgan');

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

module.exports = app;