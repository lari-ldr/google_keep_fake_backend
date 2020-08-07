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


app.get("/", (req, res)=>{
    res.send("this is the main page. To see all the advisors type /index in the url")
})

app.get("/index", (req, res)=>{
    pool.query(
        `SELECT * FROM notes`, (err, results)=>{
            if(err){
                console.log(err);
                return err;
            }
            res.send(results.rows)
        }
    )
})

app.get("/index/:id", (req, res)=>{
    const note_id = parseInt(req.params.id)
    pool.query(`SELECT * FROM notes WHERE id = ${note_id}`, (err, results)=>{
        if(err){
            console.log(err);
            return err;
        }
        res.send(results.rows)
    })
})

app.post("/index/:id", (req, res)=>{
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
})

app.put("/index/:id", (req, res) =>{
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
})

app.delete("/index/:id", (req, res)=>{
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
})

app.get("*", (req, res)=>{
    res.send("THIS PAGE DOESN'T EXIST!");
});

// ===========================================================
// var send = document.getElementsByClassName('_35EW6')[0];
// var message = document.getElementsByClassName("_2WovP")[0];
// var message = document.getElementsByClassName("_2S1VP")[1];


// let open = window.open('https://www.google.com', 'Google')

// function open(){
//     let open = window.open('https://www.google.com', 'Google')
// }

// const geckodriver = require('geckodriver');
// const firefox = require('selenium-webdriver/firefox');
// const options = new firefox.Options();
// // options.setBinary("/path/to/geckodriver");
// options.setBinary('geckodriver');
// // options.setBinary("C:/Users/LDR/Documents/DEV/whatsapp_bot/backend/node_modules/selenium-webdriver/bin")

// const {Builder, By, Key, until} = require('selenium-webdriver');
// // abrir o whats app - feito;
// // selecionar o grupo certo; <span dir="auto" title="TESTE" class="_1wjpf _3NFp9 _3FXB1">TESTE</span>
// // clickar no grupo;
// // selecionar o input de enviar mensagem; <div tabindex="-1" class="_3F6QL _2WovP"><div class="_39LWd" style="visibility: visible">Digite uma mensagem</div><div class="_2S1VP copyable-text selectable-text" data-tab="1" dir="ltr" spellcheck="true" contenteditable="true"></div></div>
// // escrever a mensagem;
// // selecionar o input/button de enviar; <button class="_35EW6"><span data-icon="send" class=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path></svg></span></button>
// // clickar em enviar;
// // repetir o procedimento a cada 1 minuto;
// // fechar e paralisar a operação - feito
// (async function whatsTeste() {
//     let driver = await new Builder().forBrowser('firefox').build();
    
//     try{

//         await driver.get('https://web.whatsapp.com/');

//         let qrcode = await driver.wait(until.elementLocated(By.className('_1g81C')), 180000);

//         let clickrightgroup = await driver.wait(until.elementLocated(By.xpath("//span[@title='TESTE']")), 180000);
//         await driver.findElement(By.xpath("//span[@title='TESTE']")).click();
//         let divOne = await driver.findElement(By.xpath("//div [@tabindex='-1'][@class='_1Plpp']"));
//         let divTwo = await divOne.findElement(By.xpath("//div [@tabindex='-1'][@class='_3F6QL _2WovP']"));
//         let divThree = await divTwo.findElement(By.xpath("//div[@class='_39LWd']"));
//         let divFour = await divThree.findElement(By.xpath("//div[@class='_2S1VP copyable-text selectable-text']")).sendKeys('cheese', Key.ENTER);
//         // .then(
//             // await driver.wait(until.elementLocated(By.css('_2S1VP[2]')), 60000),
//             // await driver.findElement(By.css('_2S1VP[2]')).sendKeys('cheese')
//             // await driver.wait(until.elementLocated(By.xpath("//div[@class='_2S1VP copyable-text selectable-text'][2]")), 60000),
//             // await driver.findElement(By.xpath("//div[@class='_2S1VP copyable-text selectable-text'][2]")).sendKeys('cheese')
//         // )

// // _2WovP unico pra mandar mensagem
// // _39LWd
//         // let waitfindtheboxmessage = await driver.wait(until.elementLocated(By.xpath("//div[@class='_2S1VP copyable-text selectable-text']")), 180000);
//         // await driver.findElement(By.xpath("//div[@class='_2S1VP copyable-text selectable-text']")).sendKeys('cheese');
        


// //<div tabindex="-1" class="_1Plpp"><div tabindex="-1" class="_3F6QL _2WovP"><div class="_39LWd" style="visibility: visible;">Digite uma mensagem</div><div class="_2S1VP copyable-text selectable-text" data-tab="1" dir="ltr" spellcheck="true" contenteditable="true"></div></div></div>
// // <span data-icon="send" class="">
// // var message = document.getElementsByClassName("_2WovP")[0];
// // var send = document.getElementsByClassName('_35EW6')[0];


// // 3 minutos igual a 180000 milissegundos
//     }
//     finally{
//         // await driver.close();
//         await driver.quit();
//         console.log('made it');
//     }
// })();

// (async function example() {
    // let driver = await new Builder().forBrowser('firefox').build();
//     try {
//         // Navigate to Url
        // await driver.get('https://www.google.com');

//         // Enter text "cheese" and perform keyboard action "Enter"
//         await driver.findElement(By.name('q')).sendKeys('cheese', Key.ENTER);

//         let firstResult = await driver.wait(until.elementLocated(By.css('h3>div')), 10000);

//         console.log(await firstResult.getAttribute('textContent'));
//     }
    // finally{
    //     driver.quit();
    // }
// })();


// ================================================================
app.listen(process.env.PORT, ()=>{
    console.log("Server has started on port", process.env.PORT);
});