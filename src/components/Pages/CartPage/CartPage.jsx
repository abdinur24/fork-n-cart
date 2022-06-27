import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function CartPage(){

    const cart = useSelector(store => store.cart)
    console.log('This is in cart', cart)

    return(
        <h1>CART</h1>
    )
}

export default CartPage;