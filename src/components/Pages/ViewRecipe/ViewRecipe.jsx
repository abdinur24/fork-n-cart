import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function ViewRecipe() {
    const store = useSelector(store => store.recipe)
    const history = useHistory();

    const [edit, setEdit] = useState(false);
    const [recipeName, setRecipeName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [recipeDescription, setRecipeDescription] = useState('');
    const [recipeInsructions, setRecipeInstructions] = useState('');
    const [recipeIngredientId, setRecipeIngredientId] = useState(0);
    const [recipeAmount, setRecipeAmount] = useState('');
    
    let params = useParams();
    console.log(params)

    let recipeId = params.recipeId

    let recipe = store.find(recipe => recipe.id === Number(recipeId));
    console.log('Viewing this ', recipe);

    const editHandler = () => {
        history.push('/edit')
        // if (edit) {
        //     <textarea rows='4' cols='50' placeholder='Instructions'
        //         value={recipeInsructions} onChange={(e) => setRecipeInstructions(e.target.value)}
        //     >
        //     </textarea>
        // }
    }


    return (
        <div>
            <h1>Edit</h1>
            <div>
                <h3>{recipe.name}</h3>
                <p>{recipe.description}</p>
            </div>
            <h3>Instructions</h3>
            <p>{recipe.instructions}</p>
            <br />
            <h4>Ingredients:</h4>
            {recipe.recipe_ingredients.map(item =>{
                return(
                    <p>{item.name}: {item.display_amount}</p>
                )
            })}
            <button onClick={(e) => editHandler()}>Edit Recipe</button>
        </div>
    )
}

export default ViewRecipe;