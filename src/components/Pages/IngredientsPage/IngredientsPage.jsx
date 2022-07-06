import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './IngredientsPage.css'

//Material UI
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box"
import Button from "@mui/material/Button";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function IngredientsPage() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [amount, setAmount] = useState(0);

    const store = useSelector(store => store.ingredient);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: 'GET_INGREDIENTS' })
    }, [])

    const addHandler = () => {
        dispatch({
            type: 'ADD_INGREDIENTS',
            payload: {
                name: name,
                price: price,
                amount: amount
            }
        })
    }

    return (
        <div className='ingredientsPage'>
            <Typography variant='h1'>
                Ingredients
            </Typography>
            <div className='ingredientForm'>
                <TextField
                    label='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label='Price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <TextField
                    label='Amount'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <Box
                    sx={{
                        pt: 1,
                        display: 'flex',
                        flexDirection: 'row-reverse',
                    }}
                >
                    <Button
                        color='success'
                        variant='contained'
                        type='submit'
                        onClick={addHandler}>
                        Add
                    </Button>
                </Box>
            </div>
            <div className='ingredientList'>

                {store.map(item => {
                    return (
                        <ul key={item.id}>
                            <li>{item.name}: ${item.price}/{item.amount}g</li>
                        </ul>
                    )
                })}

            </div>
        </div>
    )
}

export default IngredientsPage;