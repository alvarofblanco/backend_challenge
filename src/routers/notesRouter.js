const express = require('express');

const notesContoller = require('../controllers/notesController');
const { authenticateToken } = require('../services/userServices');

const notesRouter = express.Router();

notesRouter.route('/').post(authenticateToken, notesContoller.createNote).get(authenticateToken, notesContoller.listAllNotes);
notesRouter.route('/:noteId').get(authenticateToken, notesContoller.getNoteById).delete(authenticateToken, notesContoller.deleteNote).put(authenticateToken, notesContoller.updateNote);

module.exports = notesRouter;
