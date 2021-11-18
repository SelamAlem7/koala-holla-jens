const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION

const pool = require('../modules/pool.js');

// GET
koalaRouter.get('/', (req, res) => {
  console.log('GET /koalas');
  const text = 'SELECT * FROM koalas;';
  pool.query(text)
    .then((dbResult) => {
      // console.log(`${dbResult.rows.length} rows to send.`)
      res.send(dbResult.rows);
    })
    .catch((dbErr) => {
      console.error(dbErr);
      res.sendStatus(500);
    });
});

// POST
koalaRouter.post('/', (req, res) => {
  let newKoala = req.body;
  // console.log('Adding koala', newKoala);

  let queryText = `INSERT INTO "koalas" ("name", "age", "gender", "ready_to_transfer", "notes")
                      VALUES ($1, $2, $3, $4, $5);`;
  let queryValues = [
    newKoala.name,
    newKoala.age,
    newKoala.gender,
    newKoala.readyForTransfer,
    newKoala.notes
  ];
  pool.query(queryText, queryValues)
    .then(result => {
      res.sendStatus(201);
    })
    .catch(error => {
      // console.log(error);
      res.sendStatus(500);
    })
});

// PUT


// DELETE

module.exports = koalaRouter;