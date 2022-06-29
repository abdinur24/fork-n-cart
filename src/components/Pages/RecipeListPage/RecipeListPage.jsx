import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


function RecipeListPage() {
    const store = useSelector(store => store.recipe)

    console.log('THIS IS RECIPE STORE', store);

    const dispatch = useDispatch();
    const cartHandler = (recipe) =>{
        dispatch({
            type: 'SET_CART',
            payload: recipe,
        })
    }
    useEffect(() => {
        dispatch({ type: 'GET_RECIPE',})
        dispatch({ type: 'GET_INGREDIENTS',})
    }, [])
    const history = useHistory();

    return (
        <div>
            <h1>Your Recipes</h1>
            <div>
                {store.map(recipe => {
                    return (
                        <div className='recipe' key={recipe.id} >
                            <h3 onClick={() =>  history.push(`/recipe/${recipe.id}`)}>{recipe.name}</h3>
                            <img src={recipe.image_url} />
                            <p>{recipe.description}</p>
                            <button onClick={() =>
                                dispatch({
                                    type: 'DELETE_RECIPE',
                                    payload: recipe.id
                                }
                                )}
                            >
                                DELETE
                            </button>
                            <button onClick={() => cartHandler(recipe)}>Add to Cart</button>
                        </div>
                    )
                })}
            </div>
            <br />
            <button onClick={() => { history.push('/addrecipe') }}>
                Add New Recipe
            </button>

        </div>
    )
}

export default RecipeListPage;