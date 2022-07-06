import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

// Material UI
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { blueGrey } from '@mui/material/colors';

const MuiButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: blueGrey[900],
}))

function ReviewRecipe() {

    const newRecipe = useSelector(store => store.newRecipeReducer);
    console.log('This is newRecipeReducer', newRecipe)

    const ingredients = useSelector(store => store.ingredient);
    const recipe_ingredients = useSelector(store => store.recipe_ingredients);

    const dispatch = useDispatch();
    const history = useHistory();
    const addHandler = () => {
        dispatch({
            type: 'ADD_RECIPE',
            payload: newRecipe
        })
        dispatch({
            type: 'CLEAR_RECIPEINGREIDNTS'
        })
        setTimeout(() => history.push('/recipelist'), 1000)
    }
    return (
        <div>
            <Card
                sx={{
                    maxWidth: 500,
                    minHeight: 500,
                    marginTop: 3,
                    marginLeft: 55
                }}
                style={{
                    backgroundColor: '#16608857',
                    // alignItems: 'center',
                    justifyContent: "center", 
                    display: "flex"
                }}
            >
                <CardContent>
                    <Typography variant='h2' textAlign='center' >
                        {newRecipe.name}
                    </Typography>
                    <img src={newRecipe.image_url} />
                    <Typography fontSize={25} component="div" textAlign='center'>
                        {newRecipe.description}
                    </Typography>
                    <Typography fontSize={20} component="div" textAlign='center'>
                        Ingredients
                    </Typography>
                    {recipe_ingredients.map(r_ingredients => {
                        {
                            if (r_ingredients.recipeIngredientId) {
                            }
                        }
                        return (
                            <Typography variant="body1" component="div" textAlign='center'>
                                {r_ingredients.ingredientName}: {r_ingredients.display_amount}
                            </Typography>
                        )
                    })}
                    <Typography fontSize={20} component="div" textAlign='center'>
                        Instructions
                    </Typography>
                    <Typography variant="body1" component="div" textAlign='center'>
                        {newRecipe.instructions}
                    </Typography>
                </CardContent>
            </Card>
            <MuiButton sx={{ marginRight: 80, marginLeft: 80, marginTop: 2 }} onClick={() => addHandler()}>Add</MuiButton>

        </div>
    )
}

export default ReviewRecipe;