const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

// Import users "database"
const users = require('../data/users.json');

// Generates a random 8 byte string of char
const createId = () => {
	let result = '';
	let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let charactersLength = characters.length;
	for (var i = 0; i < 8; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

// Gets the user object reading it from a json file with a promise for simutaling async calls
const getUserById = async (userId) => {
	console.log('userId', userId)
	const promise = new Promise((resolve, reject) => {
		const user = users.find(x => x.id === userId);
		if (user) {
			// Delete password from response
			delete user.password;
			resolve(user);
		} else {
			reject(new Error('User not found!'));
		}
	})
	return promise;
}

// Gets the user object reading it from a json file with a promise for simulating async calls
const getUserByUsername = async (username) => {
	const promise = new Promise((resolve, reject) => {
		const user = users.find(x => x.username === username);
		resolve(user);
	})

	return promise;
}

const createNewUser = async (user) => {
	// generares an Id for the new user
	let newUser = { ...user, id: createId() }
	// Adds the user to the users array
	users.push(newUser);
	try {
		// Build the path to the json file
		const filePath = path.join(__dirname, '..', 'data', 'users.json');

		// Saves the updated users array to the users "table"
		await fs.promises.writeFile(filePath, JSON.stringify(users));
	} catch (e) {
		throw e
	}
	// Remove password from response
	delete newUser.password;
	return newUser;
}

// Checks username/password againts DB
const authenticateUser = async ({ username, password }) => {
	const user = users.find(x => x.username === username);
	console.log('pass', user.password);
	console.log('password', password)

	// Check if user exists or if the passwords matches
	if (!user || user.password !== password) {
		const error = new Error('Username/Password invalid!');
		error.code = 401;
		throw error;
	}
	// Return a jwt
	const promise = new Promise((resolve, reject) => {
		const jwt = generateAccessToken(user.id);
		resolve(jwt);
	})
	return promise;
}

const generateAccessToken = (userId) => {
	return jwt.sign({ userId }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
}

// Middleware that checks if the token is valid
const authenticateToken = async (req, res, next) => {
	const authHeader = req.headers['authorization'];
	// Get the token from the header
	const token = authHeader && authHeader.split(' ')[1];
	try {
		// Gets the user id from the token 
		const data = await jwt.verify(token, process.env.TOKEN_SECRET);
		// Save the user id in the request
		req.userId = data.userId;
	} catch (e) {
		return res.sendStatus(403);
	}
	// Pass the control to the controller
	next()
}

module.exports = { getUserByUsername, createNewUser, generateAccessToken, authenticateUser, authenticateToken, getUserById }