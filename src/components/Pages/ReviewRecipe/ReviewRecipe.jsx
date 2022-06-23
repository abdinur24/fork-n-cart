import { useSelector, useDispatch } from 'react-redux';
function ReviewRecipe() {
    const recipe = useSelector(store => store.recipe.newRecipeReducer)
    const dispatch = useDispatch();
    
    const addHandler = () => {
        
    }
    return (
        <h1>Your New Recipe</h1>
    )
}

export default ReviewRecipe;