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
    const query=(`SELECT * FROM "recipe" WHERE user_id=$1`)
    pool.query(query,[req.user.id])
        .then(results => {
            console.log('GET RECIPES', results.rows)
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
    const query = `INSERT INTO "recipe"("name","description", "instructions", "user_id", "image_url")
                    VALUES($1, $2, $3, $4, $5) RETURNING "id";`
    pool.query(query, [req.body.name, req.body.description, req.body.instructions, req.user.id, req.body.image_url])
        .then(result =>{
            console.log('ADDING NEW recipe for user',req.user.username);
            console.log('NEW RECIPE ID IS', result.rows[0].id);
            const createdRecipeId = result.rows[0].id;
            const recipeIngredientsQuery = `
            INSERT INTO "recipe_ingredients"("recipe_id", "ingredients_id", "recipe_amount", "display_amount")
            VALUES($1,$2,$3,$4,$5);`
            pool.query(recipeIngredientsQuery,[createdRecipeId, req.body.recipe_amount, req.body.display_amount])
                .then(result =>{      
                    res.sendStatus(201);
                }).catch(err =>{
                    console.log('ERROR ADDING RECIPE INGREDIENTS', err);
                    res.sendStatus(500);
                })
        }).catch(error =>{
            console.log('ERROR INSERTING NEW RECIPE', error);
            res.sendStatus(500);
        })
});


router.delete('/:id', rejectUnauthenticated, (req, res) => {
    console.log('user id=',req.user.id, 'recipe id=',req.params.id);
    const query = `DELETE FROM "recipe" WHERE id=$1 AND user_id=$2;`
    console.log('req.params.id and userid =', req.params.id, req.user.id);
    pool.query(query,[req.params.id,req.user.id])
      .then(response =>{
        res.sendStatus(200);
      }).catch(err =>{
        console.log('ERROR in DELETE', err);
        res.sendStatus(500);
      })
  });


// recipe_ingredients routers
//   router.post('/ingredients', rejectUnauthenticated, (req,res) =>{
//     const query = `INSERT INTO "recipe_ingredients"("recipe_id", "ingredients_id","recipe_amount", "display_amount")
//                     VALUES($1,$2,$3,) `
//   })
module.exports = router;