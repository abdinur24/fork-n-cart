import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './CartPage.css'

// Material UI
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import Paper from '@mui/material/Paper';

function CartPage() {

    const cart = useSelector(store => store.cart)
    const store = useSelector(store => store.recipe)
    console.log('This is in cart', cart)
    let cartTotal = 0;
    let total = 0;


    // if (cart.length < 0) {
    //     <h3>Add recipe to cart for price</h3>
    // }

    return (
        <div className='cartPage'>
            <Typography variant='h1'>
                Pricing
            </Typography>
            {cart.map(item => {
                return (
                    <Box
                        sx={{
                            maxWidth:500
                        }}
                    >
                        
                        <TableContainer>
                            <Typography variant='h4'>{item.name}</Typography>
                            <img src={item.image_url} width={100} height={100}/>
                            <Table sx={{ maxWidth: 700 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Ingredient</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell>Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                {item.recipe_ingredients.map(ingredient => {
                                    {
                                        let recipeIngredientPrice = 0
                                        let ingredientPrice = 0;
                                        ingredientPrice += ingredient.price / ingredient.amount
                                        console.log('Price pre gram of ingredient', Number(ingredientPrice.toFixed(3)));
                                        recipeIngredientPrice += Number(ingredientPrice.toFixed(3)) * Number(ingredient.recipe_amount)
                                        console.log('Price for recipe amount of ingredient', recipeIngredientPrice)
                                        if (ingredient.recipe_id === item.id) {
                                            total += recipeIngredientPrice;
                                        }

                                        return (
                                            <>
                                                <TableBody>
                                                    <TableRow
                                                        key={ingredient.id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell align="center">{ingredient.name}</TableCell>
                                                        <TableCell align="center">{ingredient.recipe_amount} g</TableCell>
                                                        <TableCell align="center">{recipeIngredientPrice.toFixed(2)}</TableCell>
                                                    </TableRow
                                                    >
                                                </TableBody>
                                                {/* <h4>Total is:{total.toFixed(2)}</h4> */}
                                            </>
                                        )
                                    }
                                })}
                                {/* <h3>Total is:{cartTotal.toFixed(2)}</h3> */}
                            </Table>
                        </TableContainer>
                    </Box>
                )
            })}

            {total === 0 ? '' : <h4>Total is: ${total.toFixed(2)}</h4>}

        </div>
    )
}

export default CartPage;