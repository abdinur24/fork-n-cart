import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

function IngredientsPage(){
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [amount, setAmount] = useState(0);

    const store = useSelector(store => store.ingredient);
    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch({type: 'GET_INGREDIENTS'})
    },[])

    const addHandler=()=>{
        dispatch({
            type:'ADD_INGREDIENTS',
            payload:{
                name: name,
                price: price,
                amount: amount
            }
        })
    }

    return(
        <div>
            <h1>Ingredient</h1>
            <form onSubmit={addHandler}>
                <input value={name} onChange={(e) => setName(e.target.value)}/>
                <input value={price} onChange={(e) => setPrice(e.target.value)}/>
                <input value={amount} onChange={(e) => setAmount(e.target.value)}/>
                <button type='submit'>Add</button>
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
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>${item.price}/{item.amount}g</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default IngredientsPage;