const Note = require("../models/Note");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

//@desc Get all Documents
//@route GET /notes
//@access Private
const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find().lean().exec();

  if (!notes?.length) {
    return res.status(400).json({ message: "No notes found" });
  }

  const notesWithUser = Promise.all(
    notes.map(async (note) => {
      const user = await User.findById(note.user).lean().exec();
      return { ...note, username: user.username };
    })
  );
});

module.exports = {
  getAllNotes,
};
