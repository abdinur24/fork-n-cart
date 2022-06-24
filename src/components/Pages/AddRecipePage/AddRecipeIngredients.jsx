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
                                <br/>
                    Amount: <input placeholder='Recipe Amount' value={recipeAmount} onChange={(e) => setRecipeAmount(e.target.value)} />
                    Unit: <select value={unit}>
                            <option value={c}>Cups</option>
                            <option value={oz}>Ounces</option>
                            <option value={tbsp}>Tablespoon</option>
                            <option value={tsp}>Teaspoon</option>
                        </select>
                    <br/>
                    <button onClick={() => dispatch({type:'SET_RECIPEINGREDIENTS'})}>Sumbit</button>
            </div>
        </div>
    )
}

export default AddRecipeIngredients;