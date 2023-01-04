const express = require('express');

const notesContoller = require('../controllers/notesController');

const notesRouter = express.Router();

notesRouter.route('/').post(notesContoller.createNote).get(notesContoller.listAllNotes);
notesRouter.route('/:noteId').get(notesContoller.getNoteById).delete(notesContoller.deleteNote).put(notesContoller.updateNote);

module.exports = notesRouter;
