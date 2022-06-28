import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function EditRecipe() {

    const ingredients = useSelector(store => store.ingredient)
    const store = useSelector(store => store.recipe);
    const dispatch = useDispatch();

    let params = useParams();
    console.log(params)
    let recipeId = params.recipeId
    let recipe = store.find(recipe => recipe.id === Number(recipeId));
    console.log('Viewing this ', recipe);

    const [isEditable, setIsEditable] = useState(false);
    const [recipeName, setRecipeName] = useState(recipe.name);
    const [imageUrl, setImageUrl] = useState(recipe.image_url);
    const [recipeDescription, setRecipeDescription] = useState(recipe.description);
    const [recipeInsructions, setRecipeInstructions] = useState(recipe.instructions);
    let ingredients_id = recipe.recipe_ingredients.find(ingredients_id => ingredients_id === Number(recipe.recipe_ingredients.id))
    const [recipeIngredientId, setRecipeIngredientId] = useState(ingredients_id);
    const [recipeAmount, setRecipeAmount] = useState(ingredients.recipe_amount);
    const [displayAmount, setDisplayAmount] = useState(ingredients.display_amount);






    // const submitHandler = () => {
    //     dispatch({
    //         type:
    //             payload,
    //     })
    // }

    const ingredientHandler = () => {
        dispatch({
            type: 'SET_RECIPEINGREDIENTS',
            payload: {
                ingredientName: ingredients.find(ing => Number(ing.id) === Number(recipeIngredientId)),
                ingredients_id: recipeIngredientId,
                recipe_amount: recipeAmount,
                display_amount: displayAmount
            }
        })
    }





    const editForms = () => {

        setIsEditable(true)
    }

    const saveForms = () => {
        dispatch({
            type:'',
            payload
        })
        setIsEditable(false)
    }






    return (
        <>
            <h1>Hi</h1>

            {isEditable ?
                <div>
                    <form onSubmit={ingredientHandler}>
                        Ingredient: <select
                            // multiple
                            value={recipeIngredientId}
                            onChange={(e) => setRecipeIngredientId(e.target.value)}
                        >
                            {ingredients.map(ingredient => (
                                <option value={ingredient.id}>{ingredient.name}</option>
                            ))}
                        </select>
                        <br />
                        Amount per grams: <input placeholder='Recipe Amount' value={recipeAmount} onChange={(e) => setRecipeAmount(e.target.value)} />
                        Amount per cooking: <input placeholder='Recipe Amount' value={displayAmount} onChange={(e) => setDisplayAmount(e.target.value)} />
                        <button type='submit'>Add</button>
                    </form>
                    
                </div>
                : ''}
            {isEditable ?
                <button onClick={saveForms}>Save Recipe</button> :
                <button onClick={editForms}>Edit recipe</button>

            }

        </>
    )
}


export default EditRecipe;