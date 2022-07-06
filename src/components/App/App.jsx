import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Shared/Nav/Nav';
import Footer from '../Shared/Footer/Footer';

import ProtectedRoute from '../Shared/ProtectedRoute/ProtectedRoute';

import AboutPage from '../Pages/AboutPage/AboutPage'
import UserPage from '../Pages/UserPage/UserPage';
import InfoPage from '../Pages/InfoPage/InfoPage';
import LandingPage from '../Pages/LandingPage/LandingPage';
import LoginPage from '../Auth/LoginPage/LoginPage';
import RegisterPage from '../Auth/RegisterPage/RegisterPage';
import RecipeListPage from '../Pages/RecipeListPage/RecipeListPage';
import AddRecipePage from '../Pages/AddRecipePage/AddRecipePage';
import AddRecipeIngredients from '../Pages/AddRecipePage/AddRecipeIngredients';
import IngredientsPage from '../Pages/IngredientsPage/IngredientsPage';
import ReviewRecipe from '../Pages/ReviewRecipe/ReviewRecipe';
import PricingPage from '../Pages/PricingPage/PricingPage';
import ViewRecipe from '../Pages/ViewRecipe/ViewRecipe';
import CartPage from '../Pages/CartPage/CartPage';
import EditRecipe from '../Pages/EditRecipe/EditRecipe'

import './App.css';


function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/recipelist" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          {/* <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute> */}

          <ProtectedRoute
            exact
            path='/recipelist'
          >
            <RecipeListPage/>
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path='/addrecipe'
          >
            <AddRecipePage/>
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path='/reviewRecipe'
          >
            <ReviewRecipe/>
          </ProtectedRoute>
          {/* <ProtectedRoute
            exact
            path='/addrecipe2'
          >
            <AddRecipeIngredients/>
          </ProtectedRoute> */}
          <ProtectedRoute
            exact
            path="/ingredients"
          >
            <IngredientsPage/>
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path="/pricing"
          >
            <PricingPage/>
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path="/cart"
          >
            <CartPage/>
          </ProtectedRoute>
          {/* <ProtectedRoute
            exact
            path="/edit/:recipeId"
          >
            <EditRecipe/>
          </ProtectedRoute> */}
          <ProtectedRoute
            exact
            path="/recipe/:recipeId"
          >
            <ViewRecipe/>
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
