import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchComposers() {
    try {
        const composers = yield axios.get('/api/composers');
        console.log ('get all:', composers.data);
        yield put({ type: 'SET_COMPOSERS', payload: composers.data });
    } catch(err) {
        console.log('get all composers', err)
    } 
}

function* addComposer(action) {
    try {
        yield axios.post('/api/composers', action.payload);
        yield put({ type: 'FETCH_COMPOSERS'})
    } catch(err) {
        console.error('composer POST', err)}
}

function* composerSaga() {
    yield takeLatest('FETCH_COMPOSERS', fetchComposers)
    yield takeLatest('ADD_COMPOSER', addComposer)
}

export default composerSaga;