import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getRecipe() {
    try {
        const response = yield axios.get('/api/recipe',);
        yield put({type:"SET_RECIPE", payload:response.data});
    }catch(error){
        console.log('ERROR IN GET RECIPE', error);
    }
}

function* addRecipe(action){
    try{
        yield axios.post('/api/recipe', action.payload);
        yield put({type: 'GET_RECIPE'});
    }catch(error){
        console.log('ERROR IN ADDING NEW RECIPE', error);
    }
}

function* updateRecipe(action){
    try{
        console.log('IN UPDATE RECIPE', action.payload);
        yield axios.put(`/api/recipe/${action.payload.id}`, action.payload);
        yield put({type: 'GET_RECIPE'});
    }catch(error){
        console.log('ERROR IN UPDATING RECIPE', error);
    }
}

function* deleteRecipe(action){
    try{
        yield axios.delete(`/api/recipe/${action.payload}`);
        yield put({type: 'GET_RECIPE'});
    }catch(error){
        console.log('ERROR IN DELETE RECIPE', error);
    }
}

function* recipeSaga(){
    yield takeLatest('GET_RECIPE', getRecipe);
    yield takeLatest('ADD_RECIPE', addRecipe);
    yield takeLatest('UPDATE_RECIPE', updateRecipe);
    yield takeLatest('DELETE_RECIPE', deleteRecipe);
}

export default recipeSaga;