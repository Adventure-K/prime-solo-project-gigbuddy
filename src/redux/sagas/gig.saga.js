import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* fetchGigs() {
    try {
        const gigs = yield axios.get('/api/gigs');
        // console.log ('get all:', gigs.data);
        yield put({ type: 'SET_GIGS', payload: gigs.data });
    } catch (err) {
        console.log('get all gigs', err)
    }
}

function* addGig(action) {
    try {
        const newGigRep = yield axios.post('/api/gigs', action.payload);
        console.log('posting gig', action.payload)
        yield put({ type: 'ADD_NEW_GIG_REP', payload: newGigRep.data });
    } catch (err) {
        console.log('post gig', err)
    }
}

function* fetchActiveGigRep(action) {
    let id = action.payload
    try {
        const gigRep = yield axios.get(`/api/gigs/${id}`);
        console.log('getting rep for gig #', id)
        console.log(gigRep.data);
        yield put({ type: 'SET_ACTIVE_GIG_REP', payload: gigRep.data })
    } catch (err) {
        console.log('active gig rep GET', err)
    }
}

function* deleteGig(action) {
    let id = action.payload
    try {
        yield axios.delete(`/api/gigs/${id}`);
        console.log('delete gig #', id);
        yield put({ type: 'FETCH_GIGS' });
    } catch (err) {
        console.log('delete gig', err);
    }
}

function* addNewGigRep(action) {
    try {
        yield axios.post('/api/gigs/newrep', action.payload);
        console.log(`posting new gig's rep`)
        yield put({ type: 'FETCH_GIGS' })
    } catch (err) {
        console.log('post new gig rep', err);
    }
}

function* updateGig(action) {
    try {
        yield axios.put('/api/gigs/update', action.payload);
        console.log('updating gig #', action.payload.id)
        yield put({ type: 'FETCH_GIGS' })
    } catch (err) {
        console.log('update gig', err);
    }
}

function* updateGigRep(action) {
    console.log('in updateGigRep saga');
    let repUpdatePkg = action.payload;
    // const gigId = action.payload.id;
    try {
        yield axios.delete('api/gigs/updaterep', action.payload.id);
        console.log('axios.delete complete')
        yield put({ type: 'POST_UPDATED_REP', payload: repUpdatePkg })
        console.log('POST_UPDATED_REP dispatched')
    } catch (err) {
        console.log('delete old gig rep', err)
    }
}

function* postUpdatedRep(action) {
    try {
        yield axios.post('api/gigs/updaterep', action.payload)
        yield put({ type: 'FETCH_GIGS' })
    } catch (err) {
        console.log('post updated gig rep', err)
    }
}

// function* deleteGigForEdit(action) {
//     try {
//         const updatedGig = action.payload;
//         const gigId = action.payload.id;
//         yield axios.delete('/api/gigs/edit', gigId);
//         yield put ({ type: 'POST_GIG_FOR_EDIT', payload: updatedGig })
//     } catch (err) {
//         console.log('delete gig for edit', err)
//     }
// }

// function* postGigForEdit(action) {
//     try {
//         yield axios.post('/api/gigs/edit', action.payload);
//         yield put ({ type: 'FETCH_GIGS' });
//     } catch (err) {
//         console.log('post gig for edit', err);
//     }
// }

function* gigSaga() {
    yield takeEvery('FETCH_GIGS', fetchGigs)
    yield takeLatest('ADD_GIG', addGig)
    yield takeLatest('FETCH_ACTIVE_GIG_REP', fetchActiveGigRep)
    yield takeLatest('DELETE_GIG', deleteGig)
    yield takeLatest('ADD_NEW_GIG_REP', addNewGigRep)
    yield takeLatest('UPDATE_GIG', updateGig)
    yield takeLatest('UPDATE_GIG_REP', updateGigRep)
    yield takeEvery('POST_UPDATED_REP', postUpdatedRep)
    // yield takeLatest('DELETE_GIG_FOR_EDIT', deleteGigForEdit)
    // yield takeEvery('POST_GIG_FOR_EDIT', postGigForEdit)
}

export default gigSaga;