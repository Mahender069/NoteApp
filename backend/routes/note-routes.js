const express = require("express");
const {
  getAllNotes,
  createNote,
  deleteNote,
  updateNote,
} = require("../controllers/note-controllers");
const {loginMiddleware}=require('../middlewares/auth-middleware')

const router = express.Router();

router.get("/dashboard",loginMiddleware, getAllNotes);
router.post("/note/create",loginMiddleware, createNote);
router.delete("/notes/delete",loginMiddleware, deleteNote);
router.put("/notes/update",loginMiddleware, updateNote);

module.exports = router;
