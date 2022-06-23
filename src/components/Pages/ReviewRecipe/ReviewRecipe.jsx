import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
function ReviewRecipe() {
    const store = useSelector(store => store.newRecipeReducer)
    console.log('This is new recipe reducer', store)
    const dispatch = useDispatch();
    const history = useHistory();
    const addHandler = () => {
        dispatch({
            type: 'ADD_RECIPE',
            payload: store
        })
        history.push('/recipelist')
    }
    return (
        <div>
            <h1>Your New Recipe</h1>
            {store.map(recipe => {
                return (
                    <div>
                        <h1>{recipe.name}</h1>
                        <h4>{recipe.description}</h4>
                        <p>{recipe.instructions}</p>
                        {/* {recipe.map(ingredients =>{
                            return(
                                <p>{ingredients.name}</p>
                            )
                        })} */}
                    </div>
                )
            })}

        </div>
    )
}

export default ReviewRecipe;