const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/', (req, res) => { // GET for Gig view
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

router.get('/:id', (req, res) => { // GET for active Gig's rep
  const gigId = req.params.id
  console.log('active gig rep GET');
  const query = `
  SELECT "firstname", "lastname", "title" FROM "repertoire"
  JOIN "composers"
  ON "repertoire".composer_id = "composers".id
  JOIN "rep_by_gig"
  ON "repertoire".id = "rep_by_gig".rep_id
  JOIN "gigs"
  ON "rep_by_gig".gig_id = "gigs".id
  WHERE "gigs".id = $1`
  pool
    .query(query, [gigId])
    .then(result => { 
      console.log('active gig rep', result.rows);
      res.send(result.rows) })
    .catch(err => {
      console.log('active gig rep GET', err);
      res.sendStatus(500);
    })
})

router.post('/', (req, res) => {
  console.log('req.body replist:', req.body.repList)
  const gig = req.body;
  const query = `
    INSERT INTO gigs ("user_id", "date", "ensemble", "show", "fee", "venue", "notes", "city")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
  const queryValues = [req.user.id, gig.date, gig.ensemble, gig.show, gig.fee, gig.venue, gig.notes, gig.city]

  pool
    .query(query, queryValues)
    .then(result => { res.sendStatus(201) })
    .catch(err => { console.log('gig POST', err); res.sendStatus(500) })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  console.log('DELETE GIG #', id)
  const query1 = `
    DELETE FROM "rep_by_gig"
    WHERE "gig_id" = $1;`
  pool
    .query(query1, [id])
    .then(res.sendStatus(200))

    const query2 = `
      DELETE FROM "gigs"
      WHERE "id" = $1;`;
    pool
      .query(query2, [id])
      .then(res.sendStatus(200))
      .catch(err => {console.log('gig DELETE from junction table', err); res.sendStatus(500)})
    .catch(err => {console.log('gig DELETE from gigs table', err); res.sendStatus(500)});
})


module.exports = router;
