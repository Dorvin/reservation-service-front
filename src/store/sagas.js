import {
    all,
    call,
    put,
    takeLatest,
    select,
    takeEvery,
} from 'redux-saga/effects';
import actions from './actions';
import * as constants from './constants';

function* getAllMeetingsSaga() {
    let meetingsData;
    const option = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
        mode: 'cors',
    };
    try {
        const response = yield call(fetch, 'http://127.0.0.1:8000/meetings/', option);
        if (!response.ok) {
            alert('fetch failed');
            return;
        }
        meetingsData = yield response.json();
    } catch (e) {
        alert('fetch failed: ' + e);
        return;
    }
    yield put(actions.refreshMeetings(meetingsData));
}

function* addMeetingSaga(action) {
    const state = yield select();
    const option = {
        method: 'POST',
        withCredentials: true,
        //credentials: 'include',
        headers: new Headers({
            'Authorization': `Token ${state.auth.token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
        mode: 'cors',
    };
    option.body = JSON.stringify(action.meeting);
    try {
        const response = yield call(fetch, 'http://127.0.0.1:8000/meetings/', option);
        if (!response.ok) {
            alert('post failed!');
            return;
        }
    } catch (e) {
        alert('post failed ' + e);
        return;
    }
    yield call(getAllMeetingsSaga);
}

function* deleteMeetingSaga(action) {
    const state = yield select();
    const option = {
        method: 'DELETE',
        withCredentials: true,
        //credentials: 'include',
        headers: new Headers({
            'Authorization': `Token ${state.auth.token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
        mode: 'cors',
    };
    try {
        const response = yield call(fetch, `http://127.0.0.1:8000/meetings/${action.id}/`, option);
        if (!response.ok) {
            alert('delete failed! it is not your reservation');
            return;
        }
    } catch (e) {
        alert('delete failed ' + e);
        return;
    }
    yield call(getAllMeetingsSaga);
}

function* updateMeetingSaga(action) {
    console.log('updating');
    console.log(action.meeting);
    const state = yield select();
    const option = {
        method: 'PUT',
        withCredentials: true,
        //credentials: 'include',
        headers: new Headers({
            'Authorization': `Token ${state.auth.token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
        mode: 'cors',
    };
    option.body = JSON.stringify(action.meeting);
    try {
        const response = yield call(fetch, `http://127.0.0.1:8000/meetings/${action.meeting.id}/`, option);
        if (!response.ok) {
            alert('update failed');
            return;
        }
    } catch (e) {
        alert('update failed ' + e);
        return;
    }
    yield call(getAllMeetingsSaga);
}

function* loginSaga(action) {
    let userInfo;
    const option = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
        mode: 'cors',
    };
    option.body = JSON.stringify(action.user);
    try {
        const response = yield call(fetch, 'http://127.0.0.1:8000/api-token-auth/', option);
        if (!response.ok) {
            alert('login failed! there is reservation');
            return;
        }
        userInfo = yield response.json();
    } catch (e) {
        alert('login failed ' + e);
        return;
    }
    userInfo.username = action.user.username;
    yield put(actions.loginSuccess(userInfo));
    yield call(getAllMeetingsSaga);
}

export default function* rootSaga(api) {
    yield all([
        takeLatest(constants.GET_ALL, getAllMeetingsSaga),
        takeEvery(constants.ADD, addMeetingSaga),
        takeEvery(constants.DELETE, deleteMeetingSaga),
        takeEvery(constants.UPDATE, updateMeetingSaga),
        takeLatest(constants.LOGIN, loginSaga),
    ]);
}
