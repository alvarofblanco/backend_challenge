const createNote = async (req, res, next) => {
	return res.json({ message: 'create note OK' });
}

const listAllNotes = async (req, res, next) => {
	return res.json({ message: 'Get All Notes OK' });
}

const getNoteById = async (req, res, next) => {
	return res.json({ message: 'Get Note By ID OK', noteId: Number(req.params.noteId) });
}

const updateNote = async (req, res, next) => {
	return res.json({ message: 'Update Not OK', noteId: Number(req.params.noteId) });
}

const deleteNote = async (req, res, next) => {
	return res.json({ message: 'Delete Note OK', noteId: Number(req.params.noteId) });
}

module.exports = { createNote, listAllNotes, getNoteById, getNoteById, updateNote, deleteNote }

