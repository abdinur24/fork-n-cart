import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useScript } from '../../../hooks/useScript';

import './ViewRecipe.css';

// Material UI
import { styled} from '@mui/material/styles';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box"
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';



function ViewRecipe() {

    const recipe_ingredients = useSelector(store => store.recipe_ingredients);
    const ingredients = useSelector(store => store.ingredient)
    const store = useSelector(store => store.recipe)
    const dispatch = useDispatch();
    const history = useHistory();


    let params = useParams();
    console.log(params)
    let recipeId = params.recipeId
    console.log(recipeId)
    let recipe = store.find(recipe => recipe.id === Number(recipeId));
    console.log('Viewing this ', recipe);

    useEffect(() => {
        dispatch({ type: 'GET_INGREDIENTS' })
    }, [])

    useEffect(() => {
        // Gives setRecipeIngredientId value if ingredients store is greater than zero
        if (ingredients.length > 0) {
            setRecipeIngredientId(recipeIngredientId)
        }
        dispatch({ type: 'GET_RECIPE' })

    }, [ingredients])

    const [isEditable, setIsEditable] = useState(false);
    const [recipeName, setRecipeName] = useState(recipe.name);
    // const [imageUrl, setImageUrl] = useState(recipe.image_url);
    const [recipeDescription, setRecipeDescription] = useState(recipe.description);
    const [recipeInsructions, setRecipeInstructions] = useState(recipe.instructions);
    let ingredients_id = recipe.recipe_ingredients.find(ingredients_id => ingredients_id === Number(recipe.recipe_ingredients.id))
    const [recipeIngredientId, setRecipeIngredientId] = useState(ingredients_id);
    const [recipeAmount, setRecipeAmount] = useState(ingredients.recipe_amount);
    const [displayAmount, setDisplayAmount] = useState(ingredients.display_amount);



    // const editHandler = () => {
    //     history.push(`/edit/${recipe.id}`)
    //     setEdit(!false);
    // }

    const openWidget = () => {
        // Currently there is a bug with the Cloudinary <Widget /> component
        // where the button defaults to a non type="button" which causes the form
        // to submit when clicked. So for now just using the standard widget that
        // is available on window.cloudinary
        // See docs: https://cloudinary.com/documentation/upload_widget#look_and_feel_customization
        !!window.cloudinary && window.cloudinary.createUploadWidget(
            {
                sources: ['local', 'url', 'camera'],
                cloudName: process.env.REACT_APP_CLOUDINARY_NAME,
                uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
            },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    // When an upload is successful, save the uploaded URL to local state!
                    setImageUrl(result.info.secure_url)
                }
            },
        ).open();
    }


    const ingredientHandler = () => {
        dispatch({
            type: 'SET_RECIPEINGREDIENTS',
            payload: {
                ingredientName: ingredients.find(ing => Number(ing.id) === Number(recipeIngredientId))?.name,
                ingredients_id: recipeIngredientId,
                recipe_amount: recipeAmount,
                display_amount: displayAmount
            }
        })
    }

    const editForms = () => {
        setIsEditable(true)
    }

    const saveForms = () => {
        dispatch({
            type: 'DELETE_RECIPEINGREIDENTS',
        })
        dispatch({
            type: 'UPDATE_RECIPE',
            payload: {
                id: recipeId,
                name: recipeName,
                description: recipeDescription,
                instructions: recipeInsructions,
                image_url: recipe.image_url,
                recipe_ingredients,
            }
        })
        dispatch({
            type: 'CLEAR_RECIPEINGREIDNTS'
        })
        setIsEditable(false)
    }





    return (
        <div id='viewcard'>
            
            <Card 
                sx={{ 
                    maxWidth: 500, 
                    minHeight: 500,
                    marginTop: 3,
                    marginLeft: 55
                }}
                style={{
                    backgroundColor: '#16608857'
                }}
            >
                <CardContent>
                    <Typography variant='h2' textAlign='center' >
                        {recipe.name}
                    </Typography>
                    <img src={recipe.image_url} />
                    <Typography fontSize={25} component="div" textAlign='center'>
                        {recipe.description}
                    </Typography>
                    <Typography fontSize={20} component="div" textAlign='center'>
                        Ingredients
                    </Typography>
                    <Typography variant="body1" component="div" textAlign='center'>
                        {recipe.recipe_ingredients.map(item => {
                            return (
                                <div key={item.id}>
                                    <p>{item.name}: {item.display_amount}</p>
                                </div>
                            )
                        })}
                    </Typography>
                    <Typography fontSize={20} component="div" textAlign='center'>
                        Instructions
                    </Typography>
                    <Typography variant="body1" component="div" textAlign='center'>
                        {recipe.instructions}
                    </Typography>

                </CardContent>
            </Card>
            {isEditable ?
                <div>
                    <Grid container alignItems="center" justify="center" direction="column">
                        <Typography variant='h4'>
                            Edit Recipe
                        </Typography>
                        <Box sx={{ m: 2 }}>
                            <Grid item>
                                <form>
                                    <TextField

                                        label='Name'
                                        placeholder='Recipe Name'
                                        value={recipeName}
                                        onChange={(e) => setRecipeName(e.target.value)}
                                    />
                                    {/* <br />
                                    {useScript('https://widget.cloudinary.com/v2.0/global/all.js')}

                                    File to upload: <Button type="button" onClick={openWidget}>Pick File</Button>
                                    <br /> */}
                                    {/* {file_url && <p>Uploaded Image URL: {file_url} <br /><img src={file_url} width={100} /></p>} */}
                                    <TextField
                                        label='Description'
                                        multiline
                                        rows={5}
                                        value={recipeDescription} onChange={(e) => setRecipeDescription(e.target.value)}
                                    />
                                </form>
                            </Grid>
                        </Box>
                        <Grid item>
                            <form onSubmit={ingredientHandler}>
                                <Box paddingBottom={3}>
                                    <TextField
                                        id="outlined-select-currency"
                                        select
                                        label='Ingredients'
                                        // multiple
                                        value={recipeIngredientId}
                                        onChange={(e) => setRecipeIngredientId(e.target.value)}
                                    >
                                        <MenuItem></MenuItem>
                                        {ingredients.map(ingredient => (
                                            <MenuItem value={ingredient.id}>{ingredient.name}</MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        type='number'
                                        label='Amount pre gram'
                                        placeholder='Recipe Amount'
                                        value={recipeAmount} onChange={(e) => setRecipeAmount(e.target.value)}
                                    />
                                    <TextField
                                        label='Amount per recipe'
                                        placeholder='Recipe Amount'
                                        value={displayAmount} onChange={(e) => setDisplayAmount(e.target.value)} />
                                    <Button type='submit'>Add</Button>
                                </Box>
                            </form>
                        </Grid>
                        {recipe_ingredients.map(r_ingredients => {
                            return (
                                <Grid item>
                                    <Typography>
                                        {r_ingredients.ingredientName}: {r_ingredients.display_amount}
                                    </Typography>
                                </Grid>
                            )
                        })}
                        <Grid item sm={3}>
                            <TextField
                                fullWidth
                                multiline
                                rows={5}
                                label='Instructions'
                                value={recipeInsructions} onChange={(e) => setRecipeInstructions(e.target.value)}
                            />
                        </Grid>
                    </Grid >
                </div >
                : ''}
            {isEditable ?
                <Button sx={{marginRight:80, marginLeft:80, marginTop: 2}} onClick={saveForms}>Save Recipe</Button> :
                <Button sx={{marginRight:80, marginLeft:80, marginTop: 2}} onClick={editForms}>Edit recipe</Button>
            }
        </div >
    )
}

export default ViewRecipe;