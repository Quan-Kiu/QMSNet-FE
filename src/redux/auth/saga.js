import { message } from "antd";
import { call, fork, put, takeEvery, all } from "redux-saga/effects";
import { authEndPoint, GET, PATCH, POST } from "../../constants";
import callAPi from "../../utils/apiRequest";
import { setItem, getItem, removeItem } from "../../utils/localStorage";
import { authFailed, CHANGE_PASSWORD, loginSuccess, LOGIN_START, LOGOUT, logoutSuccess, REFRESH_TOKEN, REGISTER, updateProfileSuccess, UPDATE_PROFILE } from "./action";


function* handleLogin() {
    yield takeEvery(LOGIN_START, function* (action) {
        try {
            const res = yield call(callAPi, authEndPoint.LOGIN, POST, action.payload);
            if (res && res.success) {
                yield fork(setItem, 'token', res.data.accessToken);
                yield put(loginSuccess(res.data));

            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(authFailed());
            message.error(error.message);
        }
    })

}
function* handleRegister() {
    yield takeEvery(REGISTER, function* (action) {
        try {
            const res = yield call(callAPi, authEndPoint.REGISTER, POST, action.payload);
            if (res && res.success) {
                message.success(res.message);
            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(authFailed());
            message.error(error.message);
        }
    })

}

function* handleRefreshToken() {
    yield takeEvery(REFRESH_TOKEN, function* () {
        try {
            const res = yield call(callAPi, authEndPoint.REFRESH_TOKEN, GET);
            if (res && res?.success) {
                yield fork(setItem, 'token', res.data.accessToken);
                yield put(loginSuccess(res.data));
            }
        } catch (error) {
            message.error(error.message);
        }
    })
}
function* handleLogout() {
    yield takeEvery(LOGOUT, function* () {
        yield fork(removeItem, 'token');
        yield put(logoutSuccess());
        yield call(callAPi, authEndPoint.LOGOUT, POST);
    })
}

function* handleUpdateProfile() {
    yield takeEvery(UPDATE_PROFILE, function* ({ payload }) {
        try {
            const res = yield call(callAPi, authEndPoint.UPDATE_PROFILE, PATCH, payload);
            if (res && res.success) {
                yield put(updateProfileSuccess(res.data));
                message.success(res.message);

            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(authFailed());
            message.error(error.message);
        }


    })
}
function* handleChangePassword() {
    yield takeEvery(CHANGE_PASSWORD, function* ({ payload }) {
        try {
            const res = yield call(callAPi, '/users/changepassword', PATCH, payload);
            if (res && res.success) {
                yield put(authFailed());
                message.success(res.message);

            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(authFailed());
            message.error(error.message);
        }


    })
}


function* rootSaga() {
    yield all([
        fork(handleLogin),
        fork(handleRefreshToken),
        fork(handleUpdateProfile),
        fork(handleLogout),
        fork(handleRegister),
        fork(handleChangePassword),
    ]);
}

export default rootSaga;