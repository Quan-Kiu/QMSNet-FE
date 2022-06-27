import { all, fork, put, select, takeEvery } from "redux-saga/effects";
import { GET } from "../../constants";
import { message } from 'antd'
import callAPi from "../../utils/apiRequest";
import { postFailed } from "../post/action";
import { getNotify, getNotifySuccess, GET_NOTIFY, notifyFailed, READ_NOTIFY, READ_NOTIFY_ALL } from "./action";

function* handleGetNotifies() {
    yield takeEvery(GET_NOTIFY, function* ({ payload }) {

        try {
            const { page } = yield select(state => state.notify)
            const res = yield callAPi(`notify?page=${(Number(page) + 1) || 1}&limit=20`, GET);
            if (res && res.success) {
                yield put(getNotifySuccess(res.data));

            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(notifyFailed());
            message.error(error.message);
        }
    })

}
function* handleReadNotifies() {
    yield takeEvery(READ_NOTIFY, function* ({ payload }) {

        try {
            const res = yield callAPi(`notify/${payload}`, GET);
            if (res && res.success) {
                yield put(getNotify());

            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(notifyFailed());
            message.error(error.message);
        }
    })

}
function* handleReadAllNotifies() {
    yield takeEvery(READ_NOTIFY_ALL, function* ({ payload }) {

        try {
            const res = yield callAPi(`notify/readAll`, GET);
            if (res && res.success) {
                yield put(getNotify());
            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(notifyFailed());
            message.error(error.message);
        }
    })

}

function* rootSaga() {
    yield all([
        fork(handleGetNotifies),
        fork(handleReadNotifies),
        fork(handleReadAllNotifies),
    ])
}

export default rootSaga;