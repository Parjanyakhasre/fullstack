// kuch bhi create krna hai to uska schema bnaana padta hai

const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: String,
    description: String,
})

const noteModel = mongoose.model("notes", noteSchema);

module.exports = noteModel;