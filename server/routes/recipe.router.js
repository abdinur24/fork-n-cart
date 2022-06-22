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
    pool.query(`SELECT * FROM "recipe";`)
        .then(results => {
            res.send(results.rows)
        }).catch(error => {
            console.log('ERROR making SELECT for recipes', error);
            res.sendStatus(500);
        })

});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    // POST route code here
    console.log('req.user:', req.user);
    const query = `INSERT INTO "recipe"("name","instructions", "user_id", "image_url")
                    VALUES($1, $2, $3, $4);`
    pool.query(query, [req.body.name, req.body.instructions, req.user.id, req.body.image_url])
        .then(response =>{
            console.log('ADDING NEW recipe for user',req.user.username)
            res.sendStatus(201);
        }).catch(error =>{
            console.log('ERROR INSERTING NEW RECIPE', error);
            res.sendStatus(500);
        })
});

module.exports = router;