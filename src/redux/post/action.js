export const GET_POSTS_START = 'GET_POSTS_START';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const ADD_POST = 'ADD_POST';
export const POST_FAILED = 'POST_FAILED';
export const TOGGLE_MODAL = 'TOGGLE_MODAL';


export const POST_ACTION = 'POST_ACTION';
export const COMMENT = 'COMMENT';

export const SET_POSTS = 'SET_POSTS';




export const getPosts = (payload)=>({
    type: GET_POSTS_START,
    payload,
});
export const setPosts = (payload)=>({
    type: SET_POSTS,
    payload,
});

export const getPostsSuccess = (payload)=>({
    type: GET_POSTS_SUCCESS,
    payload,
});

export const addPost = (payload)=>({
    type: ADD_POST,
    payload,
})
export const comment = (payload)=>({
    type: COMMENT,
    payload,
})

export const postFailed = ()=>({
    type: POST_FAILED,
})
export const toggleModal = ()=>({
    type: TOGGLE_MODAL,
})

export const postAction = (payload)=>({
    type: POST_ACTION,
    payload
})

