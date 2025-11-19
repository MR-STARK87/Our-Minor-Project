import express from "express";
import tokenChecker from "../middlewares/tokenChecker.js";
import validate from "../middlewares/validate.js";
import {
  createNoteSchema,
  updateNoteSchema,
  searchNotesSchema,
  getNotesSchema,
} from "../validators/noteSchemas.js";
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
  searchNotes,
  getNotesByTag,
  getNotesByCategory,
  togglePin,
  toggleFavorite,
  archiveNote,
  getUserTags,
  getUserCategories,
} from "../controllers/note.js";

const router = express.Router();

// All routes are protected by tokenChecker middleware
router.use(tokenChecker);

// Create a new note
router.post("/", validate({ body: createNoteSchema }), createNote);

// Get all notes with optional filters
router.get("/", validate({ query: getNotesSchema }), getNotes);

// Search notes
router.get("/search", validate({ query: searchNotesSchema }), searchNotes);

// Get all user tags
router.get("/tags", getUserTags);

// Get all user categories
router.get("/categories", getUserCategories);

// Get notes by tag
router.get("/tag/:tag", getNotesByTag);

// Get notes by category
router.get("/category/:category", getNotesByCategory);

// Get a single note by ID
router.get("/:id", getNoteById);

// Update a note
router.put("/:id", validate({ body: updateNoteSchema }), updateNote);

// Delete a note
router.delete("/:id", deleteNote);

// Toggle pin status
router.patch("/:id/pin", togglePin);

// Toggle favorite status
router.patch("/:id/favorite", toggleFavorite);

// Archive/unarchive a note
router.patch("/:id/archive", archiveNote);

export default router;
