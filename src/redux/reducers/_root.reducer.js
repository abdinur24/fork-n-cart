import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import recipe from './recipe.reducer'
import newRecipeReducer from './new_recipe.reducer';
import ingredient from './ingredients.reducer'
import recipe_ingredients from './recipe_ingredients.reducer';
import cart from './cart.reducer';
import edit from './edit_recipe.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  recipe,
  newRecipeReducer,
  recipe_ingredients,
  ingredient,
  cart,
  edit
});

export default rootReducer;
