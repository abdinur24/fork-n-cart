import { put,  takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getIngredients() {
    try {
        const response = yield axios.get('/api/ingredients');
        console.log('GET INGREDIENTS', response.data);
        yield put({type: 'SET_INGREDIENTS', payload: response.data});
    } catch (error) {
        console.log('ERROR in GETTING INGREDIENTS', error);
    }
}

function* addIngredients(action){
    try{
        yield axios.post('/api/ingredients/', action.payload);
        yield put({type:'GET_INGREDIENTS'});
    }catch(error){
        console.log('ERROR in ADD INGREDIENTS', error);
    }
}

function* ingredientsSaga(){
    yield takeLatest('GET_INGREDIENTS', getIngredients);
    yield takeLatest('ADD_INGREDIENTS', addIngredients);
}

export default ingredientsSaga;