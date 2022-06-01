import { message } from "antd";
import { call, fork, put, takeEvery } from "redux-saga/effects";
import { authEndPoint, POST } from "../../constants";
import callAPi from "../../utils/apiRequest";
import { setItem } from "../../utils/localStorage";
import { setAppLoading } from "../app/action";
import { authFailed, loginSuccess, LOGIN_START, setAuthModal } from "./action";

function *handleLogin(action){
    try {
        const res = yield call(callAPi,authEndPoint.LOGIN,POST,action.payload);
        if(res && res.success){
            yield fork(setItem,'token',res.token);
            yield fork(setItem,'profile',res.user);
            yield put(loginSuccess(res));
            yield put(setAuthModal(null));
            yield put(setAppLoading({
                path: '/',
                duration: 3,
            }));
        }
    } catch (error) {
        yield put(authFailed());
        message.error(error.message);
    }
} 



function *rootSaga(){
    yield takeEvery(LOGIN_START,handleLogin);
}

export default rootSaga;