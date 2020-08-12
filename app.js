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
        it_has_any_label
    } = req.body


    pool.query(`INSERT INTO notesconfigs (note_id, background_color, is_archived, is_pinned, it_has_any_label ) VALUES ($1, $2, $3, $4, $5)`,
    [note_id, background_color, is_archived, is_pinned, it_has_any_label], (err, result)=>{
        if(err){
            console.log(err);
            return err;
        }
        console.log("new note settings successfully added! ")
        console.log(background_color,  is_archived, is_pinned, it_has_any_label)
        res.send(result)
    })
})

app.put("/settings/:id",(req, res)=>{
    const note_id = parseInt(req.params.id)
    const{
        background_color,
        is_archived,
        is_pinned,
        it_has_any_label
    } = req.body

    pool.query(`UPDATE notesconfigs SET background_color = $1, is_archived = $2, is_pinned = $3, it_has_any_label = $4 WHERE note_id = ${note_id}`,
    [ background_color, is_archived, is_pinned, it_has_any_label], (err, results)=>{
        if(err){
            console.log(err)
            return err
        }
        console.log(`notes settings successfully updated, NOTE_ID is: ${note_id}`)
        res.send(results.rows)
    })
});

// ================================================================
// ===================== LABELS ROUTES ============================
// ================================================================

app.get("/labels", (req,res)=>{
    res.send("this is will be the labels settings one day");
})

// ================================================================
app.get("*",(req, res)=>{
    res.send("THIS PAGE OR ROUTE DOESN'T EXIST!");
});


// ================================================================
app.listen(process.env.PORT, ()=>{
    console.log("Server has started on port", process.env.PORT);
});