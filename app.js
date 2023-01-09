const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./src/data/swagger.yaml');

const notesRouter = require('./src/routers/notesRouter');
require('dotenv').config();

const userRouter = require('./src/routers/userRouter');

const app = express();

// Middlewares
// Web server like loggin
app.use(morgan('dev'));
// Accept json body
app.use(express.json())

// Add the routes to the server
app.use('/api/auth', userRouter);
app.use('/api/notes', notesRouter);

// Swagger doc
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
	return res.status(404).json({
		status: 404,
		message: 'Not Found',
	});

});

app.use((err, req, res, next) => {
	let errorCode = err.code || 500;
	if (isNaN(errorCode)) errorCode = 500;
	console.error(err);
	return res.status(errorCode).json({ status: false, message: err.message })
})

module.exports = app;