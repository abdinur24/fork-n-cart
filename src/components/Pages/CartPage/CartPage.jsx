import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function CartPage() {

    const cart = useSelector(store => store.cart)
    console.log('This is in cart', cart)

    return (
        <div>
            <h1>Pricing</h1>
            <h3>Add recipe to cart for price</h3>
        </div>
    )
}

export default CartPage;