const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/', (req, res) => { // GET for Gig view and dash
  const query = `
    SELECT * FROM gigs
    WHERE "user_id" = $1
    ORDER BY date`
  pool.query(query, [req.user.id])
    .then(result => {
      res.send(result.rows);
    }).catch(err => {
      console.log(err)
      res.sendStatus(500)
    })
});

router.get('/:id', rejectUnauthenticated, (req, res) => { // GET for active Gig's rep
  const gigId = req.params.id
  console.log('active gig rep GET');
  const query = `
    SELECT "repertoire".id, "firstname", "lastname", "title" FROM "repertoire"
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

router.post('/', rejectUnauthenticated, (req, res) => {
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

router.delete('/:id', rejectUnauthenticated, (req, res) => {
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
    .catch(err => { console.log('gig DELETE from junction table', err); res.sendStatus(500) })
    .catch(err => { console.log('gig DELETE from gigs table', err); res.sendStatus(500) });
});

router.post('/updaterep', rejectUnauthenticated, async (req, res) => {
  console.log('in updaterep, req.body:', req.body)
  const id = req.body.id;
  const rep = req.body.newRep;
  console.log('UPDATE: delete old rep for gig #', id)
  const connection = await pool.connect();

  try {
    await connection.query('BEGIN');
    const delQuery = `
      DELETE FROM "rep_by_gig"
      WHERE "gig_id" = $1;`;
    await connection.query(delQuery, [id])
    rep.map(piece => {
      const postQuery = `
        INSERT INTO "rep_by_gig" ("rep_id", "gig_id")
        VALUES ($1, $2);`;
      connection.query(postQuery, [piece, id]);
    });
    await connection.query('COMMIT');
    res.sendStatus(200);
  } catch (err) {
    await connection.query('ROLLBACK');
    console.log('UPDATE: new rep POST', err)
    res.sendStatus(500);
  } finally {
    connection.release()
  }
})

// router.post('/updaterep', rejectUnauthenticated, async (req, res) => {
//   console.log('updated rep req.body:', req.body)
//   const id = req.body.id;
//   const rep = req.body.newRep;
//   console.log('id:', id, 'rep:', rep)
//   const connection = await pool.connect();

//   try {
//     await connection.query('BEGIN');
//     rep.map(piece => {
//       const query = `
//       INSERT INTO "rep_by_gig" ("rep_id", "gig_id")
//       VALUES ($1, $2);`;
//       connection.query(query, [piece, id]);
//     });
//     await connection.query('COMMIT');
//     res.sendStatus(200);
//   } catch (err) {
//     await connection.query('ROLLBACK');
//     console.log('new gig rep POST', err)
//     res.sendStatus(500);
//   } finally {
//     connection.release()
//   }
// });

router.put('/update', rejectUnauthenticated, (req, res) => {
  const gig = req.body;
  console.log('UPDATE GIG', gig)
  const query = `
    UPDATE "gigs"
    SET "date" = $1,
        "ensemble" = $2,
        "show" = $3,
        "fee" = $4,
        "venue" = $5,
        "notes" = $6,
        "city" = $7
    WHERE "id" = $8;`;
  const values = [gig.date, gig.ensemble, gig.show, gig.fee, gig.venue, gig.notes, gig.city, gig.id];
  pool
    .query(query, values)
    .then(res.sendStatus(200))
    .catch(err => { console.log('gig PUT', err); res.sendStatus(500) });
});

router.post('/newgigrep', rejectUnauthenticated, async (req, res) => {
  console.log('new rep req.body:', req.body)
  const id = req.body.newGigId;
  const rep = req.body.newGigRep;
  console.log('id:', id, 'rep:', rep)

  const connection = await pool.connect();

  try {
    await connection.query('BEGIN');
    rep.map(piece => {
      const query = `
      INSERT INTO "rep_by_gig" ("rep_id", "gig_id")
      VALUES ($1, $2);`;
      connection.query(query, [piece, id]);
    });
    await connection.query('COMMIT');
    res.sendStatus(200);
  } catch (err) {
    await connection.query('ROLLBACK');
    console.log('new gig rep POST', err)
    res.sendStatus(500);
  } finally {
    connection.release()
  }
});

module.exports = router;
