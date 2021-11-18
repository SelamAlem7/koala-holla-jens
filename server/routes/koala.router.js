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
  const newKoala
})

// PUT


// DELETE

module.exports = koalaRouter;