import Note from "../models/note.js";
import asyncHandler from "../utils/asyncHandler.js";

// Create a new note
const createNote = asyncHandler(async (req, res) => {
  const { title, content, tags, category, color, isPinned, isFavorite } =
    req.body;

  // Validate required fields
  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: "Title and content are required",
    });
  }

  // Create new note
  const note = new Note({
    userId: req.user._id,
    title,
    content,
    tags: tags || [],
    category: category || "General",
    color: color || "#ffffff",
    isPinned: isPinned || false,
    isFavorite: isFavorite || false,
  });

  // Extract plain text from Quill Delta for search
  note.plainText = note.extractPlainText();

  await note.save();

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    data: note,
  });
});

// Get all user notes
const getNotes = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 20,
    category,
    tag,
    isPinned,
    isFavorite,
    isArchived = false,
  } = req.validatedQuery || req.query;

  const filters = { isArchived: isArchived === "true" };

  if (category) filters.category = category;
  if (tag) filters.tags = tag.toLowerCase();
  if (isPinned !== undefined) filters.isPinned = isPinned === "true";
  if (isFavorite !== undefined) filters.isFavorite = isFavorite === "true";

  const options = {
    limit: parseInt(limit),
    skip: (parseInt(page) - 1) * parseInt(limit),
    sort: { isPinned: -1, lastEditedAt: -1 },
  };

  const notes = await Note.getUserNotes(req.user._id, filters, options);
  const total = await Note.countDocuments({ userId: req.user._id, ...filters });

  res.status(200).json({
    success: true,
    message: "Notes fetched successfully",
    data: {
      notes,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalNotes: total,
        notesPerPage: parseInt(limit),
      },
    },
  });
});

// Get a single note by ID
const getNoteById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const note = await Note.findOne({ _id: id, userId: req.user._id });

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Note fetched successfully",
    data: note,
  });
});

// Update a note
const updateNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    title,
    content,
    tags,
    category,
    color,
    isPinned,
    isFavorite,
    isArchived,
  } = req.body;

  const note = await Note.findOne({ _id: id, userId: req.user._id });

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found",
    });
  }

  // Update fields if provided
  if (title !== undefined) note.title = title;
  if (content !== undefined) {
    note.content = content;
    note.plainText = note.extractPlainText();
  }
  if (tags !== undefined) note.tags = tags;
  if (category !== undefined) note.category = category;
  if (color !== undefined) note.color = color;
  if (isPinned !== undefined) note.isPinned = isPinned;
  if (isFavorite !== undefined) note.isFavorite = isFavorite;
  if (isArchived !== undefined) note.isArchived = isArchived;

  await note.save();

  res.status(200).json({
    success: true,
    message: "Note updated successfully",
    data: note,
  });
});

// Delete a note
const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const note = await Note.findOneAndDelete({ _id: id, userId: req.user._id });

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Note deleted successfully",
  });
});

// Search notes
const searchNotes = asyncHandler(async (req, res) => {
  const { query } = req.validatedQuery || req.query;

  if (!query || query.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Search query is required",
    });
  }

  const notes = await Note.searchNotes(req.user._id, query);

  res.status(200).json({
    success: true,
    message: "Search completed successfully",
    data: {
      notes,
      count: notes.length,
    },
  });
});

// Get notes by tag
const getNotesByTag = asyncHandler(async (req, res) => {
  const { tag } = req.params;

  const notes = await Note.getNotesByTag(req.user._id, tag);

  res.status(200).json({
    success: true,
    message: `Notes with tag "${tag}" fetched successfully`,
    data: {
      notes,
      count: notes.length,
    },
  });
});

// Get notes by category
const getNotesByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;

  const notes = await Note.getNotesByCategory(req.user._id, category);

  res.status(200).json({
    success: true,
    message: `Notes in category "${category}" fetched successfully`,
    data: {
      notes,
      count: notes.length,
    },
  });
});

// Toggle pin status
const togglePin = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const note = await Note.findOne({ _id: id, userId: req.user._id });

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found",
    });
  }

  note.isPinned = !note.isPinned;
  await note.save();

  res.status(200).json({
    success: true,
    message: `Note ${note.isPinned ? "pinned" : "unpinned"} successfully`,
    data: note,
  });
});

// Toggle favorite status
const toggleFavorite = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const note = await Note.findOne({ _id: id, userId: req.user._id });

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found",
    });
  }

  note.isFavorite = !note.isFavorite;
  await note.save();

  res.status(200).json({
    success: true,
    message: `Note ${note.isFavorite ? "added to" : "removed from"} favorites successfully`,
    data: note,
  });
});

// Archive a note
const archiveNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const note = await Note.findOne({ _id: id, userId: req.user._id });

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found",
    });
  }

  note.isArchived = !note.isArchived;
  await note.save();

  res.status(200).json({
    success: true,
    message: `Note ${note.isArchived ? "archived" : "unarchived"} successfully`,
    data: note,
  });
});

// Get all tags used by user
const getUserTags = asyncHandler(async (req, res) => {
  const tags = await Note.distinct("tags", {
    userId: req.user._id,
    isArchived: false,
  });

  res.status(200).json({
    success: true,
    message: "Tags fetched successfully",
    data: {
      tags,
      count: tags.length,
    },
  });
});

// Get all categories used by user
const getUserCategories = asyncHandler(async (req, res) => {
  const categories = await Note.distinct("category", {
    userId: req.user._id,
    isArchived: false,
  });

  res.status(200).json({
    success: true,
    message: "Categories fetched successfully",
    data: {
      categories,
      count: categories.length,
    },
  });
});

export {
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
};
