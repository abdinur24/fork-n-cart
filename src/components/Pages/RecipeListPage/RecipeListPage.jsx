import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';


function RecipeListPage() {
    const store = useSelector(store => store.recipe)

    console.log('THIS IS RECIPE STORE', store);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'GET_RECIPE' })
    },[])
    const history = useHistory();

    return (
        <div>
            <h1>Your Recipes</h1>
            <div>
            {store.map(recipe => {
                 console.log('THIS IS RECIPE STORE', store);
                return (
                    <div className='recipe' key={recipe.id} >  
                        <h3>{recipe.name}</h3>
                        <p>{recipe.description}</p>
                        <button onClick={() =>
                            dispatch({
                                type:'DELETE_RECIPE',
                                payload: recipe.id
                            }
                        )}
                        >
                            DELETE
                        </button>
                    </div>
                 )
            })} 
            </div>
            <br/>
            <button onClick={() => {history.push('/addrecipe')}}>
                Add New Recipe
            </button>
            
        </div>
    )
}

export default RecipeListPage;