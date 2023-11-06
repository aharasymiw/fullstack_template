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
            console.log('GET /thing failed: ', dbErr);
            res.sendStatus(500);
        });
});

router.get('/search', (req, res) => {
    console.log('GET /thing?id= request received!');

    let thingId = req.query.thingId;
    let thingStatus = req.query.thingStatus;

    console.log('thingId:', thingId);
    console.log('thingStatus:', thingStatus);

    const queryText = `
        SELECT
            *
        FROM
            "thing"
        WHERE
            uuid=$1
        AND
            thing_status=$2
        `;

    pool
        .query(queryText, [thingId, thingStatus])
        .then((dbResponse) => res.send(dbResponse.rows))
        .catch((dbErr) => {
            console.log('GET /thing/search with query failed: ', dbErr);
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    console.log('POST /thing request received');

    let reqBody = req.body;

    const thingDescription = reqBody.thingDescription;

    const queryText = `
        INSERT INTO "thing"
            (thing_description)
        VALUES
            ($1)
        RETURNING
            uuid
        `;

    pool
        .query(queryText, [thingDescription])
        .then((dbResponse) => res.status(201).send({ dbResponse: dbResponse.rows[0] }))
        .catch((dbErr) => {
            console.log('POST /thing failed: ', dbErr);
            res.sendStatus(500);
        });
})

router.delete('/:id', (req, res) => {
    let reqId = req.params.id;
    console.log('Delete request for id', reqId);

    let sqlText = `
        DELETE FROM "thing"
        WHERE
            uuid=$1
        RETURNING
            uuid;
    `;

    pool.query(sqlText, [reqId])
        .then((dbResponse) => res.status(200).send({ dbResponse: dbResponse.rows[0] }))
        .catch((dbErr) => {
            console.log(`DELETE /thing failed.\nquery: \n${sqlText}\nfor id:\n${reqId}`, dbErr);
            res.sendStatus(500);
        })
})

router.put('/:id', (req, res) => {
    let reqId = req.params.id;
    console.log('Put request for id', reqId);

    let sqlText = `
        UPDATE "thing"
        SET
            thing_status = NOT thing_status
        WHERE
            uuid=$1
        RETURNING
            uuid, thing_status;
    `;

    pool.query(sqlText, [reqId])
        .then((dbResponse) => res.status(200).send({ dbResponse: dbResponse.rows[0] }))
        .catch((dbErr) => {
            console.log(`PUT /thing failed.\nquery: \n${sqlText}\nfor id:\n${reqId}`, dbErr);
            res.sendStatus(500);
        })
})

module.exports = router;
