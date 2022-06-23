import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

function AddRecipeIngredients() {
    const [recipeIngredients, setRecipeIngredients] = useState('');

    const store = useSelector(store => store.ingredient);

    useEffect(() => {
        dispatch({ type: 'GET_INGREDIENTS' })
    }, [])
    return (
        <div>
            <h1>Add Recipe</h1>
            <h4>Ingredients</h4>
            <div>
            {store.map(ingredients => {
                return (
                    <select
                        value={recipeIngredients}
                        onChange={e => setRecipeIngredients(e.target.value)}
                    >
                        <option value={ingredients.id}>{ingredients.name}</option>
                    </select>
                )
            })}
            </div>
        </div>
    )
}

export default AddRecipeIngredients;