import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function CartPage() {

    const cart = useSelector(store => store.cart)
    const store = useSelector(store => store.recipe)
    console.log('This is in cart', cart)
    let total = 0;
    
    if(cart.length < 0){
        <h3>Add recipe to cart for price</h3>
    }

    return (
        <div>
            <h1>Pricing</h1>
            {(cart.length < 0) ?
           <h3>Add recipe to cart for price</h3> :
           ''
            }
            {cart.map(recipe =>{
              return(
                  <h1>{recipe.name}</h1>
              )
            })}
        </div>
    )
}

export default CartPage;