const DOCUMENT = 'AUTH_';

export const LOGIN_START = DOCUMENT + 'LOGIN_START';
export const LOGIN_SUCCESS = DOCUMENT + 'LOGIN_SUCCESS';
export const REGISTER = DOCUMENT + 'REGISTER';
export const AUTH_FAILED = DOCUMENT + 'FAILED';

export const REFRESH_TOKEN = DOCUMENT + 'REFRESH_TOKEN';
export const LOGOUT = DOCUMENT + 'LOGOUT';
export const LOGOUT_SUCCESS = DOCUMENT + 'LOGOUT_SUCCESS';

export const UPDATE_PROFILE = DOCUMENT + 'UPDATE_PROFILE';
export const CHANGE_PASSWORD = DOCUMENT + 'CHANGE_PASSWORD';
export const UPDATE_PROFILE_SUCCESS = DOCUMENT + 'UPDATE_PROFILE_SUCCESS';


export const loginStart = (payload) => ({
    type: LOGIN_START,
    payload,
})
export const loginSuccess = (payload) => ({
    type: LOGIN_SUCCESS,
    payload,
})
export const register = (payload) => ({
    type: REGISTER,
    payload,
})
export const authFailed = (payload) => ({
    type: AUTH_FAILED,
    payload,
})
export const refreshToken = () => ({
    type: REFRESH_TOKEN,
})

export const updateProfile = (payload) => ({
    type: UPDATE_PROFILE,
    payload
})
export const changePassword = (payload) => ({
    type: CHANGE_PASSWORD,
    payload
})

export const updateProfileSuccess = (payload) => ({
    type: UPDATE_PROFILE_SUCCESS,
    payload
})

export const logout = (payload) => ({
    type: LOGOUT,
})
export const logoutSuccess = (payload) => ({
    type: LOGOUT_SUCCESS,
})
