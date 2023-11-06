const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
    console.log('GET /thing request received!');

    const queryText = `SELECT * FROM "thing"`;

    pool
        .query(queryText)
        .then((dbResponse) => res.send(dbResponse.rows))
        .catch((dbErr) => {
            console.log('Patient save failed: ', dbErr);
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    console.log('POST /thing request received');

    let reqBody = req.body;

    const thingDescription = reqBody.thingDescription;

    const queryText = `INSERT INTO "thing" (thing_description)
    VALUES ($1) RETURNING uuid`;

    pool
        .query(queryText, [thingDescription])
        .then((dbResponse) => res.status(201).send({ dbResponse: dbResponse.rows[0] }))
        .catch((dbErr) => {
            console.log('Thing save failed: ', dbErr);
            res.sendStatus(500);
        });
})

module.exports = router;
