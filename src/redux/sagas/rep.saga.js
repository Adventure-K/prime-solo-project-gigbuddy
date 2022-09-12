import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* fetchRep() {
    try {
        const rep = yield axios.get('/api/rep');
        console.log('get all:', rep.data);
        yield put({ type: 'SET_REP', payload: rep.data });
    } catch (err) {
        console.log('get all rep', err)
    }
}

function* fetchRepForDash() {
    try {
        const rep = yield axios.get('/api/rep/fordash');
        console.log('get all:', rep.data);
        yield put({ type: 'SET_REP', payload: rep.data });
    } catch (err) {
        console.log('get all rep', err)
    }
}

function* addRep(action) {
    try {
        yield axios.post('/api/rep', action.payload)
        yield put({ type: 'FETCH_REP' })
    } catch (err) {
        console.log('rep POST', err);
    }
}

function* repSaga() {
    yield takeEvery('FETCH_REP', fetchRep)
    yield takeLatest('ADD_REP', addRep)
    yield takeEvery('FETCH_REP_FOR_DASH', fetchRepForDash)
}

export default repSaga;