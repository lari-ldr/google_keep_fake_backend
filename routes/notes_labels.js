const   express = require("express"),
        router = express.Router()

const   {
    getAllRelationshipsBetweenNotesAndLabels,
    getOneRelationshipBetweenNotesAndLabels
} = require('../controllers/notes_labels');

router.get("/notes_labels", getAllRelationshipsBetweenNotesAndLabels);

router.get("/notes_labels/:id", getOneRelationshipBetweenNotesAndLabels);

module.exports = router;