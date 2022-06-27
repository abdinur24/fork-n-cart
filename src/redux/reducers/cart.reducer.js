import { combineReducers } from 'redux';

const cart =(state=[], action)=>{
    switch(action.type){
        case 'SET_CART':
            return [...state, action.payload];
        case 'CLEAR_CART':
            return [];
        default:
            return state;
    }
}
// const total = (state = 0, action) =>{
//     switch(action.type){
//         case 'TOTALIZE':
//             return action.payload
//         default:
//             state;
//     }
// }

export default cart;