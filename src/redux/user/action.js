
export const SET_USER_DETAIL =  'SET_USER_DETAIL';
export const SET_USER_DETAIL_SUCCESS =  'SET_USER_DETAIL_SUCCESS';
export const GET_POST_USER_DETAIL =  'GET_POST_USER_DETAIL';
export const GET_POST_USER_DETAIL_SUCCESS =  'GET_POST_USER_DETAIL_SUCCESS';
export const SET_USER_SETTINGS =  'SET_USER_SETTINGS';
export const USER_FAILED =  'USER_FAILED';
export const USER_FOLLOW =  'USER_FOLLOW';

export const setUserDetail = (payload) => ({
    type: SET_USER_DETAIL,
    payload,
})
export const getPostUserDetail = (payload) => ({
    type: GET_POST_USER_DETAIL,
    payload,
})
export const getPostUserDetailSuccess = (payload) => ({
    type: GET_POST_USER_DETAIL_SUCCESS,
    payload,
})
export const setUserDetailSuccess = (payload) => ({
    type: SET_USER_DETAIL_SUCCESS,
    payload,
})
export const userFollow = (payload) => ({
    type: USER_FOLLOW,
    payload,
})


export const userFailed = (payload) => ({
    type: USER_FAILED,
    payload,
})
export const setUserSettings = (payload) => ({
    type: SET_USER_SETTINGS,
    payload,
})

