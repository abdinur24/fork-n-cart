import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function ViewRecipe() {

    const recipe_ingredients = useSelector(store => store.recipe_ingredients);
    const ingredients = useSelector(store => store.ingredient)
    const store = useSelector(store => store.recipe)
    const dispatch = useDispatch();
    const history = useHistory();


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



    // const editHandler = () => {
    //     history.push(`/edit/${recipe.id}`)
    //     setEdit(!false);
    // }


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

    const editForms = () => {
        setIsEditable(true)
    }

    const saveForms = () => {
        dispatch({
            type: 'DELETE_RECIPEINGREIDENTS',
        })
        dispatch({
            type: 'UPDATE_RECIPE',
            payload: {
                id: recipeId,
                name: recipeName,
                description: recipeDescription,
                instructions: recipeInsructions,
                image_url: imageUrl,
                recipe_ingredients,
            }
        })
        dispatch({
            type: 'CLEAR_RECIPEINGREIDNTS'
        })
        setIsEditable(false)
    }

    useEffect(() => {
        dispatch({ type: 'GET_RECIPE' })
    }, [])

    useEffect(() => {
        // Gives setRecipeIngredientId value if ingredients store is greater than zero
        if (ingredients.length > 0) {
            setRecipeIngredientId(recipeIngredientId)
        }
    }, [ingredients])

    return (
        <div>
            <div>
                <h1>{recipe.name}</h1>
                <p>{recipe.description}</p>
                <br />
                <h3>Instructions</h3>
                <p>{recipe.instructions}</p>
                <br />
                <h4>Ingredients:</h4>
                {recipe.recipe_ingredients.map(item => {
                    return (
                        <div key={item.id}>
                            <p>{item.name}: {item.display_amount}</p>
                            {/* {isIngEditable ?
                                <div>
                                    <select
                                        // multiple
                                        value={recipeIngredientId}
                                        onChange={(e) => setRecipeIngredientId(e.target.value)}
                                    >
                                        {ingredients.map(ingredient => (
                                            <option value={ingredient.id}>{ingredient.name}</option>
                                        ))}
                                    </select>
                                    <input placeholder='Recipe Amount' value={recipeAmount} onChange={(e) => setRecipeAmount(e.target.value)} />
                                    <input placeholder='Recipe Amount' value={displayAmount} onChange={(e) => setDisplayAmount(e.target.value)} />
                                </div>
                                : ''
                            } */}
                        </div>
                    )
                })}
            </div>
            <br />
            <div>

                {isEditable ?
                    <div>
                        <form>
                            <label htmlFor='RecipeName'>Recipe Name</label>
                            <br />
                            <input name='RecipeName' placeholder='Recipe Name' value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
                            <br />
                            <label htmlFor='recipeImage'>Image</label>
                            <br />
                            <input name='recipeImage' type="file" accept='image/*' value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                            <br />
                            <label htmlFor='recipeDescription'>Description</label>
                            <br />
                            <textarea rows='4' cols='20' name='recipeDescription' placeholder='Description'
                                value={recipeDescription} onChange={(e) => setRecipeDescription(e.target.value)}
                            >
                            </textarea>

                        </form>
                        <form onSubmit={ingredientHandler}>
                            <textarea rows='4' cols='50' placeholder='Instructions'
                                value={recipeInsructions} onChange={(e) => setRecipeInstructions(e.target.value)}
                            >
                            </textarea>
                            <br/>
                            Ingredient: <select
                                // multiple
                                value={recipeIngredientId}
                                onChange={(e) => setRecipeIngredientId(e.target.value)}
                            >
                                {ingredients.map(ingredient => (
                                    <option key={ingredient.id} value={ingredient.id}>{ingredient.name}</option>
                                ))}
                            </select>
                            <br />
                            Amount per grams: <input placeholder='Recipe Amount' value={recipeAmount} onChange={(e) => setRecipeAmount(e.target.value)} />
                            Amount per cooking: <input placeholder='Recipe Amount' value={displayAmount} onChange={(e) => setDisplayAmount(e.target.value)} />
                            <button type='submit'>Add</button>
                            <br />
                        </form>
                        <br />
                        {recipe_ingredients.map(r_ingredients => {
                            return (
                                <p key={r_ingredients.id}>{r_ingredients.ingredientName}</p>
                            )
                        })}
                        <br />
                    </div>
                    : ''}
                {isEditable ?
                    <button onClick={saveForms}>Save Recipe</button> :
                    <button onClick={editForms}>Edit recipe</button>
                }

            </div>
        </div >
    )
}

export default ViewRecipe;