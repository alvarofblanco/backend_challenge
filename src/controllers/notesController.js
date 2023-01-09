const { updateNoteInDB, addNoteToDB, getAllNotesFromUser, getNoteByIdFromDB, deleteNoteInDb } = require("../services/notesServices");

const createNote = async (req, res, next) => {
	// Extract json body content
	const { title, body } = req.body;

	let newNote;

	try {
		// Validate input
		if (!title && !body) {
			const error = new Error('Missing body or title');
			error.code = 400;
			throw error;
		}

		// Create the new note
		newNote = await addNoteToDB({ title, body, userId: req.userId })
	} catch (e) {
		return next(e)
	}
	return res.status(201).json({ message: 'Note Created!', data: newNote })
}

const listAllNotes = async (req, res, next) => {
	// Gets logged userId from request
	const { userId } = req;
	let notes;
	try {
		// Gets the notes from the DB
		notes = await getAllNotesFromUser(userId);
	} catch (e) {
		// Invoke global error handler
		return next(e);
	}
	// Return the notes if no errors 
	return res.status(200).json({ message: 'Get All Notes from User', data: notes })
}

const getNoteById = async (req, res, next) => {
	// Get the values from the params
	const { noteId } = req.params;
	const { userId } = req;

	// Return data
	let note;

	try {
		// Get the note from database
		note = await getNoteByIdFromDB(noteId, userId);
	} catch (e) {
		return next(e);
	}
	// Return the note if no errors
	return res.json({ message: 'Get Note By ID OK', data: note });
}

const updateNote = async (req, res, next) => {
	// Get the userId from jwt
	const { userId } = req;
	// Get the note id from the URI params
	const { noteId } = req.params;
	// Gets the title and body from the body
	const { title, body } = req.body;

	// Return data
	let updatedNote;
	try {
		// Validations
		if (!title || !body) {
			const error = new Error('Title or body missing!');
			error.code = 400;
			throw error;
		}

		// update the note
		updatedNote = await updateNoteInDB(title, body, userId, noteId);

	} catch (e) {
		return next(e)
	}
	// Return if no errors founded
	return res.json({ message: 'Update OK', data: updatedNote });
}

const deleteNote = async (req, res, next) => {
	// Get the userId from the jwt
	const { userId } = req;

	// Get the noteId to be deleted from params
	const { noteId } = req.params

	try {

		// Delete the note
		await deleteNoteInDb(userId, noteId);

	} catch (e) {
		// Return error
		return next(e);
	}
	return res.json({ message: 'Delete Note OK' });
}

module.exports = { createNote, listAllNotes, getNoteById, getNoteById, updateNote, deleteNote }

