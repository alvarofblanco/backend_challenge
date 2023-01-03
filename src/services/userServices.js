const fs = require('fs');
const path = require('path');

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

module.exports = { getUserByUsername, createNewUser }