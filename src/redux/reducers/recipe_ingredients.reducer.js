const recipe_ingredients=(state=[], action)=>{
    switch(action.type){
        case 'SET_RECIPEINGREDIENTS':
            return [...state, action.payload];
        default:
            return state;
    }
}

export default recipe_ingredients;