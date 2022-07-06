import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useScript } from '../../../hooks/useScript';
import { useHistory } from 'react-router-dom'

// Material UI
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box"
import Button from "@mui/material/Button";

function AddRecipePage() {
    const ingredients = useSelector(store => store.ingredient);
    console.log('this is ingredients store', ingredients);

    const recipe_ingredients = useSelector(store => store.recipe_ingredients);
    console.log('this is recipe_ingredients store', recipe_ingredients);

    const [recipeName, setRecipeName] = useState('');
    const [imageUrl, setImageUrl] = useState();
    const [recipeDescription, setRecipeDescription] = useState('');
    const [recipeInsructions, setRecipeInstructions] = useState('');
    const [recipeIngredientId, setRecipeIngredientId] = useState('');
    const [recipeAmount, setRecipeAmount] = useState('');
    const [displayAmount, setDisplayAmount] = useState('');


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



    const dispatch = useDispatch();
    const submitHandler = () => {
        dispatch({
            type: 'SET_NEWRECIPE',
            payload: {
                name: recipeName,
                description: recipeDescription,
                instructions: recipeInsructions,
                image_url: imageUrl,
                recipe_ingredients
            }
        })
        history.push('/reviewRecipe')
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

    useEffect(() => {
        dispatch({ type: 'GET_INGREDIENTS' })
    }, [])

    useEffect(() => {
        // Gives setRecipeIngredientId value if ingredients store is greater than zero
        if (ingredients.length > 0) {
            setRecipeIngredientId(ingredients[0].id)
        }
    }, [ingredients])

    const history = useHistory();

    return (
        <div>
            <Grid container alignItems="center" justify="center" direction="column">
                <Typography variant='h1'>
                    New Recipe
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
                            <br />
                            {useScript('https://widget.cloudinary.com/v2.0/global/all.js')}

                            File to upload: <Button type="button" onClick={openWidget}>Pick File</Button>
                            <br />
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
                <Box sx={{paddingBottom: 2}} style={{alignContent:'right'}}>
                    {recipe_ingredients.map(r_ingredients => {
                        return (
                            <Typography>
                                {r_ingredients.ingredientName}: {r_ingredients.display_amount}
                            </Typography>
                        )
                    })}
                </Box>
                <Grid item sm={3}>
                    <TextField
                        fullWidth
                        multiline
                        rows={5}
                        label='Instructions'
                        value={recipeInsructions} onChange={(e) => setRecipeInstructions(e.target.value)}
                    />
                </Grid>
                <Box paddingTop={3} variant='contained' color="success">
                    <Button onClick={() => submitHandler()}>Continue</Button>
                </Box>
            </Grid >
        </div >
    )
}

export default AddRecipePage;