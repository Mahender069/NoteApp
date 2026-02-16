const Note = require("../models/Note");
const getAllNotes = async (req, res) => {
  try {
    const { id } = req.userInfo;
    const allNotes = await Note.find({ id });
    if (!allNotes) {
      res.status(404).json({
        success: true,
        message: "Notes are not present",
      });
    }
    res.status(200).json({
      success: true,
      message: "Got all notes",
      data: allNotes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong plz try again",
    });
  }
};
const createNote = async (req, res) => {
  try {
    const { title, content, category, tags } = req.body;

    const { id } = req.userInfo;
    const newNote = await Note.create({
      id,
      title,
      content,
      category,
      tags,
    });

    if (!newNote) {
      res.status(400).json({
        success: false,
        message: "Something went wrong plz try again",
      });
    }

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      noteData: newNote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong plz try again",
    });
  }
};
const deleteNote = async (req, res) => {
  try {
    const {id}=req.body;
    const deletedMessage=await Note.findByIdAndDelete(id,{new:true});
    res.status(200).json({
      success:true,
      message:'Deleted successfully',
      data:deletedMessage
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong plz try again",
    });
    console.log(error);
  }
};
const updateNote = async (req, res) => {};

module.exports = { getAllNotes, createNote, deleteNote, updateNote };
