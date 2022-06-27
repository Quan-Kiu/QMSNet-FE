import { message } from "antd";
import { all, call, fork, put, takeEvery, select, takeLatest, delay } from 'redux-saga/effects';
import { GET, PATCH, POST, postEndpoint } from "../../constants";
import callAPi from "../../utils/apiRequest";
import { handleRealtime } from "../root-saga";
import { ADD_POST, COMMENT, getPosts, getPostsSuccess, getPostSuccess, GET_POSTS_START, GET_POST_START, HANDLE_UPDATE_POST, postFailed, POST_ACTION, setPostDetail, setPosts, toggleModal, toggleNotify, updatePost } from "./action";
import { PostSelector } from "./reducer";


function* handleGetPosts() {
    yield takeLatest(GET_POSTS_START, function* ({ payload }) {

        try {
            const { page } = yield select(state => state.post)
            const res = yield callAPi(postEndpoint.POSTS + `?page=${(Number(page) + 1) || 1}&limit=20`, GET);
            if (res && res.success) {
                yield put(getPostsSuccess(res.data));

            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(postFailed());
            message.error(error.message);
        }
    })

}
function* handleGetPost() {
    yield takeEvery(GET_POST_START, function* ({ payload }) {
        try {
            const res = yield callAPi(`${postEndpoint.POSTS}${payload}`, GET);
            if (res && res.success) {
                yield put(getPostSuccess(res.data));

            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(postFailed());
            message.error(error.message);
        }
    })

}
function* handleAddPost() {
    yield takeEvery(ADD_POST, function* (action) {
        try {
            const res = yield callAPi(postEndpoint.POSTS, POST, action.payload);
            if (res && res.success) {
                yield put(toggleModal());
                yield put(toggleNotify());
                yield call(message.success, res.message)

            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(postFailed());
            message.error(error.message);
        }
    })

}

export function* handleUpdatePost() {
    yield takeEvery(HANDLE_UPDATE_POST, function* ({ payload }) {
        const { data } = yield select(PostSelector);
        if (data.length > 0) {
            const postsClone = [...data];
            const index = postsClone.findIndex(post => post._id === payload._id);
            if (index !== -1) {
                postsClone.splice(index, 1, payload);
                yield put(setPosts(postsClone));
            }
        }
    })
}


function* handlePostAction() {
    yield takeEvery(POST_ACTION, function* ({ payload }) {
        try {
            const res = yield callAPi(postEndpoint.POSTS + `${payload.id}/${payload.type}`, PATCH);
            const postDetail = yield select(state => state.post)
            if (res && res.success) {
                if (postDetail?._id === payload.id || payload.isPostDetail) {
                    yield put(setPostDetail(res.data))
                }
                if (payload.type === 'like') {

                    yield fork(handleRealtime, 'emit', 'likePost', res.data);
                }
                yield put(updatePost(res.data))

            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(postFailed());
            message.error(error.message);
        }
    })

}
function* handleComment() {
    yield takeEvery(COMMENT, function* ({ payload }) {
        try {
            const res = yield callAPi('/comment/' + `${payload.link || ''}`, payload.method, payload?.data || {});
            if (res && res.success) {
                console.log(res);
                if (payload.isPostDetail) {
                    yield put(setPostDetail(res.data.post))
                }
                if (payload.link.match('/like')) {
                    yield fork(handleRealtime, 'emit', 'likeCommentPost', res.data.comment);
                }
                if (res.data.comment?.reply) {
                    yield fork(handleRealtime, 'emit', 'replyCommentPost', res.data.comment);
                }
                yield fork(handleRealtime, 'emit', 'commentPost', res.data.post);
                yield put(updatePost(res.data.post))

            } else {
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(postFailed());
            message.error(error.message);
        }
    })

}


export default function* rootSaga() {
    yield all([
        fork(handleGetPosts),
        fork(handleAddPost),
        fork(handlePostAction),
        fork(handleComment),
        fork(handleGetPost),
        fork(handleUpdatePost)
    ])
}

