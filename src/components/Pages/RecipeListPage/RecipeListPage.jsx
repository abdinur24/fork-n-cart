import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './RecipeList.css'

// Imported Material UI
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { blueGrey } from '@mui/material/colors';


const MuiButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: blueGrey[900],
}))

function RecipeListPage() {
    const store = useSelector(store => store.recipe)

    console.log('THIS IS RECIPE STORE', store);

    const dispatch = useDispatch();
    const cartHandler = (recipe) => {
        dispatch({
            type: 'SET_CART',
            payload: recipe,
        })
    }
    useEffect(() => {
        dispatch({ type: 'GET_RECIPE', })
        dispatch({ type: 'GET_INGREDIENTS', })
    }, [])
    const history = useHistory();

    return (
        <Container className='Container'>
            <Typography variant='h1'>
                Recipes
            </Typography>
            <Grid container>
                {store.map(recipe => {
                    return (
                        <Box sx={{ m: 2 }}>
                            <Grid item>
                                <Card id='Container2' key={recipe.id} sx={{ maxWidth: 345 }}>
                                    <CardActionArea onClick={() => history.push(`/recipe/${recipe.id}`)}>
                                        <CardHeader
                                            title={recipe.name}
                                        />
                                        <CardMedia
                                            component="img"
                                            height="194"
                                            width="100"
                                            image={recipe.image_url}
                                        // alt="Paella dish"
                                        />
                                        <Typography>
                                            {recipe.description}
                                        </Typography>
                                    </CardActionArea>
                                    <CardActions>
                                        <Box pr={9}>
                                            <MuiButton onClick={() =>
                                                dispatch({
                                                    type: 'DELETE_RECIPE',
                                                    payload: recipe.id
                                                }
                                                )}
                                            >
                                                DELETE
                                            </MuiButton>
                                        </Box>
                                        <Box pl={9} >
                                            <Button color='success' onClick={() => cartHandler(recipe)}>Add to Cart</Button>
                                        </Box>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Box>
                    )
                })}
            </Grid>
            <br />
            <MuiButton variant='secondary' onClick={() => { history.push('/addrecipe') }}>
                Add New Recipe
            </MuiButton>

        </Container>
    )
}

export default RecipeListPage;