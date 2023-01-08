const fs = require('fs');
const path = require('path');
const moment = require('moment');

// Import createId helper function
const { createId } = require('../lib/utils');

// notes file path
const filePath = path.join(__dirname, '..', 'data', 'notes.json');

// Get note by id
const getNoteByIdFromDB = async (noteId, userId) => {

	// Content of file
	let notes;
	try {
		// get the notes from the file
		notes = JSON.parse(await fs.promises.readFile(filePath, { encoding: 'utf8' }));
		// Find the note by id
		note = notes.find(x => x.id === noteId)

		// Check if user owns the note
		if (note.userId !== userId) {
			const error = new Error('Forbidden');
			error.code = 403;
			throw error;
		}

	} catch (e) {
		throw e;
	}
	// Return note if no errors found
	return note;
}

const deleteNoteInDb = async (userId, noteId) => {
	// Note to delete
	let noteToDelete

	// Notes array
	let notes;

	const filterFunction = (note) => {
		return note.userId === userId && note.id === noteId && note.active === true
	}
	try {
		// Read from file
		notes = JSON.parse(await fs.promises.readFile(filePath, { encoding: 'utf8' }));

		// Filter the note to delete
		noteToDelete = notes.filter(filterFunction)[0];

		// New notes
		notes = notes.filter((note) => note.userId !== userId && note.id !== noteId);

		// Delete the note
		noteToDelete.active = false;

		// Add the deleted note to the arrays
		notes.push(noteToDelete);

		// Save the array
		await fs.promises.writeFile(filePath, JSON.stringify(notes));
	} catch (e) {
		throw e;
	}
	// Return no content
	return;
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
		notes = notes.filter((note) => note.id !== noteId)

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
const getAllNotesFromUser = async (userId) => {
	// Notes from the file
	let notes;

	// Notes filtered by user
	let notesFromUser;

	try {
		notes = JSON.parse(await fs.promises.readFile(filePath, { encoding: 'utf8' }));
		console.log('notes', notes)

		notesFromUser = notes.filter(x => x.userId === userId && x.active === true)

		if (notesFromUser.length < 1) {
			const error = new Error('Notes not found');
			error.code = 404;
			throw error;
		}
	} catch (e) {
		throw e;
	}
	// Return notes if no errors
	return notesFromUser;
}

module.exports = { deleteNoteInDb, updateNoteInDB, getNoteByIdFromDB, addNoteToDB, getAllNotesFromUser }