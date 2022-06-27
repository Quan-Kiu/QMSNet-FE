export const GET_POSTS_START = 'GET_POSTS_START';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const ADD_POST = 'ADD_POST';
export const POST_FAILED = 'POST_FAILED';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const TOGGLE_NOTIFY = 'TOGGLE_NOTIFY';
export const HANDLE_UPDATE_POST = 'HANDLE_UPDATE_POST';


export const POST_ACTION = 'POST_ACTION';
export const COMMENT = 'COMMENT';
export const SET_DETAIL_MODAL = 'SET_DETAIL_MODAL';

export const SET_POSTS = 'SET_POSTS';
export const SET_POST_DETAIL = 'SET_POST_DETAIL';
export const GET_POST_START = 'GET_POST_START';
export const GET_POST_SUCCESS = 'GET_POST_SUCCESS';






export const getPosts = (payload) => ({
    type: GET_POSTS_START,
    payload,
});
export const setDetailModal = (payload, params) => ({
    type: SET_DETAIL_MODAL,
    payload,
    params
});
export const updatePost = (payload) => ({
    type: HANDLE_UPDATE_POST,
    payload,
});
export const getPost = (payload) => ({
    type: GET_POST_START,
    payload,
});
export const getPostSuccess = (payload) => ({
    type: GET_POST_SUCCESS,
    payload,
});
export const setPosts = (payload) => ({
    type: SET_POSTS,
    payload,
});
export const setPostDetail = (payload) => ({
    type: SET_POST_DETAIL,
    payload,
});

export const getPostsSuccess = (payload) => ({
    type: GET_POSTS_SUCCESS,
    payload,
});

export const addPost = (payload) => ({
    type: ADD_POST,
    payload,
})
export const comment = (payload) => ({
    type: COMMENT,
    payload,
})

export const postFailed = () => ({
    type: POST_FAILED,
})
export const toggleModal = () => ({
    type: TOGGLE_MODAL,
})
export const toggleNotify = () => ({
    type: TOGGLE_NOTIFY,
})

export const postAction = (payload) => ({
    type: POST_ACTION,
    payload
})

