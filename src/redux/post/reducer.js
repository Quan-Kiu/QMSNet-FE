import { GET_POSTS_START, GET_POSTS_SUCCESS, GET_POST_START, GET_POST_SUCCESS, POST_FAILED, SET_POSTS, SET_POST_DETAIL, TOGGLE_MODAL } from "./action";

const initialState = {
    data: null,
    showModal: false,
    status: {
        success: false,
    },
    postDetailLoading: false,
    loading: false,
    postDetail: null,
}

const PostReducer = (state=initialState,action) =>{
    switch (action.type) {
        case SET_POSTS:
            return {
                ...state,
                data: {
                    ...state.data,
                    posts: action.payload
                },
            }
        case GET_POSTS_START:
            return {
                ...state,
                loading: true,
            }
        case GET_POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
            }
        case GET_POST_START:
            return {
                ...state,
                postDetailLoading: true,
            }
        case GET_POST_SUCCESS:
            return {
                ...state,
                postDetailLoading: false,
                postDetail: action.payload,
            }
        case SET_POST_DETAIL:
            return {
                ...state,
                postDetail: action.payload,
            }

        case POST_FAILED:
            return {
                ...state,
                loading: false,
            }
        case TOGGLE_MODAL:
            return {
                ...state,
                showModal: !state.showModal,
            }
        
        default:
            return state;
    }
}

export const PostSelector = (state=>state.post);


export default PostReducer;