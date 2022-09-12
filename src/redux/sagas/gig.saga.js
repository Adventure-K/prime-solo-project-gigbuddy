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
        const newGigRep = yield axios.post('/api/gigs', action.payload);
        console.log('posting gig', action.payload)
        yield put({ type: 'ADD_NEW_GIG_REP', payload: newGigRep.data});
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

<<<<<<< HEAD
function* deleteGig(action) {
    let id = action.payload
    try {
        yield axios.delete(`/api/gigs/${id}`);
        console.log('delete gig #', id);
        yield put({ type: 'FETCH_GIGS' });
    } catch (err) {
        console.log('delete gig', err);
=======
function* addNewGigRep(action) {
    try {
        yield axios.post('/api/gigs/newrep', action.payload);
        console.log(`posting new gig's rep`)
        yield put({ type: 'FETCH_GIGS' })
    } catch (err) {
        console.log('post new gig rep', err);
>>>>>>> postrepwithgig
    }
}

function* gigSaga() {
    yield takeEvery('FETCH_GIGS', fetchGigs)
    yield takeLatest('ADD_GIG', addGig)
    yield takeLatest('FETCH_ACTIVE_GIG_REP', fetchActiveGigRep)
<<<<<<< HEAD
    yield takeLatest('DELETE_GIG', deleteGig)
=======
    yield takeLatest('ADD_NEW_GIG_REP', addNewGigRep)
>>>>>>> postrepwithgig
}

export default gigSaga;