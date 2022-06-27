import { message } from "antd";
import { all, call, fork, put, takeEvery, select, takeLatest } from "redux-saga/effects";
import { GET, POST } from "../../constants";
import callAPi from "../../utils/apiRequest";
import { handleRealtime } from "../root-saga";
import { ADD_MESSAGE, conversationFailed, getConversationSuccess, getMessageSuccess, GET_CONVERSATION, GET_MESSAGE, openConversationSuccess, OPEN_CONVERSATION, updateConversation } from "./action";


function* handleAddMessage() {
    yield takeEvery(ADD_MESSAGE, function* ({ payload }) {
        try {
            delete payload?._id;
            const res = yield callAPi(`message`, POST, payload);
            if (res && res.success) {
                yield fork(handleRealtime, 'emit', 'message', res.data);
                yield put(updateConversation(res.data, payload?.fakeId))

            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(conversationFailed());
            message.error(error.message);
        }
    })

}

function* handleGetConversation() {
    yield takeEvery(GET_CONVERSATION, function* () {
        try {
            const res = yield call(callAPi, `conversations`, GET);
            if (res && res.success) {
                yield put(getConversationSuccess(res.data))
            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(conversationFailed());
            message.error(error.message);
        }
    })

}

function* handleGetMessage() {
    yield takeLatest(GET_MESSAGE, function* ({ payload }) {
        try {

            const res = yield call(callAPi, `message/${payload?._id}?page=${(Number(payload?.pagination?.page) + 1 || 1)}&limit=10`, GET);
            if (res && res.success) {
                const { conversations } = yield select(state => state.conversation)
                const { user } = yield select(state => state.auth)
                const index = conversations.findIndex((cv) => cv._id === res.data?._id);
                if (index !== -1) {
                    yield put(getMessageSuccess({ messages: res.data?.messages, index, pagination: res.data?.pagination, user }))
                }
                yield call(callAPi, `message/updateconversation/${res.data._id}`, GET);
            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(conversationFailed());
            message.error(error.message);
        }
    })

}

function* openConversation() {
    yield takeEvery(OPEN_CONVERSATION, function* ({ payload }) {
        const { conversations, totalActive } = yield select(state => state.conversation)
        const toggle = conversations.findIndex((cv) => (cv._id === payload || cv.fakeId === payload));
        console.log(toggle);
        const cloneCv = [...conversations];
        let newTotal = totalActive;
        console.log(newTotal)
        if (toggle !== -1) {
            newTotal = newTotal + 1;
            cloneCv[toggle].isOpen = newTotal;
            yield put(openConversationSuccess({ conversations: cloneCv, totalActive: newTotal }))
        }

    })
}




function* rootSaga() {
    yield all([
        fork(handleAddMessage),
        fork(handleGetMessage),
        fork(handleGetConversation),
        fork(openConversation),
    ]);
}

export default rootSaga;