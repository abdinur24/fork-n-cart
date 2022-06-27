import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
function ReviewRecipe() {

    const newRecipe = useSelector(store => store.newRecipeReducer);
    console.log('This is newRecipeReducer',newRecipe)

    const ingredients = useSelector(store => store.ingredient);
    const recipe_ingredients = useSelector(store => store.recipe_ingredients);

    const dispatch = useDispatch();
    const history = useHistory();
    const addHandler = () => {
        dispatch({
            type: 'ADD_RECIPE',
            payload: newRecipe
        })
        dispatch({
            type: 'CLEAR_RECIPEINGREIDNTS'
        })
        setTimeout(() => history.push('/recipelist'), 1000)
    }
    return (
        <div>
            <h1>Your New Recipe</h1>
            {/* {store.map(recipe => {
                return ( */}
            <div>
                <h1>Name: {newRecipe.name}</h1>
                <p>Instructions: {newRecipe.instructions}</p>
                <h4>Description: {newRecipe.description}</h4>
                <h4>Ingredients:</h4>
                {recipe_ingredients.map(r_ingredients => {
                    console.log('this is new added ingredient', recipe_ingredients);
                    {if(r_ingredients.recipeIngredientId){
                    }}
                    return (
                        <div>
                            <p>{r_ingredients.ingredientName}: {r_ingredients.display_amount}</p>
                            
                        </div>
                    )
                })}
                {/* {recipe.recipe_ingredients.map(recipe_ingredients => {
                            console.log('This is recipe ingredients', recipe_ingredients)
                            let item = ingredients.find(item => item.id === Number(recipe_ingredients.ingredients_id))
                            console.log(item);
                            return(
                                <p>{item.name}</p>
                            )
                            // ingredients.map(item => {
                            //     if (item.id === recipe_ingredients.ingredients_id) {
                            //         return (
                            //             <p>{item.name}</p>
                            //         )
                            //     }
                            // })

                        })} */}
            </div>
            {/* )
            })}  */}
            <button onClick={() => addHandler()}>Add</button>

        </div>
    )
}

export default ReviewRecipe;