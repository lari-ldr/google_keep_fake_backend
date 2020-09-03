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
  getAllLabels(req, res) {
    pool.query(`SELECT * FROM labels`, (err, results) => {
      if (err) {
        console.log(err);
        return err;
      }
      res.send(results.rows);
    });
  },

  getANewLabel(req, res) {
    const id = parseInt(req.params.id);
    pool.query(`SELECT * FROM labels WHERE id = ${id}`, (err, labelResults) => {
      if (err) {
        console.log(err);
        return err;
      }
      res.send(labelResults.rows);
    });
  },

  postANewLabel(req, res) {
    const { id, labels } = req.body;
    console.log(req.body);
    pool.query(
      `INSERT INTO labels (id, labels) VALUES ($1, $2)`,
      [id, labels],
      (err, labelResults) => {
        if (err) {
          console.log(err);
          return err;
        }
        console.log('new label successfully added! ');
        res.send(labelResults);
      }
    );
  },

  putALabel(req, res) {
    const id = parseInt(req.params.id);
    const { labels } = req.body;
    console.log(req.body);
    pool.query(
      `UPDATE labels SET labels = $1 WHERE id = ${id}`,
      [labels],
      (err, labelResults) => {
        if (err) {
          console.log(err);
          return err;
        }
        console.log(`label successfully updated, LABEL_ID is: ${id}`);
        res.send(labelResults.rows);
      }
    );
  },

  deleteALabel(req, res) {
    const id = parseInt(req.params.id);
    pool.query(`DELETE FROM labels WHERE id = ${id}`, (err, labelResults) => {
      if (err) {
        console.log(err);
        return err;
      }
      console.log('label successfully removed!');
      res.send(labelResults.rows);
    });
  },

  allNotesOfASpeficiLabel(req, res) {
    const id = parseInt(req.params.id);
    pool.query(
      // `SELECT labels.id, labels.labels, notes.id, notes.title,notes.content, notes_labels.label_id, notes_labels.note_id FROM labels INNER JOIN notes_labels ON labels.id = notes_labels.label_id INNER JOIN notes ON notes.id = notes_labels.note_id WHERE labels.id = 2`
      `SELECT labels.id, labels.labels, notes.id, notes.title,notes.content, notes_labels.label_id, notes_labels.note_id, notesconfigs.note_id, notesconfigs.background_color, notesconfigs.is_archived, notesconfigs.is_pinned FROM labels INNER JOIN notes_labels ON labels.id = notes_labels.label_id INNER JOIN notes ON notes.id = notes_labels.note_id INNER JOIN notesconfigs ON notes.id = notesconfigs.note_id WHERE labels.id = ${id};`,
      (err, results) => {
        if (err) {
          console.log(err);
          return err;
        }
        res.send(results.rows);
      }
    );
  },
};
