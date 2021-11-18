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


// PUT


// DELETE

module.exports = koalaRouter;