// const http = require('http');
// const hostname = '127.0.0.1';
// const port = 9000;

// const server = http.createServer((req, res)=>{
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello, world!\n');
// })

// server.listen(port, hostname, ()=>{
//     console.log(`Server running at http://${hostname}:${port}/`);
// });

// ================================================
const   express     = require("express"),
        bodyParser  = require("body-parser"),
        Pool        = require("pg").Pool,
        app         = express(),
        dotenv      = require("dotenv"),
        cors        = require("cors");



dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });
          
const pool = new Pool({
    user: "google_keep_fake",
    host: "localhost",
    database: "google_keep_fake",
    password: "Free84LA",
    port: 5432
});

// const notesRoutes = require('./routes/notes');
// const notesConfigsRoutes = require('./routes/notesConfigs');
// app.use(notesRoutes)
// app.use(notesConfigsRoutes)

app.get("/", (req,res)=>{
    res.send("This is the main page, please type /notes to see all notes, or type /index to see all the notes and settings")
})

app.get("/notes",(req, res)=>{
    pool.query(
        
        `SELECT * FROM notes`, (err, results)=>{
            if(err){
                console.log(err);
                return err;
            }
            res.send(results.rows)
        }
    )
});
// list all notes
app.get("/index", (req, res)=>{
    pool.query(
        `SELECT * FROM notes JOIN notesconfigs ON id = notesconfigs.note_id`, (err, results)=>{
            if(err){
                console.log(err);
                return err;
            }
            res.send(results.rows)
        }
    )
});
// get create a new note "/index/:id/new" SHOULD APPEARS THE NOTES SETTINGS TOO
app.get("/index/:id", (req, res)=>{
    const note_id = parseInt(req.params.id)
    // pool.query(`SELECT * FROM notes WHERE id = ${note_id}`, (err, results)=>{
    //     if(err){
    //         console.log(err);
    //         return err;
    //     }
    //     res.send(results.rows)
    // })
    pool.query(`SELECT * FROM notes JOIN notesconfigs ON id = notesconfigs.note_id WHERE id = ${note_id}`, (err, results)=>{
        if(err){
            console.log(err);
            return err;
        }
        res.send(results.rows)
    })
});

app.post("/index/:id",(req, res)=>{
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
});
// here should have a get request with the url "/index/:id/edit"
// than put like this
app.put("/index/:id",(req, res)=>{
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
});

app.delete("/index/:id",(req, res)=>{
    const note_id = parseInt(req.params.id)
    pool.query(`DELETE FROM notes WHERE id = ${note_id}`, (err, result)=>{
        if(err){
            console.log(err);
            return err;
        }
        console.log("note and note settings successfully removed!")
        res.send(result.rows)
    })
});
// ================================================================
// =================== SETTINGS ROUTES ============================
// ================================================================
app.get("/settings",(req, res)=>{
    pool.query(
        `SELECT * FROM notesconfigs`, (err, results)=>{
            if(err){
                console.log(err);
                return err;
            }
            res.send(results.rows)
        }
    )
});

app.get("/settings/:note_id", (req, res)=>{
    const note_id = parseInt(req.params.id)
    pool.query(`SELECT * FROM notesconfigs WHERE note_id = ${note_id}`, (err, results)=>{
        if(err){
            console.log(err);
            return err;
        }
        res.send(results.rows)
    })
})

app.post("/settings/:note_id", (req, res)=>{
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

})

app.put("/settings/:id",(req, res)=>{
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
});

// ================================================================
// ===================== LABELS ROUTES OK =========================
// ================================================================
// show all labels
app.get("/labels", (req, res)=>{
    pool.query(
        `SELECT * FROM labels`, (err, results)=>{
            if(err){
                console.log(err);
                return err;
            }
            res.send(results.rows)
        }
    )
});

// get one label
app.get("/labels/:id", (req, res)=>{
    const id = parseInt(req.params.id)
    pool.query(
        `SELECT * FROM labels WHERE id = ${id}`, (err, labelResults)=>{
            if(err){
                console.log(err);
                return err;
            }
            res.send(labelResults.rows)
        }
    )
});

// post a new label
app.post("/labels/:id", (req, res)=>{
    const{
        id,
        labels
    } = req.body
    console.log(req.body)
    pool.query(
        `INSERT INTO labels (id, labels) VALUES ($1, $2)`, [id, labels], (err, labelResults)=>{
            if(err){
                console.log(err);
                return err;
            }
            console.log("new label successfully added! ")
            res.send(labelResults)
        }
    )
});
// update a existing label
app.put("/labels/:id", (req, res)=>{
    const id = parseInt(req.params.id)
    const{
        labels
    } = req.body
    console.log(req.body)
    pool.query(
        `UPDATE labels SET labels = $1 WHERE id = ${id}`, [labels], (err, labelResults)=>{
            if(err){
                console.log(err);
                return err;
            }
            console.log(`label successfully updated, LABEL_ID is: ${id}`)
            res.send(labelResults.rows)
        }
    )
});

// delete a label - working fine
app.delete("/labels/:id", (req, res)=>{
    const id = parseInt(req.params.id)
    pool.query(`DELETE FROM labels WHERE id = ${id}`, (err, labelResults)=>{
        if(err){
            console.log(err);
            return err;
        }
        console.log("label successfully removed!")
        res.send(labelResults.rows)
    })
});
// ============================================================================================================================
// RELAÇÃO LABEL COM NOTES
// mostra todas as notas que pertecem a uma mesma label - errado
app.get("/z/:id",(req, res)=>{
    const id = parseInt(req.params.id)
    pool.query(
        // `SELECT labels.id, labels, notes.id, title, content, created FROM notes,labels WHERE labels.id = ${id}`
        `SELECT notes_labels.note_id, notes_labels.label_id, labels.labels, labels.id,notes FROM notes_labels, labels, notes WHERE notes_labels.label_id = 1 AND labels.id = 1`
        , (err, results)=>{
            if(err){
                console.log(err);
                return err;
            }
            res.send(results.rows)
        }
    )
});

// mostra todas as labels pertecentes a uma mesma nota - errado
app.get("/x/:id", (req, res)=>{
    const id = parseInt(req.params.id)
    pool.query(
        // `SELECT distinct labels, notes.id, title,content,created FROM labels,notes WHERE (labels = 'filmes' OR labels = 'series') AND notes.id = 1`
        // `SELECT distinct labels, notes.id FROM labels,notes WHERE notes.id = ${id}`
        `SELECT distinct labels, notes.id, title, content, created FROM labels,notes WHERE notes.id = ${id}`
        `SELECT distinct notes_labels.note_id, notes_labels.label_id, labels,notes.id, title, content FROM notes_labels, labels, notes WHERE notes_labels.note_id = 1 AND notes.id = 1`
        // `SELECT distinct labels, notes.id FROM labels,notes WHERE (labels = 'filmes' OR labels = 'series' OR labels = 'livros') AND notes.id = 1`
        , (err, results)=>{
        if(err){
            console.log(err);
            return err;
        }
        res.send(results.rows)
    })
})

// criar rota pra conectar label com notes
app.get("/notes-labels", (req, res)=>{
    pool.query(
        `SELECT * FROM notes_labels`, (err, labelResults)=>{
            if(err){
                console.log(err);
                return err;
            }
            res.send(labelResults.rows)
        }
    )
});

app.get("/notes-labels/:id", (req, res)=>{
    const id = parseInt(req.params.id)
    pool.query(
        `SELECT * FROM notes_labels WHERE label_id = ${id} OR note_id = ${id}`, (err, labelResults)=>{
            if(err){
                console.log(err);
                return err;
            }
            res.send(labelResults.rows)
        }
    )
});

// app.post("/labels-notes/:id", (req,res)=>{
//     const{
//         note_id,
//         label_id
//     } = req.body
//     console.log(req.body)
//     pool.query(`INSERT INTO notes_labels (note_id, label_id) VALUES ($1, $2)`, [note_id, label_id], (err, results)=>{
//         if(err){
//             console.log(err);
//             return err;
//         }
//         res.send(results.rows)
//     })
// })

app.put("/index/:id/labels-notes/:label_id", (req,res)=>{
    const id = parseInt(req.params.id)
    const label_id = parseInt(req.params.label_id)
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
        res.send(results.rows)
    })
})

// deletar o label da nota
// DELETE FROM notes_labels WHERE note_id = 1 AND label_id = 1; (her - filmes)

// USAR ESSES!!!!
// Eu preciso mostrar todas as notas que pertecem a uma label - > SELECT labels.id, labels.labels, notes.id, notes.title,notes.
// content, notes_labels.label_id, notes_labels.note_id FROM labels INNER JOIN notes_labels ON labels.id = notes_labels.label_id INNER JOIN notes ON notes.id = notes_labels.note_id WHERE labels.id = 2; (change the id basement on the link)
// E
// Todas as labels relacionadas a uma unica nota -> SELECT notes.id, notes.title, notes.content, labels.id, labels.labels, notes_labels.note_id, notes_labels.label_id FROM notes INNER JOIN notes_labels ON notes_labels.note_id = notes.id INNER JOIN labels ON notes_labels.label_id = labels.id;


// it works - para editar a relação espefica entre nota e label
// SELECT distinct notes_labels.note_id, notes_labels.label_id,notes.id, title, content, labels.id, labels FROM notes_labels, labels, notes WHERE notes_labels.note_id = 1 AND notes.id = 1 AND notes_labels.label_id = 1 AND labels.id = 1;
// SELECT distinct notes_labels.note_id, notes_labels.label_id,notes.id, title, content, labels.id, labels FROM notes_labels, labels, notes WHERE notes_labels.note_id = 1 AND notes.id = 1;


// ================================================================
app.get("*",(req, res)=>{
    res.send("THIS PAGE OR ROUTE DOESN'T EXIST!");
});


// ================================================================
app.listen(process.env.PORT, ()=>{
    console.log("Server has started on port", process.env.PORT);
});