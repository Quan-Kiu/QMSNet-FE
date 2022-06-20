import { GET_POST_USER_DETAIL, GET_POST_USER_DETAIL_SUCCESS, SET_USER_DETAIL, SET_USER_DETAIL_SUCCESS, USER_FAILED, USER_FOLLOW } from "./action";

const initialState = {
    userDetail: null,
    loading: false,
    postLoading: false,
    status: {
        success: false,
    }
}

const userReducer = (state= initialState,action)=>{
    switch (action.type){
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
        case USER_FAILED:
            return {
                ...state,
                loading: false,
                postLoading: false
            }
        case SET_USER_DETAIL_SUCCESS:
            return {
                ...state,
                status: {
                    success: true
                },
                userDetail: action.payload,
                loading: false,
                followLoading:false,
            }
        case GET_POST_USER_DETAIL_SUCCESS:
            return {
                ...state,
                postUserDetail: action.payload,
                postLoading: false,
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

export const userSelector = (state)=>state.user;

export default userReducer;



