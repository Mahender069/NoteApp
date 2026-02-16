const express = require("express");
const {
  getAllNotes,
  createNote,
  deleteNote,
  updateNote,
} = require("../controllers/note-controllers");
const {loginMiddleware}=require('../middlewares/auth-middleware')

const router = express.Router();

router.get("/note/get",loginMiddleware, getAllNotes);
router.post("/note/create",loginMiddleware, createNote);
router.delete("/note/delete",loginMiddleware, deleteNote);
router.put("/note/update",loginMiddleware, updateNote);

module.exports = router;
