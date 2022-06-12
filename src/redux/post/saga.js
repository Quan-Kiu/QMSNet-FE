import { message } from "antd";
import { all, call, fork, put, takeEvery,select,takeLatest } from 'redux-saga/effects';
import { GET, PATCH, POST, postEndpoint } from "../../constants";
import callAPi from "../../utils/apiRequest";
import { ADD_POST, COMMENT, getPosts, getPostsSuccess, GET_POSTS_START, postFailed, POST_ACTION, setPosts, toggleModal } from "./action";
import { PostSelector } from "./reducer";


function *handleGetPosts(){
    yield takeEvery(GET_POSTS_START, function*(action){
        try {
            const res = yield call(callAPi,postEndpoint.POSTS,GET);
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
function *handleAddPost(){
    yield takeEvery(ADD_POST, function*(action){
        try {
            const res = yield call(callAPi,postEndpoint.POSTS,POST,action.payload);
            if(res && res.success){
                yield all([
                    put(toggleModal()),
                    put(getPosts(''))
                ])
              
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
    console.log(data);
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
                console.log(res);
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
        fork(handleComment)
    ])
}

