import { AUTH_FAILED, LOGIN_START, LOGIN_SUCCESS, SET_AUTH_MODAL } from "./action";

const initialState = {
    user: null,
    loading: false,
    authModal: null,
}

const authReducer = (state= initialState,action)=>{
    switch (action.type){
        case LOGIN_START:
            return {
                ...state,
                loading: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                loading: false,
            }
        case AUTH_FAILED:
            return {
                    ...state,
                    loading: false
                }
        case SET_AUTH_MODAL:
            return {
                ...state,
                authModal: action.payload
            }
        default:
            return state;
    }
}

export const authSelector = (state)=>state.auth;

export default authReducer;



