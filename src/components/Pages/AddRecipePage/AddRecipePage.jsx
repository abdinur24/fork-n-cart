import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
function AddRecipePage() {
    const ingredients = useSelector(store => store.ingredient);
    console.log('this is ingredients store', ingredients);

    const recipe_ingredients = useSelector(store => store.recipe_ingredients);
    console.log('this is recipe_ingredients store', recipe_ingredients);

    const [recipeName, setRecipeName] = useState('');
    const [imageUrl, setImageUrl] = useState();
    const [recipeDescription, setRecipeDescription] = useState('');
    const [recipeInsructions, setRecipeInstructions] = useState('');
    const [recipeIngredientId, setRecipeIngredientId] = useState('');
    const [recipeAmount, setRecipeAmount] = useState('');
    const [displayAmount, setDisplayAmount] = useState('');






    const dispatch = useDispatch();
    const submitHandler = () => {
        dispatch({
            type: 'SET_NEWRECIPE',
            payload: {
                name: recipeName,
                description: recipeDescription,
                instructions: recipeInsructions,
                image_url: imageUrl,
                recipe_ingredients
            }
        })
        history.push('/reviewRecipe')
    }

    const ingredientHandler = () => {
        dispatch({
            type: 'SET_RECIPEINGREDIENTS',
            payload: {
                ingredientName: ingredients.find(ing => Number(ing.id) === Number(recipeIngredientId))?.name,
                ingredients_id: recipeIngredientId,
                recipe_amount: recipeAmount,
                display_amount: displayAmount
            }
        })
    }

    useEffect(() => {
        dispatch({ type: 'GET_INGREDIENTS' })
    }, [])

    useEffect(() => {
        // Gives setRecipeIngredientId value if ingredients store is greater than zero
        if (ingredients.length > 0) {
            setRecipeIngredientId(ingredients[0].id)
        }
    }, [ingredients])

    const history = useHistory();

    return (
        <div>

            <h1>New Recipe</h1>

            <form>

                <input placeholder='Recipe Name' value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
                <br />
                <input type="file" accept='image/*' value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                <br />
                <textarea rows='4' cols='20' placeholder='Description'
                    value={recipeDescription} onChange={(e) => setRecipeDescription(e.target.value)}
                >
                </textarea>

            </form>

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
                <br />
                {recipe_ingredients.map(r_ingredients => {
                    return (
                        <p>{r_ingredients.ingredientName}</p>
                    )
                })}
                <br />
                <textarea rows='4' cols='50' placeholder='Instructions'
                    value={recipeInsructions} onChange={(e) => setRecipeInstructions(e.target.value)}
                >
                </textarea>

            </div>

            <button onClick={() => submitHandler()}>Continue</button>
        </div>
    )
}

export default AddRecipePage;