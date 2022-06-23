import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
function AddRecipePage() {

    const [recipeName, setRecipeName] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [recipeInsructions, setRecipeInstructions] = useState();
    const [recipeIngredients, setRecipeIngredients] = useState();

    const store = useSelector(store => store.ingredient);

    const dispatch = useDispatch();
    const sumbitHandler = () => {
        dispatch({
            type: ''
        })
    }

    useEffect(() =>{
        dispatch({type: 'GET_INGREDIENTS'})
    },[])

    const history = useHistory();

    return (
        <div>
            <h1>New Recipe</h1>
            <form>
                <input placeholder='Recipe Name' value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
                <br />
                <input type="file" accept='image/*' value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                <br />
                <textarea rows='4' cols='50' placeholder='Instructions'
                    value={recipeInsructions} onChange={(e) => setRecipeInstructions(e.target.value)}
                >
                </textarea>
            </form>
            <div>
                    <select
                        placeholder='Ingredients'
                        value={recipeIngredients}
                        onChange={e => setRecipeIngredients(e.target.value)}
                    >
                        {store.map(ingredients => (
                        <option value={ingredients.id}>{ingredients.name}</option>
                        ))}
                    </select> 
            </div>

        </div>
    )
}

export default AddRecipePage;