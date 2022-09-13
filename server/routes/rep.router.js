const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
  const query = `
    SELECT "repertoire".*, "composers".lastname, "composers".firstname FROM repertoire
    JOIN "composers"
    ON "repertoire".composer_id = "composers".id
    ORDER BY "composers".lastname`
  pool.query(query)
    .then(result => {
      // console.log('get all rep', result.rows)
      res.send(result.rows);
    }).catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});

router.get('/fordash', (req, res) => {
  const query = `
    SELECT "repertoire".*, "composers".lastname, "composers".firstname FROM repertoire
    JOIN "composers"
    ON "repertoire".composer_id = "composers".id
    ORDER BY "timestamp" DESC`
  pool.query(query)
    .then(result => {
      // console.log('get all rep', result.rows)
      res.send(result.rows);
    }).catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});

router.post('/', rejectUnauthenticated, (req, res) => { // Add a new piece to the database
  const query = `
    INSERT INTO "repertoire" ("user_id", "title", "composer_id", "collection", "scorelink", "reclink", "category", "timestamp")
    VALUES ($1, $2, $3, $4, $5, $6, $7, current_timestamp);`;
  const queryValues = [req.user.id, req.body.title, req.body.composer_id, req.body.collection, req.body.scorelink, req.body.reclink, req.body.category]

  pool
    .query(query, queryValues)
    .then(result => { res.sendStatus(201) })
    .catch(err => { console.log(err); res.sendStatus(500) })
})

module.exports = router;
