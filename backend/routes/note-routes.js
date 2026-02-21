const express = require("express");
const {
  getAllNotes,
  createNote,
  deleteNote,
} = require("../controllers/note-controllers");
const {loginMiddleware}=require('../middlewares/auth-middleware')

const router = express.Router();

router.get("/dashboard",loginMiddleware, getAllNotes);
router.post("/note/create",loginMiddleware, createNote);
router.delete("/note/delete",loginMiddleware, deleteNote);

module.exports = router;
