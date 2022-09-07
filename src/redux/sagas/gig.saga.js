import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* fetchGigs() {
    try {
        const gigs = yield axios.get('/api/gigs');
        console.log ('get all:', gigs.data);
        yield put({ type: 'SET_GIGS', payload: gigs.data });
    } catch(err) {
        console.log('get all gigs', err)
    }
}

function* gigSaga() {
    yield takeEvery('FETCH_GIGS', fetchGigs)}


export default gigSaga;