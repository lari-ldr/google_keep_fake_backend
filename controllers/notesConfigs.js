const   express     = require("express"),
        Pool        = require("pg").Pool;
                  
const pool = new Pool({
    user: "google_keep_fake",
    host: "localhost",
    database: "google_keep_fake",
    password: "Free84LA",
    port: 5432
});

module.exports ={

    getAllNotesConfigs(req, res){
        pool.query(
            `SELECT * FROM notesconfigs`, (err, results)=>{
                if(err){
                    console.log(err);
                    return err;
                }
                res.send(results.rows)
            }
        )
    },
    // getAllNotes(req, res){
    //     pool.query(
    //         `SELECT * FROM notes JOIN notesconfigs ON id = notesconfigs.note_id`, (err, results)=>{
    //             if(err){
    //                 console.log(err);
    //                 return err;
    //             }
    //             res.send(results.rows)
    //         }
    //     )
    // },

    getNewNoteConfig(req, res){
        const note_id = parseInt(req.params.id)
        pool.query(`SELECT * FROM notesconfigs WHERE note_id = ${note_id}`, (err, results)=>{
            if(err){
                console.log(err);
                return err;
            }
            res.send(results.rows)
        })
    },

    postNewNoteConfig(req, res){
        const {
            background_color,
            is_archived,
            is_pinned,
            it_has_any_label
        } = req.body

    
        pool.query(`INSERT INTO notesconfigs (background_color, is_archived, is_pinned, it_has_any_label ) VALUES ($1, $2, $3, $4)`,
        [background_color, is_archived, is_pinned, it_has_any_label], (err, result)=>{
            if(err){
                console.log(err);
                return err;
            }
            console.log("note settings successfully added! ")
            console.log(background_color,  is_archived, is_pinned, it_has_any_label)
            res.send(result.insertId)
        })
    },

    // shoul have a get request for edit a note here
    putAExistingNoteConfig(req, res){
        const note_id = parseInt(req.params.id)

        const{
            background_color,
            is_archived,
            is_pinned,
            it_has_any_label
        } = req.body
    
        pool.query(`UPDATE notesconfigs SET background_color = $1, is_archived = $2, is_pinned = $3, it_has_any_label = $4 WHERE note_id = ${note_id}`,
        [background_color, is_archived, is_pinned, it_has_any_label], (err, results)=>{
            if(err){
                console.log(err)
                return err
            }
            console.log(`note settings successfully updated, NOTE_ID is: ${note_id}`)
            res.send(results.rows)
        })
    },

    // deleteNoteConfigs(req, res){
    //     // const item_idS = parseInt(req.body.id)
    //     const note_id = parseInt(req.params.id)
    //     // console.log(item_idS)
    //     pool.query(`DELETE FROM notes WHERE id = ${note_id}`, (err, result)=>{
    //         if(err){
    //             console.log(err);
    //             return err;
    //         }
    //         console.log("item successfully removed!")
    //         res.send(result.rows)
    //     })
    // },

}