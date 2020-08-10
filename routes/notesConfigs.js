const   express = require("express"),
        router = express.Router(),

const   {
    getAllNotesConfigs,
    getNewNoteConfig,
    postNewNoteConfig,
    putAExistingNoteConfig,
    // deleteNote
} = require('../controllers/notesConfigs');

// list all notes settings
router.get("/index/notesconfigs", getAllNotesConfigs)

// get create a new note "/index/:id/new"
router.get("/index/:id/notesconfigs/:note_id", getNewNoteConfig)

// post created new note
router.post("/index/:id/notesconfigs/:note_id", postNewNoteConfig)

// here should have a get request with the url "/index/:id/edit"
// than put like this
router.put("/index/:id/notesconfigs/:note_id", putAExistingNoteConfig)

// delete request
// router.delete("/index/:id", deleteNote)

module.exports = router;