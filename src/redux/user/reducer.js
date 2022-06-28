import { SET_POSTS_USER } from "../post/action";
import { GET_POST_USER_DETAIL, GET_POST_USER_DETAIL_SUCCESS, GET_USER_REQUESTS, GET_USER_REQUESTS_SUCCESS, GET_USER_SUGGESTIONS, GET_USER_SUGGESTIONS_SUCCESS, SET_USER_DETAIL, SET_USER_DETAIL_SUCCESS, SET_USER_SETTINGS, USER_FAILED, USER_FOLLOW } from "./action";

const initialState = {
    userDetail: null,
    loading: false,
    postLoading: false,
    suggestionLoading: false,
    suggestionLoading: false,
    suggestions: null,
    status: {
        success: false,
    }
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DETAIL:
            return {
                ...state,
                loading: true
            }
        case GET_POST_USER_DETAIL:
            return {
                ...state,
                postLoading: true
            }
        case GET_USER_SUGGESTIONS:
            return {
                ...state,
                suggestionLoading: true
            }
        case GET_USER_SUGGESTIONS_SUCCESS:
            return {
                ...state,
                suggestions: action.payload,
                suggestionLoading: false
            }
        case GET_USER_REQUESTS:
            return {
                ...state,
                suggestionLoading: true
            }
        case GET_USER_REQUESTS_SUCCESS:
            return {
                ...state,
                requests: action.payload,
                suggestionLoading: false
            }
        case SET_POSTS_USER:
            return {
                ...state,
                postUserDetail: action.payload,
            }

        case USER_FAILED:
            return {
                ...state,
                loading: false,
                postLoading: false,
                suggestionLoading: false,
            }
        case SET_USER_DETAIL_SUCCESS:
            return {
                ...state,
                status: {
                    success: true
                },
                userDetail: action.payload,
                loading: false,
                followLoading: false,
            }
        case GET_POST_USER_DETAIL_SUCCESS:
            return {
                ...state,
                postUserDetail: action.payload,
                postLoading: false,
            }
        case SET_USER_SETTINGS:
            return {
                ...state,
                loading: true,
            }

        case USER_FOLLOW:
            return {
                ...state,
                followLoading: true,

            }

        default:
            return state;
    }
}

export const userSelector = (state) => state.user;

export default userReducer;



