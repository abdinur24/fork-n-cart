import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function EditRecipe() {
    const [edit, setEdit] = useState(false);
    const [recipeName, setRecipeName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [recipeDescription, setRecipeDescription] = useState('');
    const [recipeInsructions, setRecipeInstructions] = useState('');
    const [recipeIngredientId, setRecipeIngredientId] = useState(0);
    const [recipeAmount, setRecipeAmount] = useState('');
    

    const store = useSelector(store => store.recipe)
    let recipe = store.find(recipe => Number(recipe.id) === Number(recipe.id));
    console.log('Viewing this ', recipe);

    const editHandler = () => {
        if (edit) {
            <textarea rows='4' cols='50' placeholder='Instructions'
                value={recipeInsructions} onChange={(e) => setRecipeInstructions(e.target.value)}
            >
            </textarea>
        }
    }


    return (
        <div>
            <h1>Edit</h1>
            <div>
                <h3>{recipe.name}</h3>
                <p>{recipe.description}</p>
            </div>
            <h3 onClick={() => editHandler(setEdit(true))}>Instructions</h3>
            <p>{recipe.instructions}</p>
            <br />
            <h4>Ingredients:</h4>
            {recipe.recipe_ingredients.map(item =>{
                return(
                    <p>{item.name}: {item.recipe_amount}</p>
                )
            })}
        </div>
    )
}

export default EditRecipe;