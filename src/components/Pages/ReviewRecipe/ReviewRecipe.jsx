import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
function ReviewRecipe() {
    const recipe = useSelector(store => store.recipe)

    const ingredients = useSelector(store => store.ingredient);

    const recipe_ingredients = useSelector(store => store.recipe_ingredients);

    console.log('This is new recipe', recipe)
    const dispatch = useDispatch();
    const history = useHistory();
    const addHandler = () => {
        dispatch({
            type: 'ADD_RECIPE',
            payload: recipe
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
                {console.log('This is new recipe', recipe)}
                <h1>Name: {recipe.name}</h1>
                <p>Instructions: {recipe.instructions}</p>
                <h4>Description: {recipe.description}</h4>
                {recipe_ingredients.map(r_ingredients => {
                    console.log('this is new added ingredient', recipe_ingredients);
                    return (
                        <div>
                            <p>Ingredients</p>
                            <p>{r_ingredients.ingredientName}</p>
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