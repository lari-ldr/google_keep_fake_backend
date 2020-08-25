const   express = require("express"),
        router = express.Router()

const   {
    mainPage,
    getAllNotes,
    getNewNote,
    postNewNote,
    putAExistingNote,
    deleteNote,
    putCreateANewRelationship,
    deleteARelationship,
    allLabelsOfASpeficNote,
    notExistPageOrRoute
} = require('../controllers/notes');

// router.get("/", mainPage)

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

// create a new relationship - testar no postman
router.put("/index/:id/notes_labels/:label_id", putCreateANewRelationship )

// delete a relationship - testar no postman
router.delete("/index/:id/notes_labels/:label_id", deleteARelationship )

router.get("/index/:id/see_all_noteslabels", allLabelsOfASpeficNote )
// router.get("*", notExistPageOrRoute); 

module.exports = router;