import { all, fork } from 'redux-saga/effects';
import authSaga from './auth/saga';
import postSaga from './post/saga';
import userSaga from './user/saga';
import conversationSaga from './conversation/saga';

export default function* rootSaga() {
    yield all([
        fork(authSaga),
        fork(postSaga),
        fork(userSaga),
        fork(conversationSaga)
    ])
}
