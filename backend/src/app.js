// server ko create krna
const express = require("express")
const noteModel = require("./models/note.model")
const cors = require("cors")


const app = express()

// cors middleware
app.use(cors())

// Middleware to parse JSON
app.use(express.json())

// post /api/notes
// create new note and save data in db
// req.body => {title:, description:}
app.post("/api/notes", async (req, res) => {
    const { title, description } = req.body

    const note = await noteModel.create({ title, description })
    res.status(201).json({
        message: "note created successfully",
        note
    })
})

// get /api/notes
// get all notes from db
app.get("/api/notes", async (req, res) => {
    const notes = await noteModel.find()
    res.status(200).json({
        message: "notes fetched successfully",
        notes
    })
})

// delete /api/notes/:id
// delete note from db with the help of id from req.params
app.delete("/api/notes/:id", async (req, res) => {
    const id = req.params.id
    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "note deleted successfully",
    }) 
})

// patch /api/notes/:id
// update note in db with the help of id from req.params and data from req.body
app.patch("/api/notes/:id", async (req, res) => {
    const id = req.params.id
    const { description } = req.body

    await noteModel.findByIdAndUpdate(id, {description})

    res.status(200).json({
        message: "note updated successfully",
    })
})

module.exports = app