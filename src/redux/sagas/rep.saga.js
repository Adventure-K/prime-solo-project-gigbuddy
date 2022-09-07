import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* fetchRep() {
    try {
        const rep = yield axios.get('/api/rep');
        console.log ('get all:', rep.data);
        yield put({ type: 'SET_REP', payload: rep.data });
    } catch(err) {
        console.log('get all rep', err)
    } 
}

function* repSaga() {
    yield takeEvery('FETCH_REP', fetchRep)
}

export default repSaga;