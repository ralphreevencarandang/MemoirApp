import express from 'express'
import { getAllNotes, createNote, deletNote, updateNote, getNote } from '../controllers/notesController.js';
const router = express.Router();

router.get('/',getAllNotes)
// router.get('/:id',getNote)
router.post('/',createNote)
// router.put('/:id',updateNote)
// router.delete('/:id',deletNote)


export default router;