import express from 'express'
import { getAllNotes, addNotes, deletNotes, editNotes } from '../controllers/notesController.js';
const router = express.Router();

router.get('/',getAllNotes)
router.post('/',addNotes)
router.put('/:id',editNotes)
router.put('/:id',deletNotes)


export default router;