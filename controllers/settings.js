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

    getAllNotesSettings(req, res){
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

    getNewNoteSettings(req, res){
        const note_id = parseInt(req.params.id)
        console.log(note_id)
        pool.query(`SELECT * FROM notesconfigs WHERE note_id = ${note_id}`, (err, results)=>{
            if(err){
                console.log(err);
                return err;
            }
            res.send(results.rows)
        })
    },

    postNewNoteSettings(req, res){
        const {
            note_id,
            background_color,
            is_archived,
            is_pinned,
        } = req.body
        console.log(req.body)
    
        pool.query(`INSERT INTO notesconfigs (note_id, background_color, is_archived, is_pinned ) VALUES ($1, $2, $3, $4)`,
        [note_id, background_color, is_archived, is_pinned], (err, result)=>{
            if(err){
                console.log(err);
                return err;
            }
            console.log("new note settings successfully added! ")
            res.send(result)
        })
    },

    // shoul have a get request for edit a note here
    putAExistingNoteSettings(req, res){
        const note_id = parseInt(req.params.id)
        const{
            background_color,
            is_archived,
            is_pinned,
        } = req.body
    
        pool.query(`UPDATE notesconfigs SET background_color = $1, is_archived = $2, is_pinned = $3 WHERE note_id = ${note_id}`,
        [ background_color, is_archived, is_pinned], (err, results)=>{
            if(err){
                console.log(err)
                return err
            }
            console.log(`notes settings successfully updated, NOTE_ID is: ${note_id}`)
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