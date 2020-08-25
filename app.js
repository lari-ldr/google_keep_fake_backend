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

const notesRoutes = require('./routes/notes');
const settingsRoutes = require('./routes/settings');
const labelsRoutes = require('./routes/labels');
const notesLabelsRoutes = require('./routes/notes_labels');
// app.use(notesRoutes);
// app.use(settingsRoutes);
// app.use(labelsRoutes);

app.get("/", (req,res)=>{
    res.send("This is the main page, please type /notes to see all notes, or type /index to see all the notes and settings")
});

app.use(notesRoutes);
app.use(settingsRoutes);
app.use(labelsRoutes);
app.use(notesLabelsRoutes);

// ======================================================================================================================
// NESTED ROUTES BETWEEN LABELS AND NOTES TESTAR COM O POSTMAN ANTES DE EXCLUIR
// ======================================================================================================================


// // create a new relationship - OK
// app.put("/index/:id/notes_labels/:label_id", (req,res)=>{
//     const id = parseInt(req.params.id)
//     const label_id = parseInt(req.params.label_id)
//     console.log(id)
//     console.log(label_id)
//     // const{
//     //     note_id,
//     //     label_id
//     // } = req.body
//     // console.log(req.body)
//     pool.query(`INSERT INTO notes_labels (note_id, label_id) VALUES ($1, $2)`, [id, label_id], (err, results)=>{
//         if(err){
//             console.log(err);
//             return err;
//         }
//         console.log(`new note and label relationship successfully created! NOTE_ID is: ${id} and LABEL_ID is: ${label_id}`)
//         res.send(results.rows)
//     })
// })

// // delete a relationship - OK
// app.delete("/index/:id/notes_labels/:label_id", (req, res)=>{
//     const id = parseInt(req.params.id)
//     const label_id = parseInt(req.params.label_id)
//     pool.query(`DELETE FROM notes_labels WHERE note_id = ${id} AND label_id = ${label_id}`, (err, results)=>{
//         if(err){
//             console.log(err);
//             return err;
//         }
//         console.log("note and label relationship successfully removed!")
//         res.send(results.rows)
//     })
// })

// ======================================================================================================================
// NESTED ROUTES BETWEEN LABELS AND NOTES SHOWING AL THE INFORMATION OF NOTES AND LABELS
// TUDO OK AQUI, mas deixar um pouco comentado como referencia
// ======================================================================================================================
// USAR ESSES!!!!
// Eu preciso mostrar todas as notas que pertecem a uma label: (uma label TODAS as notas, logo o q muda aqui é o id da label)
// SELECT labels.id, labels.labels, notes.id, notes.title,notes.content, notes_labels.label_id, notes_labels.note_id FROM labels INNER JOIN notes_labels ON labels.id = notes_labels.label_id INNER JOIN notes ON notes.id = notes_labels.note_id WHERE labels.id = 2; (change the id basement on the link)
// SELECT labels.id, labels.labels, notes.id, notes.title,notes.content, notes_labels.label_id, notes_labels.note_id, notesconfigs.note_id, notesconfigs.background_color, notesconfigs.is_archived, notesconfigs.is_pinned FROM labels INNER JOIN notes_labels ON labels.id = notes_labels.label_id INNER JOIN notes ON notes.id = notes_labels.note_id INNER JOIN notesconfigs ON notes.id = notesconfigs.note_id WHERE labels.id = 1;

// app.get("/labels/:id/see_all_noteslabels", (req,res)=>{
//     const id = parseInt(req.params.id)
//     pool.query(
//         // `SELECT labels.id, labels.labels, notes.id, notes.title,notes.content, notes_labels.label_id, notes_labels.note_id FROM labels INNER JOIN notes_labels ON labels.id = notes_labels.label_id INNER JOIN notes ON notes.id = notes_labels.note_id WHERE labels.id = 2`
//         `SELECT labels.id, labels.labels, notes.id, notes.title,notes.content, notes_labels.label_id, notes_labels.note_id, notesconfigs.note_id, notesconfigs.background_color, notesconfigs.is_archived, notesconfigs.is_pinned FROM labels INNER JOIN notes_labels ON labels.id = notes_labels.label_id INNER JOIN notes ON notes.id = notes_labels.note_id INNER JOIN notesconfigs ON notes.id = notesconfigs.note_id WHERE labels.id = ${id};`
//         , (err, results)=>{
//         if(err){
//             console.log(err)
//             return err;
//         }
//         res.send(results.rows)
//     })
// })

// E
// Todas as labels pertecem a uma unica nota: (uma nota TODAS AS labels)
// SELECT notes.id, notes.title, notes.content, labels.id, labels.labels, notes_labels.note_id, notes_labels.label_id FROM notes INNER JOIN notes_labels ON notes_labels.note_id = notes.id INNER JOIN labels ON notes_labels.label_id = labels.id;
// SELECT notes.id, notes.title, labels.id, labels.labels, notes_labels.note_id, notes_labels.label_id FROM notes INNER JOIN notes_labels ON notes_labels.note_id = notes.id INNER JOIN labels ON notes_labels.label_id = labels.id ORDER BY notes.id;
// app.get("/index/:id/see_all_noteslabels", (req,res)=>{
//     const id = parseInt(req.params.id)
//     pool.query(`SELECT notes.id, notes.title, notes.content, labels.id, labels.labels, notes_labels.note_id, notes_labels.label_id FROM notes INNER JOIN notes_labels ON notes_labels.note_id = notes.id INNER JOIN labels ON notes_labels.label_id = labels.id WHERE notes.id = ${id}`, (err, results)=>{
//         if(err){
//             console.log(err)
//             return err;
//         }
//         res.send(results.rows)
//     })
// })


// ================================================================
app.get("*",(req, res)=>{
    res.send("THIS PAGE OR ROUTE DOESN'T EXIST!");
});


// ================================================================
app.listen(process.env.PORT, ()=>{
    console.log("Server has started on port", process.env.PORT);
});