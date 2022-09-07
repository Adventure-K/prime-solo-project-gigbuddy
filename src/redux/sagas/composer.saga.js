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

function* composerSaga() {
    yield takeLatest('FETCH_COMPOSERS', fetchComposers)
}

export default composerSaga;