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
      res.send(result.rows)
    })
    .catch(err => {
      console.log('active gig rep GET', err);
      res.sendStatus(500);
    })
})

router.post('/', (req, res) => {
  const gig = req.body;
  console.log('gig to POST:', gig);
  const createGigQuery = `
    INSERT INTO gigs ("user_id", "date", "ensemble", "show", "fee", "venue", "notes", "city")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING "id";`;
  const queryValues = [req.user.id, gig.date, gig.ensemble, gig.show, gig.fee, gig.venue, gig.notes, gig.city]

  pool
    .query(createGigQuery, queryValues)
    .then(result => {
      const createdGigId = result.rows[0].id;
      const repAddPkg = {
        newGigId: createdGigId,
        newGigRep: req.body.repList
      }
      // console.log('new gig:', createdGigId);
      // console.log('new gig rep:', repAddPkg.newGigRep);
      res.send(repAddPkg);
      // res.sendStatus(201);
    })
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
    
router.post('/newrep', (req, res) => {
  console.log('new rep req.body:', req.body)
  const id = req.body.newGigId;
  const rep = req.body.newGigRep;
  console.log('id:', id, 'rep:', rep) // rep logs as an array of numbers. see below
  // const valueBodyA = 
  //   rep.map(entry =>
  //     ` ('`+id+`', '`+entry+`')`
  //   )
  // const valueBodyB = valueBodyA.toString();
  // const queryValueBody = valueBodyB.replace(/["]+/g, '')
  //   console.log('queryValueBody:', queryValueBody)
  const addGigRepQuery = `
        INSERT INTO "rep_by_gig" ("gig_id", "rep_id")
        VALUES ($1, unnest(array[${rep}]));`;
        // VALUES ($1, unnest(array[$2])::int);`;            gig rep POST error: invalid input syntax for type integer: "{"11","8","7"}"
        // VALUES ($1, unnest(array[$2])::int[]);            gig rep POST error: column "rep_id" is of type integer but expression is of type integer[]
        // VALUES ($1, unnest(array[$2]))::int[];            gig rep POST error: syntax error at or near "::"
        // VALUES ($1, unnest(array[$2]))::INTEGER;          gig rep POST error: syntax error at or near "::"
        // VALUES ($1, unnest(array[$2]));                   gig rep POST error: column "rep_id" is of type integer but expression is of type text
        // VALUES ($1, unnest(ARRAY [$2]));                  gig rep POST error: column "rep_id" is of type integer but expression is of type text
        // VALUES ($1, unnest(array[CAST $2 AS INTEGER]));   gig rep POST error: syntax error at or near "$2"
        // VALUES ($1, unnest(array[$2]::INTEGER));          gig rep POST error: cannot cast type text[] to integer
        // VALUES ($1, unnest([$2]::INTEGER));               gig rep POST error: syntax error at or near "["
        // VALUES ($1, unnest(ARRAY $2::INTEGER));           gig rep POST error: syntax error at or near "$2"
    console.log('addGigRepQuery:', addGigRepQuery);
    pool.query(addGigRepQuery, [id, rep])
    .then(result => { res.sendStatus(201) })
    .catch(err => { console.log('gig rep POST', err); res.sendStatus(500) })
})


module.exports = router;
