const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION


// GET
router.get('/', (req, res) => {
    console.log('GET /koalas');
    const sqlText = 'SELECT * FROM /koalas;';
    pool.query(sqlText)
      .then((dbResult) => {
        console.log(`${dbResult.rows.length} rows to send.`)
        res.send(dbResult.rows);
      })
      .catch((dbErr) => {
        console.error(dbErr);
        res.sendStatus(500);
      });
  });

  //2nd GET:
  router.get('/:id', (req, res) => {
    console.log('GET /koalas/:id')
    console.log('req.params:', req.params);
    const songId = req.params.id;
    console.log('koalaId:', koalaId);

    const sqlText = `
      SELECT * FROM "koalas"
        WHERE "id"=$1;
    `;
    const sqlValues = [ koalaId ];
    pool.query(sqlText, sqlValues)
      .then((dbResult) => {
        // Note that dbResult.rows is an ARRAY with
        // a single OBJECT inside of it:
        console.log('dbResult.rows:', dbResult.rows);
        res.send(dbResult.rows);
      })
      .catch((dbErr) => {
        console.error(dbErr);
        res.sendStatus(500);
      });
    
  })
  


// POST
router.post('/', (req, res) => {
    console.log('POST /koalas');
    console.log('req.body:', req.body);
    const newKoala = req.body;
    const sqlText = `
      INSERT INTO "songs"
        ("name", "gender", "age", "ready_to_transfer", "notes")
      VALUES
        ($1, $2, $3, $4);
    `;
    const sqlValues = [
        newKoala.name,
        newKoala.gender,
        newKoala.age,
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