const   express = require('express'),
        router = express.Router()

const{
    getAllLabels,
    getANewLabel,
    postANewLabel,
    putALabel,
    deleteALabel,
    allNotesOfASpeficiLabel
} = require('../controllers/labels');

router.get("/labels", getAllLabels);

// get one label
router.get("/labels/:id", getANewLabel);

// post a new label
router.post("/labels/:id", postANewLabel);
// update a existing label
router.put("/labels/:id", putALabel);

// delete a label - working fine
router.delete("/labels/:id", deleteALabel);

router.get("/labels/:id/see_all_noteslabels", allNotesOfASpeficiLabel )

module.exports = router;