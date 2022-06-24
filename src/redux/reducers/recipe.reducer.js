

const recipeReducer =(state = [], action)=>{
    switch(action.type){
        case 'SET_RECIPE':
            return  action.payload;
        case 'SET_NEWRECIPE':
            return action.payload;
        case 'EDIT_RECIPE':
                return action.payload;
        default:
            return state     
    }
}

// const newRecipeReducer =(state = [], action)=>{
//     switch(action.type){
//         case 'SET_NEWRECIPE':
//             return  action.payload;
//         default:
//             return state     
//     }
// }




export default recipeReducer;
