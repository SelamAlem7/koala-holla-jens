const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION

const pg = require('pg');
const Pool = pg.Pool;
const config = {
  host: 'Localhost', // Location of our database.
  database: 'koalas'  // Name of our database.
};

const pool = new Pool(config);

pool.on('connect', () => {
    console.log('server-database connection happened.');
});

pool.on('error', (poolError) => {
    console.error(poolError);
});

module.exports = pool;

// GET


// POST


// PUT


// DELETE

module.exports = koalaRouter;