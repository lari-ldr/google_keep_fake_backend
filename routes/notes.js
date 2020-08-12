const   express = require("express"),
        router = express.Router()

const   {
    mainPage,
    getAllNotes,
    getAllNotesWithTheConfigs,
    getNewNote,
    postNewNote,
    putAExistingNote,
    deleteNote,
    notExistPageOrRoute
} = require('../controllers/notes');

router.get("/", mainPage)
router.get("/all", getAllNotesWithTheConfigs)
// list all notes
router.get("/index", getAllNotes)
// get create a new note "/index/:id/new"
router.get("/index/:id", getNewNote)
// post created new note
router.post("/index/:id", postNewNote)
// here should have a get request with the url "/index/:id/edit"
// than put like this
router.put("/index/:id", putAExistingNote)
// delete request
router.delete("/index/:id", deleteNote)

router.get("*", notExistPageOrRoute);

module.exports = router;