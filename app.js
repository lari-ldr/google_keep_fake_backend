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
const searchNotes = require('./routes/searchNotes');

app.get("/", (req,res)=>{
    res.send("This is the main page, please type /notes to see all notes, or type /index to see all the notes and settings")
});

app.use(notesRoutes);
app.use(settingsRoutes);
app.use(labelsRoutes);
app.use(notesLabelsRoutes);
app.use(searchNotes);

// ================================================================
app.get("*",(req, res)=>{
    res.send("THIS PAGE OR ROUTE DOESN'T EXIST!");
});


// ================================================================
app.listen(process.env.PORT, ()=>{
    console.log("Server has started on port", process.env.PORT);
});