import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
function AddRecipePage() {

    const [recipeName, setRecipeName] = useState('');
    const [imageUrl, setImageUrl] = useState();
    const [recipeDescription, setRecipeDescription] = useState('');
    const [recipeInsructions, setRecipeInstructions] = useState('');
    const [recipeIngredientId, setRecipeIngredientId] = useState('');
    const [recipeAmount, setRecipeAmount] = useState('');
    const [displayAmount, setDisplayAmount] = useState('');
    const [unit, setUnit] = useState();
    const [c, setC] = useState();
    const [oz, setOz] = useState();
    const [tbsp, setTbsp] = useState();
    const [tsp, setTsp] = useState();

    const ingredient = useSelector(store => store.ingredient);
    console.log('this is ingredients store', ingredient);

    const store = useSelector(store => store.recipe_ingredients);

    const dispatch = useDispatch();
    const submitHandler = () => {
        dispatch({
            type: 'SET_NEWRECIPE',
            payload: {
                name: recipeName,
                description: recipeDescription,
                instructions: recipeInsructions,
                image_url:imageUrl,
                recipe_ingredients:[
                    {
                        ingredients_id:recipeIngredientId,
                        recipe_amount:recipeAmount,
                        display_amount:displayAmount,
                    }
                ]
            }
        })
        history.push('/reviewRecipe')
    }

    const ingredientHandler = () =>{
        dispatch({
            type: 'SET_RECIPEINGREDIENTS',
            payload: {
                ingredientName: ingredient.find(ing => Number(ing.id) === Number(recipeIngredientId))?.name,
                recipeIngredientId,
                recipeAmount,
            }
        })
    }

    useEffect(() => {
        dispatch({ type: 'GET_INGREDIENTS' })
    }, [])

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
                        placeholder='Ingredients'
                        multiple
                        value={recipeIngredientId}
                        onChange={(e) => setRecipeIngredientId(e.target.value)}
                    >
                        {ingredient.map(ingredients => (
                            <option value={ingredients.id}>{ingredients.name}</option>
                            ))}
                        </select>
                        <br/>
                        Amount: <input placeholder='Recipe Amount' value={recipeAmount} onChange={(e) => setRecipeAmount(e.target.value)} />
                        <button type='submit'>Add</button>
                    </form>
                    <br/>
                    {store.map(r_ingredients => {
                        console.log('this is new added ingredient', store);
                            return(
                                <p>{r_ingredients.ingredientName}</p>
                            )
                        })}
                    <br />
                    <textarea rows='4' cols='50' placeholder='Instructions'
                        value={recipeInsructions} onChange={(e) => setRecipeInstructions(e.target.value)}
                    >
                    </textarea>
            </div>
            <button onClick={()=> submitHandler()}>Continue</button>

        </div>
    )
}

export default AddRecipePage;