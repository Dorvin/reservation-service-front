import * as constants from './constants';

/*Saga*/
function getAllMeetings() {
    return {
        type: constants.GET_ALL,
    }
}

function addMeeting(meeting) {
    return {
        type: constants.ADD,
        meeting,
    }
}

function deleteMeeting(id) {
    return {
        type: constants.DELETE,
        id,
    }
}

function updateMeeting(meeting) {
    return {
        type: constants.UPDATE,
        meeting,
    }
}

function login(user) {
    return {
        type: constants.LOGIN,
        user,
    }
}

/*Reducer*/
function refreshMeetings(meetings) {
    return {
        type: constants.REFRESH,
        meetings,
    }
}

function loginSuccess(userInfo) {
    return {
        type: constants.LOGIN_SUCCESS,
        username: userInfo.username,
        token: userInfo.token,
    }
}

function loginFail() {
    return {
        type: constants.LOGIN_FAIL,
    }
}

function logout() {
    return {
        type: constants.LOGOUT,
    }
}

function changeInputSinceWhen(value) {
    return {
        type: constants.CHANGE_INPUT_SINCEWHEN,
        value,
    }
}

function changeInputTilWhen(value) {
    return {
        type: constants.CHANGE_INPUT_TILWHEN,
        value,
    }
}

function changeInputUser(value) {
    return {
        type: constants.CHANGE_INPUT_USER,
        value,
    }
}

function changeInputPassword(value) {
    return {
        type: constants.CHANGE_INPUT_PASSWORD,
        value,
    }
}

function modeUpdate(id) {
    return {
        type: constants.MODE_UPDATE,
        id,
    }
}

function modeAdd() {
    return {
        type: constants.MODE_ADD,
    }
}

export default {
    getAllMeetings,
    addMeeting,
    deleteMeeting,
    updateMeeting,
    login,
    refreshMeetings,
    loginSuccess,
    loginFail,
    logout,
    changeInputSinceWhen,
    changeInputTilWhen,
    changeInputUser,
    changeInputPassword,
    modeUpdate,
    modeAdd,
};
