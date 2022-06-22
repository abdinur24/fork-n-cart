const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');



/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    // GET route code here
    console.log('req.user:', req.user);
    pool.query(`SELECT * FROM "ingredients";`)
        .then(results => {
            res.send(results.rows)
            console.log('GET INGREDIENTS', results.rows);
        }).catch(error => {
            console.log('ERROR making SELECT for ingredients', error);
            res.sendStatus(500);
        })
});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    // POST route code here
    console.log('req.user:', req.user);
    const query = `INSERT INTO "ingredients"("name","price","amount")
                    VALUES($1, $2, $3);`
    pool.query(query, [req.body.name, req.body.price, req.body.amount])
        .then(response => {
            console.log('ADDING NEW ingredients', req.body.name, req.body.price, req.body.amount)
            res.sendStatus(201);
        }).catch(error => {
            console.log('ERROR INSERTING NEW ingredients', error);
            res.sendStatus(500);
        })
});

module.exports = router;