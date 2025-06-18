import Note from "../../models/Note.js"

export const getAllNotes = (req, res)=>{
    res.status(200).json({message: 'You got 50 notes'})
}

export const addNotes = (req, res)=>{
    res.status(201).json({message: 'Notes added'})
}

export const editNotes = (req, res)=>{
    res.status(204).json({message: 'Notes updated'})
}

export const deletNotes = (req, res)=>{
    res.status(204).json({message: 'Notes deleted'})
}