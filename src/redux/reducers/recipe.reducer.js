
const recipeReducer =(state = {}, action)=>{
    switch(action.type){
        case 'SET_RECIPE':
            return action.payload; 
        case 'EDIT_RECIPE':
            return action.payload;
        default:
            return state     
    }
}



export default recipeReducer;