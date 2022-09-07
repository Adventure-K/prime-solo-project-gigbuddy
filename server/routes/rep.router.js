const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/', (req, res) => {
  const query = `
    SELECT "repertoire".*, "composers".lastname, "composers".firstname FROM repertoire
    JOIN "composers"
    ON "repertoire".composer_id = "composers".id
    ORDER BY "composers".lastname`
  pool.query(query)
    .then(result => {
      console.log('get all rep', result.rows)
      res.send(result.rows);
    }).catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});

module.exports = router;
