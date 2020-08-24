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
            `SELECT * FROM notes INNER JOIN notesconfigs ON id = notesconfigs.note_id`, (err, results)=>{
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
        pool.query(`SELECT * FROM notes JOIN notesconfigs ON id = notesconfigs.note_id WHERE id = ${note_id}`, (err, results)=>{
            if(err){
                console.log(err);
                return err;
            }
            res.send(results.rows)
        })
    },

    postNewNote(req, res){
        const {
            id,
            title,
            content
        } = req.body
        console.log(req.body)
    
        pool.query(`INSERT INTO notes (id, title, content, created) VALUES ($1, $2, $3, to_timestamp(${Date.now()}/1000.0))`,
        [id, title, content], (err, result)=>{
            if(err){
                console.log(err);
                return err;
            }
            console.log("new note successfully added! ")
            res.send(result)        
        })    
    },

    // shoul have a get request for edit a note here
    putAExistingNote(req, res){
        const id = parseInt(req.params.id)
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
            console.log(`note successfully updated, ID is: ${id}`)
            res.send(results.rows)
        })
    },

    deleteNote(req, res){
        const note_id = parseInt(req.params.id)
        pool.query(`DELETE FROM notes WHERE id = ${note_id}`, (err, result)=>{
            if(err){
                console.log(err);
                return err;
            }
            console.log("note and note settings successfully removed!")
            res.send(result.rows)
        })
    },

    notExistPageOrRoute(req, res){
        res.send("THIS PAGE OR ROUTE DOESN'T EXIST!");
    }
}