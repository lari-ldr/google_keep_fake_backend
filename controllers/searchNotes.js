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
    searchNotes(req,res){
        search_query = String(req.query.search_query)
        pool.query(`SELECT * FROM notes WHERE search_vector @@ to_tsquery($1)`,
        [search_query], (err, results)=>{
            if(err){
                console.log(err)
                return err;
            }
            res.send(results.rows);
        })
    }
}