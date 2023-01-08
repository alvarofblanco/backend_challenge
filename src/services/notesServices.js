const fs = require('fs');
const path = require('path');
const moment = require('moment');

// Import createId helper function
const { createId } = require('../lib/utils');

// Import notes "database"
const notes = require('../data/notes.json');

// notes file path
const filePath = path.join(__dirname, '..', 'data', 'notes.json');

// Get note by id
const getNoteByIdFromDB = (noteId, userId) => {
	const promise = new Promise((resolve, reject) => {
		const note = notes.find(x => x.id === noteId);
		// Checks if the note is from the user
		if (note && note.userId === userId) {
			resolve(note);
		} else {
			const error = new Error('Forbidden');
			error.code = 403;
			reject(error);
		}
	})
	return promise;
}

// Update the note in the DB
const updateNoteInDB = async (title, body, userId, noteId) => {
	// update notes set title = :title, body = :body, updatedAt = now

	// Note to update
	let noteToUpdate;

	// Notes array
	let notes;
	const filterFunction = (note) => {
		return note.userId === userId && note.id === noteId && note.active === true
	}

	try {
		// read from the file
		notes = JSON.parse(await fs.promises.readFile(filePath, { encoding: 'utf8' }))

		// Filter the note to update
		noteToUpdate = notes.filter(filterFunction)[0];

		// new notes
		notes = notes.filter((note) => note.userId !== userId && note.id !== noteId && note.active === true)

		// Update the note
		noteToUpdate.body = body;
		noteToUpdate.title = title;
		noteToUpdate.updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');

		// Push the object to notes
		notes.push(noteToUpdate);

		// Save the array file

		await fs.promises.writeFile(filePath, JSON.stringify(notes));

	} catch (e) {
		throw e;
	}

	// REturn updated note
	return noteToUpdate;

}

// Add the note to the DB
const addNoteToDB = async (note) => {
	// Generates an Id for the new Note and timestamps
	const now = moment().format('YYYY-MM-DD HH:mm:ss');
	let newNote = { id: createId(), createdAt: now, updatedAt: now, active: true, ...note };
	notes.push(newNote);
	try {
		// Build the path file to the json file


		// Saves the updated notes array to the notes "table"
		await fs.promises.writeFile(filePath, JSON.stringify(notes));
	} catch (e) {
		throw e;
	}
	return newNote;
}

// Get all notes of current logged user
const getAllNotesFromUser = (userId) => {
	const promise = new Promise((resolve, reject) => {
		// Select * from notes where userId == :userId
		const filterFunction = (note) => {
			return note.userId === userId && note.active === true
		}
		const notesFromUser = notes.filter(filterFunction);
		if (notesFromUser) {
			resolve(notesFromUser);
		} else {
			const error = new Error('Notes not found');
			error.code = 404;
			reject(error)
		}
	})
	return promise;
}

module.exports = { updateNoteInDB, getNoteByIdFromDB, addNoteToDB, getAllNotesFromUser }