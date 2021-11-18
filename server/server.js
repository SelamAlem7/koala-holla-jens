const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const koalaRouter = require('./routes/koala.router')
const pg = require('pg');

const Pool = pg.Pool;

const pool = new Pool({
    database: 'koalaholla',
    host: 'localhost'
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// ROUTES
app.use('/koalas', koalaRouter)

pool.on('connect', () =>    {
  console.log('PG connected.');
});

pool.on('error', (error =>  {
  console.log('ruh roh', error);
}));



// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
