import Note from "../models/Note.js";
export const getAllNotes = async (req, res)=>{
        try {
            const notes = await Note.find();
            if(!notes){
                return res.status(500).json({message: 'Interval server error'})
            }
            res.status(200).json(notes)
        } catch (error) {
            res.status(500).json({message: "Interval server error"})
            console.error('Get all notes controller error', error);
        }
}
export const getNote = async (req, res)=>{
        try {
            const {id} = req.params
            const note = await Note.findById(id);
            if(!note){
                return res.status(500).json({message: 'Interval server error'})
            }
            res.status(200).json(note)
        } catch (error) {
            res.status(500).json({message: "Interval server error"})
            console.error('Get all notes controller error', error);
        }
}

export const createNote = async (req, res)=>{
    try {
        const {title, content} = req.body;
        const newNote =  new Note({
            title,
            content
        });
        await newNote.save();
        if(!newNote){
            return res.status(500).json({message: 'Failed to create note'})
        }
        res.status(201).json({message: 'Note created successfully'})
    } catch (error) {
        res.status(500).json({message: "Interval server error"})
        console.error('Create note controller error', error);
    }
}

export const updateNote = async (req, res)=>{
    try {
        const {title, content} = req.body;
        const {id} = req.params;
        const updatedNote = await Note.findByIdAndUpdate(id, {title, content});
        if(!updatedNote){
            return res.status(404).json({message: 'Not not found'})
        }
        res.status(200).json(updatedNote)
    } catch (error) {
        console.error('Update note controller error', error);
        res.status(500).json({message: "Interval server error"})
    }
}

export const deletNote = async (req, res)=>{
    try {
        const {id} = req.params;
        
        const deleteNote = await Note.findByIdAndDelete(id);
        if (!deleteNote){
            return res.status(404).json({message: 'Note not found'});
        } 

        res.status(200).json({message: 'Note deleted successfully'});
        
    } catch (error) {
        console.error('Delete controller error', error);
        res.status(500).json({message: 'Interval server error'})
        
    }
}