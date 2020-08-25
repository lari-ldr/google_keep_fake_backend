const   express = require("express"),
        router = express.Router()

const {
    searchNotes
} = require('../controllers/searchNotes');

router.get("/search", searchNotes);

module.exports = router;