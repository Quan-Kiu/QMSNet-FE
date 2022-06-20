import { message } from "antd";
import { all, call, fork, put, takeEvery,select,takeLatest,delay } from 'redux-saga/effects';
import { GET, PATCH, POST, postEndpoint } from "../../constants";
import callAPi from "../../utils/apiRequest";
import { ADD_POST, COMMENT, getPosts, getPostsSuccess, getPostSuccess, GET_POSTS_START, GET_POST_START, postFailed, POST_ACTION, setPostDetail, setPosts, toggleModal, toggleNotify } from "./action";
import { PostSelector } from "./reducer";


function *handleGetPosts(){
    yield takeLatest(GET_POSTS_START, function*({payload}){

        try {
            const {page } = yield select(state=>state.post)
            const res = yield call(callAPi,postEndpoint.POSTS+`?page=${(Number(page)+1)||1}&limit=20`,GET);
            if(res && res.success){
                yield put(getPostsSuccess(res.data));
              
            }else{
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(postFailed());
            message.error(error.message);
        }
    })
   
} 
function *handleGetPost(){
    yield takeEvery(GET_POST_START, function*({payload}){
        try {
            const res = yield call(callAPi,`${postEndpoint.POSTS}${payload}`,GET);
            if(res && res.success){
                yield put(getPostSuccess(res.data));
              
            }else{
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(postFailed());
            message.error(error.message);
        }
    })
   
} 
function *handleAddPost(){
    yield takeEvery(ADD_POST, function*(action){
        try {
            const res = yield call(callAPi,postEndpoint.POSTS,POST,action.payload);
            if(res && res.success){
                    yield put(toggleModal());
                    yield put(toggleNotify());
                    yield call(message.success, res.message)
              
            }else{
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(postFailed());
            message.error(error.message);
        }
    })
   
} 

function * handleUpdatePost(payload){
    const {data} = yield select(PostSelector);
    if(data.total>0){
        const postsClone = [...data.posts];
        const index = postsClone.findIndex(post => post._id === payload._id);
        if(index !== -1){
            postsClone.splice(index, 1,payload);
            yield put(setPosts(postsClone));
        } 
    }


}

function *handlePostAction(){
    yield takeEvery(POST_ACTION, function*({payload}){
        try {
            const res = yield call(callAPi,postEndpoint.POSTS+`${payload.id}/${payload.type}`,PATCH);
            if(res && res.success){
                if(payload.isPostDetail){
                    yield put(setPostDetail(res.data))
                }
                yield fork(handleUpdatePost,res.data)
              
            }else{
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(postFailed());
            message.error(error.message);
        }
    })
   
} 
function *handleComment(){
    yield takeEvery(COMMENT, function*({payload}){
        try {
            const res = yield call(callAPi,'/comment/'+`${payload.link||''}`,payload.method,payload?.data||{});
            if(res && res.success){
                if(payload.isPostDetail){
                    yield put(setPostDetail(res.data))
                }
                
                yield fork(handleUpdatePost,res.data)
              
            }else{
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(postFailed());
            message.error(error.message);
        }
    })
   
} 


export default function* rootSaga(){
    yield all([
        fork(handleGetPosts),
        fork(handleAddPost),
        fork(handlePostAction),
        fork(handleComment),
        fork(handleGetPost)
    ])
}

