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
        const search_vector = [title, content]
        const values = [
            id,
            title,
            content,
            search_vector
        ]
        pool.query(`INSERT INTO notes (id, title, content, search_vector, created) VALUES ($1, $2, $3, to_tsvector($4), to_timestamp(${Date.now()}/1000.0))`,
        values, (err, result)=>{
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

    putCreateANewRelationship(req,res){
        const id = parseInt(req.params.id)
        const label_id = parseInt(req.params.label_id)
        console.log(id)
        console.log(label_id)
        // const{
        //     note_id,
        //     label_id
        // } = req.body
        // console.log(req.body)
        pool.query(`INSERT INTO notes_labels (note_id, label_id) VALUES ($1, $2)`, [id, label_id], (err, results)=>{
            if(err){
                console.log(err);
                return err;
            }
            console.log(`new note and label relationship successfully created! NOTE_ID is: ${id} and LABEL_ID is: ${label_id}`)
            res.send(results.rows)
        })
    },
    deleteARelationship(req, res){
        const id = parseInt(req.params.id)
        const label_id = parseInt(req.params.label_id)
        pool.query(`DELETE FROM notes_labels WHERE note_id = ${id} AND label_id = ${label_id}`, (err, results)=>{
            if(err){
                console.log(err);
                return err;
            }
            console.log("note and label relationship successfully removed!")
            res.send(results.rows)
        })
    },

    allLabelsOfASpeficNote(req,res){
        const id = parseInt(req.params.id)
        pool.query(`SELECT notes.id, notes.title, notes.content, labels.id, labels.labels, notes_labels.note_id, notes_labels.label_id FROM notes INNER JOIN notes_labels ON notes_labels.note_id = notes.id INNER JOIN labels ON notes_labels.label_id = labels.id WHERE notes.id = ${id}`, (err, results)=>{
            if(err){
                console.log(err)
                return err;
            }
            res.send(results.rows)
        })
    },

    notExistPageOrRoute(req, res){
        res.send("THIS PAGE OR ROUTE DOESN'T EXIST!");
    }
}