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

    mainPage(req,res){
        res.send("This is the main page, please type /index to see all notes, or type /merda to see all the notes and settins")
    },

    getAllNotes(req, res){
        pool.query(
            `SELECT * FROM notes`, (err, results)=>{
                if(err){
                    console.log(err);
                    return err;
                }
                res.send(results.rows)
            }
        )
    },

    getAllNotesWithTheConfigs(req, res){
        pool.query(
            `SELECT * FROM notes JOIN notesconfigs ON id = notesconfigs.note_id`, (err, results)=>{
                if(err){
                    console.log(err);
                    return err;
                }
                res.send(results.rows)
            }
        )
    },

    getNewNote(req, res){
        const note_id = parseInt(req.params.id)
        pool.query(`SELECT * FROM notes WHERE id = ${note_id}`, (err, results)=>{
            if(err){
                console.log(err);
                return err;
            }
            res.send(results.rows)
        })
    },

    postNewNote(req, res){
        const {
            title,
            content
            // created
        } = req.body
        // console.log(req.body)
        // const {notes} = req.body
    
        pool.query(`INSERT INTO notes (title, content, created) VALUES ($1, $2, to_timestamp(${Date.now()}/1000.0))`,
        [title, content], (err, result)=>{
            if(err){
                console.log(err);
                return err;
            }
            console.log("item successfully added! ")
            console.log(title,  content)
            res.send(result.insertId)
        })
    },

    // shoul have a get request for edit a note here
    putAExistingNote(req, res){
        const id = parseInt(req.params.id)
        console.log(id)
        const{
            title,
            content
            // created
        } = req.body
        console.log(req.body)
    
        pool.query(`UPDATE notes SET title = $1, content = $2 WHERE id = ${id}`,
        [title, content], (err, results)=>{
            if(err){
                console.log(err)
                return err
            }
            console.log(`item successfully updated, ID is: ${id}`)
            res.send(results.rows)
        })
    },

    deleteNote(req, res){
        // const item_idS = parseInt(req.body.id)
        const note_id = parseInt(req.params.id)
        // console.log(item_idS)
        pool.query(`DELETE FROM notes WHERE id = ${note_id}`, (err, result)=>{
            if(err){
                console.log(err);
                return err;
            }
            console.log("item successfully removed!")
            res.send(result.rows)
        })
    },

    notExistPageOrRoute(req, res){
        res.send("THIS PAGE OR ROUTE DOESN'T EXIST!");
    }
}