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
    SELECT * FROM gigs
    ORDER BY date`
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    }).catch(err => {
      console.log(err)
    })
})


module.exports = router;
