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
      res.sendStatus(500)
    })
});

router.post('/', (req, res) => {
  console.log('req.body replist:', req.body.repList)
  const gig = req.body;
  const query = `
    INSERT INTO gigs ("user_id", "date", "ensemble", "show", "fee", "venue", "notes", "city", "replist")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
    const queryValues = [req.user.id, gig.date, gig.ensemble, gig.show, gig.fee, gig.venue, gig.notes, gig.city, gig.repList]

    pool
      .query(query, queryValues)
      .then(result => { res.sendStatus(201) })
      .catch(err => { console.log('gig POST', err); res.sendStatus(500)})
})


module.exports = router;
