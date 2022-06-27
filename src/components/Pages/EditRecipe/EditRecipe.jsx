import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function EditRecipe(){
    const [edit, setEdit] = useState(fasle);
    const recipes = useSelector(store => store.recipe)
    let recipe = recipes.find(recipe => recipe.id === Number(recipe.id));
    console.log('Viewing this ',recipe);

    const editHandler = () =>{
        
    }


    return(
        <div>
            <h1>Edit</h1>
        </div>
    )
}

export default EditRecipe;