const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => { // Fetch all composers from database
  const query = `
    SELECT * FROM "composers"
    ORDER BY yob`

  pool
    .query(query)
    .then(result => { res.send(result.rows) })
    .catch(err => { console.log(err); res.sendStatus(500) })
});

router.post('/', rejectUnauthenticated, (req, res) => { // Add a new composer to the database
  const query = `
    INSERT INTO "composers" ("firstname", "lastname", "period", "nationality", "school", "yob", "yod")
    VALUES ($1, $2, $3, $4, $5, $6, $7);`;
  const queryValues = [req.body.firstname, req.body.lastname, req.body.period, req.body.nationality, req.body.school, req.body.yob, req.body.yod]

  pool
    .query(query, queryValues)
    .then(result => { res.sendStatus(201) })
    .catch(err => { console.log(err); res.sendStatus(500) })
})

router.put('/', rejectUnauthenticated, (req, res) => {
  const updatedEntry = req.body;

  const query = `
    UPDATE "composers"
    SET "firstname" = $1,
    "lastname" = $2,
    "period" = $3,
    "nationality" = $4, 
    "school" = $5,
    "yob" = $6,
    "yod" = $7
    WHERE id = $8;`;
  const queryValues = [
    updatedEntry.firstname,
    updatedEntry.lastname,
    updatedEntry.period,
    updatedEntry.nationality,
    updatedEntry.school,
    updatedEntry.yob,
    updatedEntry.yod,
    updatedEntry.id
  ]

  pool
    .query(query, queryValues)
    .then(() => { res.sendStatus(200) })
    .catch(err => {console.log('composer PUT', err); res.sendStatus(500)})
})

module.exports = router;
