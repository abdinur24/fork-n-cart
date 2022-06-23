const newRecipeReducer =(state = [], action)=>{
    switch(action.type){
        case 'SET_NEWRECIPE':
            return  action.payload;
        default:
            return state     
    }
}


export default newRecipeReducer;