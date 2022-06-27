import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function EditRecipe() {


    const [recipeName, setRecipeName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [recipeDescription, setRecipeDescription] = useState('');
    const [recipeInsructions, setRecipeInstructions] = useState('');
    const [recipeIngredientId, setRecipeIngredientId] = useState(0);
    const [recipeAmount, setRecipeAmount] = useState('');

    return (
        <>
            <h1>Hi</h1>
        </>
    )
}


export default EditRecipe;