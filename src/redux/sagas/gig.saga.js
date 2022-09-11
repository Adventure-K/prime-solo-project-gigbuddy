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
        yield put({ type: 'FETCH_GIGS' })
    } catch (err) {
        console.log('post gig', err)
    }
}

function* fetchActiveGigRep(action) {
    let id = action.payload
    try {
        const gigRep = yield axios.get(`/api/gigs/${id}`);
        console.log('getting rep for gig #', id)
        yield put({ type: 'SET_ACTIVE_GIG_REP', payload: gigRep.data })
    } catch (err) {
        console.log('active gig rep GET', err)
    }
}

function* gigSaga() {
    yield takeEvery('FETCH_GIGS', fetchGigs)
    yield takeLatest('ADD_GIG', addGig)
    yield takeLatest('FETCH_ACTIVE_GIG_REP', fetchActiveGigRep)
}

export default gigSaga;