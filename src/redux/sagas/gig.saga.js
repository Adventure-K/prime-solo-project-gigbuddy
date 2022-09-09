import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* fetchGigs() {
    try {
        const gigs = yield axios.get('/api/gigs');
        // console.log ('get all:', gigs.data);
        yield put({ type: 'SET_GIGS', payload: gigs.data });
    } catch(err) {
        console.log('get all gigs', err)
    }
}

function* addGig(action) {
    try {
        yield axios.post('/api/gigs', action.payload);
        console.log('posting gig', action.payload)
        yield put({ type: 'SET_GIGS' })
    } catch (err) {
        console.log('post gig', err)
    }
}

function* gigSaga() {
    yield takeEvery('FETCH_GIGS', fetchGigs)
    yield takeLatest('ADD_GIG', addGig)
}

export default gigSaga;