import { message } from "antd";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { GET, PATCH, POST, postEndpoint, profileEndpoint } from "../../constants";
import callAPi from "../../utils/apiRequest";
import { updateProfileSuccess } from "../auth/action";
import { getPosts } from "../post/action";
import { handleRealtime } from "../root-saga";
import { getPostUserDetailSuccess, getUserRequests, getUserRequestsSuccess, getUserSuggestions, getUserSuggestionsSuccess, GET_POST_USER_DETAIL, GET_USER_SUGGESTIONS, setUserDetailSuccess, SET_USER_DETAIL, SET_USER_SETTINGS, userFailed, USER_FOLLOW } from "./action";


function* handlegetUserDetail() {
    yield takeEvery(SET_USER_DETAIL, function* ({ payload }) {
        try {
            const res = yield call(callAPi, profileEndpoint.USERS + `/${payload._id}`, GET);
            if (res && res.success) {
                yield put(setUserDetailSuccess(res.data));

            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(userFailed());
            message.error(error.message);
        }
    })

}
function* handleGetUserSuggestions() {
    yield takeEvery(GET_USER_SUGGESTIONS, function* ({ payload }) {
        try {
            const res = yield call(callAPi, profileEndpoint.USERS + `/suggestions`, GET);
            if (res && res.success) {
                yield put(getUserSuggestionsSuccess(res.data));

            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(userFailed());
            message.error(error.message);
        }
    })

}
function* handleGetUserRequest() {
    yield takeEvery(GET_USER_SUGGESTIONS, function* ({ payload }) {
        try {
            const res = yield call(callAPi, profileEndpoint.USERS + `/requests`, GET);
            if (res && res.success) {
                yield put(getUserRequestsSuccess(res.data));

            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(userFailed());
            message.error(error.message);
        }
    })

}

function* handleUserFollow() {
    yield takeEvery(USER_FOLLOW, function* ({ payload }) {
        try {
            const res = yield call(callAPi, profileEndpoint.USERS + `/${payload.path}`, PATCH);
            if (res && res.success) {
                yield put(getUserRequests())
                yield put(getUserSuggestions())
                yield fork(handleRealtime, "emit", "follow", res?.data?.follower);
                yield put(updateProfileSuccess(res?.data?.following))
                if (!payload?.simple) {
                    yield put(setUserDetailSuccess(res?.data?.follower))
                }
            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(userFailed());
            message.error(error.message);
        }
    })

}
function* handleGetPostUserDetail() {
    yield takeEvery(GET_POST_USER_DETAIL, function* ({ payload }) {
        try {
            const res = yield callAPi(postEndpoint.POSTS + `getByUser/${payload}`, GET);
            if (res && res.success) {
                yield put(getPostUserDetailSuccess({ ...res.data, user_id: payload }));

            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(userFailed());
            message.error(error.message);
        }
    })

}
function* handleSetUserSettings() {
    yield takeEvery(SET_USER_SETTINGS, function* ({ payload }) {
        try {
            const res = yield call(callAPi, profileEndpoint.USERS + '/userSettings', POST, payload);
            if (res && res.success) {
                yield put(updateProfileSuccess(res.data));
                if (payload?.PRIVACY) {
                    message.success(res.message);
                }

            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(userFailed());
            message.error(error.message);
        }
    })

}


function* rootSaga() {
    yield all([
        fork(handlegetUserDetail),
        fork(handleSetUserSettings),
        fork(handleGetPostUserDetail),
        fork(handleUserFollow),
        fork(handleGetUserSuggestions),
        fork(handleGetUserRequest)
    ]);
}

export default rootSaga;