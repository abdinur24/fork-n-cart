import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

function IngredientsPage(){
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [amount, setAmount] = useState();

    const store = useSelector(store => store.ingredient);
    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch({type: 'GET_INGREDIENTS'})
    },[])

    return(
        <div>
            <h1>Ingredient</h1>
            <form>
                <input value={name} onChange={(e) => setName(e.target.value)}/>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {store.map(item => {
                        return (
                            <tr>
                                <td>{item.name}</td>
                                <td>${item.price}/{item.amount}g</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <button></button>
        </div>
    )
}

export default IngredientsPage;