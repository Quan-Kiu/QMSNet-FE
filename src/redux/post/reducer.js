import { GET_POSTS_START, GET_POSTS_SUCCESS, POST_FAILED, SET_POSTS, TOGGLE_MODAL } from "./action";

const initialState = {
    data: null,
    showModal: false,
    status: {
        success: false,
    },
    loading: false,
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