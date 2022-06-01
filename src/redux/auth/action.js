const DOCUMENT = 'AUTH_';

export const LOGIN_START = DOCUMENT + 'LOGIN_START';
export const LOGIN_SUCCESS = DOCUMENT + 'LOGIN_SUCCESS';
export const AUTH_FAILED = DOCUMENT + 'AUTH_FAILED';
export const SET_AUTH_MODAL = DOCUMENT + 'SET_AUTH_MODAL';


export const loginStart = (payload) => ({
    type: LOGIN_START,
    payload,
})
export const loginSuccess = (payload) => ({
    type: LOGIN_SUCCESS,
    payload,
})
export const authFailed = (payload) => ({
    type: AUTH_FAILED,
    payload,
})
export const setAuthModal = (payload) => ({
    type: SET_AUTH_MODAL,
    payload,
})