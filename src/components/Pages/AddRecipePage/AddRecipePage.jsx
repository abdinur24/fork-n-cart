import {useDispatch} from 'react-redux';
import {useState} from 'react';
function AddRecipePage(){
    const [recipeName, setRecipeName] = useState();
    const [recipeInsructions, setRecipeInstructions] = useState();
    const [recipeIngredients, setRecipeIngredients] = useState();

    const dispatch = useDispatch();
    const sumbitHandler = () =>{
        dispatch({
            type:''
        })
    }

    return(

        <h1>Add New Recipe</h1>
    )
}

export default AddRecipePage;