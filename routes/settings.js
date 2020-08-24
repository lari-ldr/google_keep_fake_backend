const   express = require("express"),
        router = express.Router()

const   {
    getAllNotesSettings,
    getNewNoteSettings,
    postNewNoteSettings,
    putAExistingNoteSettings,
    // deleteNote
} = require('../controllers/settings'); 

// list all notes settings
router.get("/settings/", getAllNotesSettings)

// get create a new note "/index/:id/new"
router.get("/settings/:id", getNewNoteSettings)

// post created new note
router.post("/settings/:id", postNewNoteSettings)

// here should have a get request with the url "/index/:id/edit"
// than put like this
router.put("/settings/:id", putAExistingNoteSettings)

// delete request
// router.delete("/index/:id", deleteNote)

module.exports = router;