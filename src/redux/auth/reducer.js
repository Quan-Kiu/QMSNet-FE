import appActions, { AUTH_FAILED, LOGIN_START, LOGIN_SUCCESS, LOGOUT_SUCCESS, UPDATE_PROFILE, UPDATE_PROFILE_SUCCESS } from "./action";

const initialState = {
    user: null,
    loading: false,
    isLogin: false,
    status: {
        success: false,
    }
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
                isLogin: true,
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                user: null,
                token: null,
                loading: false,
                isLogin: false,
            }
        case AUTH_FAILED:
            return {
                    ...state,
                    loading: false
                }
        case UPDATE_PROFILE:
            return {
                    ...state,
                    loading: true
                }
                
        case UPDATE_PROFILE_SUCCESS:
            return {
                    ...state,
                    user: action.payload,
                    status: {
                        success: true,
                    },
                    loading: false
                }
                    
       
        default:
            return state;
    }
}

export const authSelector = (state)=>state.auth;

export default authReducer;



