const express = require('express'),
  dotenv = require('dotenv'),
  Pool = require('pg').Pool;

dotenv.config();
const pool = new Pool({
  user: 'google_keep_fake',
  host: 'localhost',
  database: 'google_keep_fake',
  password: process.env.PSQL_PASSWORD,
  port: 5432,
});

module.exports = {
  getAllRelationshipsBetweenNotesAndLabels(req, res) {
    pool.query(`SELECT * FROM notes_labels`, (err, labelResults) => {
      if (err) {
        console.log(err);
        return err;
      }
      res.send(labelResults.rows);
    });
  },
  // select a specific relationship always based on note_id
  getOneRelationshipBetweenNotesAndLabels(req, res) {
    const id = parseInt(req.params.id);
    pool.query(
      // `SELECT * FROM notes_labels WHERE label_id = ${id} OR note_id = ${id}`
      `SELECT * FROM notes_labels WHERE note_id = ${id}`,
      (err, labelResults) => {
        if (err) {
          console.log(err);
          return err;
        }
        res.send(labelResults.rows);
      }
    );
  },
};
