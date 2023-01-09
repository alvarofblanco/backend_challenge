const { getUserByUsername, createNewUser, authenticateUser, getUserById } = require('../services/userServices');

// Add the user to the DB
const signUp = async (req, res, next) => {
	// Extract json body content
	const { username, password } = req.body;

	// Saves the new user
	let newUser;


	try {
		// Validate input
		if (!username || !password) {
			const error = new Error('Missing username and/or password');
			error.code = 400;
			throw error;
		}
		// Look in the database if the user is already registered
		const user = await getUserByUsername(username);

		// If the user exists, throw an Error
		if (user) {
			const error = new Error('The username already exists');
			error.code = 400;
			throw error;
		}

		// Create a new user
		newUser = await createNewUser({ username, password });
	} catch (e) {
		return next(e);
	}
	// return success message
	return res.json({ status: true, message: 'User Created!', data: newUser });
}

// If the username and password match, returns a jwt
const login = async (req, res, next) => {
	// Get the data from the body
	const { username, password } = req.body;
	// Token to be sended to the user if auth is OK
	let token;

	try {
		// Validate input
		if (!username || !password) {
			const error = new Error('Missing username and/or password');
			error.code = 400;
			throw error;
		}

		// Generates a jwt
		token = await authenticateUser({ username, password })
	} catch (e) {
		// Throws the error to the global error handler
		return next(e);
	}
	// Return the token if everything OK
	return res.status(200).json({ message: 'Login ok', token });
}

// Shows the user data
const userData = async (req, res, next) => {
	// Gets the userId from the request
	const { userId } = req;
	let data;
	try {
		// Fetches de user data from the "database"
		data = await getUserById(userId);
	} catch (e) {
		return next(e);
	}
	return res.json({ status: true, message: 'User retrieved succesfully', data })
}

module.exports = { signUp, login, userData }