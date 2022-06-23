import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
function AddRecipePage() {

    const [recipeName, setRecipeName] = useState('');
    const [imageUrl, setImageUrl] = useState();
    const [recipeDescription, setRecipeDescription] = useState('');
    const [recipeInsructions, setRecipeInstructions] = useState('');
    const [recipeIngredients, setRecipeIngredients] = useState('');
    const [recipeAmount, setRecipeAmount] = useState('');
    const [displayAmount, setDisplayAmount] = useState('');

    const store = useSelector(store => store.ingredient);

    const dispatch = useDispatch();
    const sumbitHandler = () => {
        dispatch({
            type: 'SET_NEWRECIPE',
            payload: {
                name: recipeName,
                description: recipeDescription,
                instructions: recipeInsructions,
                image_url:imageUrl,
                recipeIngredients:[
                    {
                        ingredients_id:recipeIngredients,
                        recipe_amount:recipeAmount,
                        display_amount:displayAmount,
                    }
                ]
            }
        })
        history.push('/reviewRecipe')
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
                <form>
                    <select
                        placeholder='Ingredients'
                        value={recipeIngredients}
                        onChange={e => setRecipeIngredients(e.target.value)}
                    >
                        {store.map(ingredients => (
                            <option value={ingredients.id}>{ingredients.name}</option>
                        ))}
                    </select>
                    <p>Please put amount in grams</p>
                    <input placeholder='Recipe Amount' value={recipeAmount} onChange={(e) => setRecipeAmount(e.target.value)} />
                    <br />
                    <textarea rows='4' cols='50' placeholder='Instructions'
                        value={recipeInsructions} onChange={(e) => setRecipeInstructions(e.target.value)}
                    >
                    </textarea>
                </form>
            </div>
            <button onClick={()=> sumbitHandler()}>Continue</button>

        </div>
    )
}

export default AddRecipePage;