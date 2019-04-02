import {combineReducers} from 'redux';
import * as constants from './constants';

const initialMeetingsState = {
    data: [],
    inputSinceWhen: '',
    inputTilWhen: '',
    updating: false,
    updatingId: -1,
};

function meetings(state = initialMeetingsState, action) {
    switch (action.type) {
        case constants.REFRESH:
            return {
                ...state,
                data: action.meetings,
            };
        case constants.CHANGE_INPUT_SINCEWHEN:
            return {
                ...state,
                inputSinceWhen: action.value,
            };
        case constants.CHANGE_INPUT_TILWHEN:
            return {
                ...state,
                inputTilWhen: action.value,
            };
        case constants.MODE_ADD:
            return {
                ...state,
                updating: false,
                updatingId: -1,
            };
        case constants.MODE_UPDATE:
            return {
                ...state,
                updating: true,
                updatingId: action.id,
            };
        default:
            return state;
    }
}

const initialAuthState = {
    login: false,
    username: '',
    token: '',
    inputUser: '',
    inputPassword: '',
};

function auth(state = initialAuthState, action) {
    switch (action.type) {
        case constants.LOGIN_SUCCESS:
            return {
                ...state,
                login: true,
                username: action.username,
                token: action.token,
            };
        case constants.LOGIN_FAIL:
            return state;
        case constants.LOGOUT:
            return {
                ...state,
                login: false,
                username: '',
                token: '',
            };
        case constants.CHANGE_INPUT_USER:
            return {
                ...state,
                inputUser: action.value,
            };
        case constants.CHANGE_INPUT_PASSWORD:
            return {
                ...state,
                inputPassword: action.value,
            };
        default:
            return state;
    }
}

export default combineReducers({
    meetings,
    auth,
})
