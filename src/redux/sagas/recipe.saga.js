import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getRecipe() {
    try {
        const response = yield axios.get('/api/recipe')
        yield put({type:"SET_RECIPE", payload:response.data})
    }catch(error){
        console.log('ERROR IN GET RECIPE', error);
    }
}

function* addRecipe(action){
    try{
        yield axios.post('/api/recipe')
    }catch(error){
        console.log('ERROR IN ADDING NEW RECIPE', error);
    }
}