const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION
const pg = require('pg');

const Pool = pg.Pool;

const pool = new Pool({
    database: 'koalaholla',
    host: 'localhost'
});

// GET
koalaRouter.get('/', (req, res) => {
    const sqlText = 'SELECT * FROM koalas;'
    pool.query(sqlText)
      .then((dbRes) => {
        const koalasFromDb = dbRes.rows;
        res.send(koalasFromDb)
      }).catch((dbErr) => {
        console.error(dbErr);
      });
  });


// POST
koalaRouter.post('/', (req, res) => {
  console.log('POST /koalas');
  console.log('req.body:', req.body);
  const newKoala = req.body;
  const sqlText = `
    INSERT INTO "koalas"
      ("name", "age", "gender", "ready_to_transfer", "notes")
    VALUES
      ($1, $2, $3, $4, $5);
  `;
  const sqlValues = [
      newKoala.name,
      newKoala.age,
      newKoala.gender,
      newKoala.ready_to_transfer,
      newKoala.notes,
  ];
  pool.query(sqlText, sqlValues)
    .then((dbResult) => {
      console.log('\tINSERT succeeded.');
      res.sendStatus(201);
    })
    .catch((dbErr) => {
      console.error(dbErr);
      res.sendStatus(500);
    });
});
// PUT


// DELETE

module.exports = koalaRouter;