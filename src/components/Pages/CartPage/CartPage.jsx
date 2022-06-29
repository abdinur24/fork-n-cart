import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
        <div>
            <h1>Pricing</h1>
            {cart.map(item => {
                return (
                    <div>
                        <h3>{item.name}</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Ingredient</th>
                                    <th>Amount</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            {item.recipe_ingredients.map(ingredient => {
                                {
                                    let recipeIngredientPrice = 0
                                    let ingredientPrice = 0;
                                    ingredientPrice += ingredient.price/ingredient.amount
                                    console.log('Price pre gram of ingredient',Number(ingredientPrice.toFixed(3)));
                                    recipeIngredientPrice += Number(ingredientPrice.toFixed(3))*Number(ingredient.recipe_amount)
                                    console.log('Price for recipe amount of ingredient',recipeIngredientPrice)
                                    if(ingredient.recipe_id === item.id){
                                        total += recipeIngredientPrice;
                                    }
                               
                                    return (
                                        <>
                                            <tbody>
                                                <tr>
                                                    <td>{ingredient.name}</td>
                                                    <td>{ingredient.recipe_amount} g</td>
                                                    <td>{recipeIngredientPrice.toFixed(2)}</td>
                                                </tr>
                                            </tbody>
                                            {/* <h4>Total is:{total.toFixed(2)}</h4> */}
                                        </>
                                    )
                                }
                            })}
                            {/* <h3>Total is:{cartTotal.toFixed(2)}</h3> */}
                        </table>
                    </div>
                )
            })}

            <h4>Total is: ${total.toFixed(2)}</h4>

        </div>
    )
}

export default CartPage;