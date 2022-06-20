import { message } from "antd";
import { all, call, fork, put, takeEvery,select } from "redux-saga/effects";
import { GET, POST } from "../../constants";
import callAPi from "../../utils/apiRequest";
import { ADD_MESSAGE, conversationFailed, getConversationSuccess, getMessageSuccess, GET_CONVERSATION, GET_MESSAGE, updateConversation } from "./action";


function *handleAddMessage(){
    yield takeEvery(ADD_MESSAGE, function*({payload}){
        try {
            delete payload?._id;
            const res = yield callAPi(`message`,POST,payload);
            if(res && res.success){

                yield put(updateConversation(res.data,payload?.fakeId))
              
            }else{
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(conversationFailed());
            message.error(error.message);
        }
    })
    
} 

function *handleGetConversation(){
    yield takeEvery(GET_CONVERSATION, function*(){
        try {
            const res = yield call(callAPi,`conversations`,GET);
            if(res && res.success){
                yield put(getConversationSuccess(res.data))
            }else{
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(conversationFailed());
            message.error(error.message);
        }
    })
    
} 

function *handleGetMessage(){
    yield takeEvery(GET_MESSAGE, function*({payload}){
        try {

            const res = yield call(callAPi,`message/${payload?._id}?page=${(Number(payload?.pagination?.page)+1||1)}&limit=10`,GET);
            if(res && res.success){
                const {conversations} = yield select(state=>state.conversation)
                const index = conversations.findIndex((cv)=>cv._id === res.data?._id);
                if(index !== -1){
                    yield put(getMessageSuccess({messages:res.data?.messages,index,pagination: res.data?.pagination}))
                }
            }else{
                throw new Error(res.message)
            }
        } catch (error) {
            yield put(conversationFailed());
            message.error(error.message);
        }
    })
    
} 




function *rootSaga(){
    yield all([
        fork(handleAddMessage),
        fork(handleGetMessage),
        fork(handleGetConversation)
    ]);
}

export default rootSaga;