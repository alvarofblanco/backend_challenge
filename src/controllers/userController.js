const { getUserByUsername, createNewUser } = require('../services/userServices');

const signUp = async (req, res) => {
	// Extract json body content
	const { username, password } = req.body;

	let newUser;

	try {

		// Validate input
		if (!username && !password) {
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
		// If the error has no code, is an internal error
		const errorCode = e.code || 500;
		console.error(e);
		// Return the error with custom message
		return res.status(errorCode).json({ status: false, message: e.message });
	}
	// return success message
	return res.json({ message: 'Si se pudo', data: newUser });
}

module.exports = { signUp }