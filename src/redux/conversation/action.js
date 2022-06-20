
export const ADD_CONVERSATION =  'ADD_CONVERSATION';
export const ADD_MESSAGE =  'ADD_MESSAGE';
export const UPDATE_CONVERSATION =  'UPDATE_CONVERSATION';
export const GET_CONVERSATION =  'GET_CONVERSATION';
export const GET_CONVERSATION_SUCCESS =  'GET_CONVERSATION_SUCCESS';
export const CONVERSATION_FAILED =  'CONVERSATION_FAILED';
export const TOGGLE_CONVERSATION =  'TOGGLE_CONVERSATION';
export const GET_MESSAGE =  'GET_MESSAGE';
export const GET_MESSAGE_SUCCESS =  'GET_MESSAGE_SUCCESS';


export const addConversation = (payload) => ({
    type: ADD_CONVERSATION,
    payload,
})
export const getConversation = (payload) => ({
    type: GET_CONVERSATION,
    payload,
})
export const getConversationSuccess = (payload) => ({
    type: GET_CONVERSATION_SUCCESS,
    payload,
})
export const updateConversation = (payload,fakeId='') => ({
    type: UPDATE_CONVERSATION,
    payload,
    fakeId
})
export const addMessage = (payload) => ({
    type: ADD_MESSAGE,
    payload,
})
export const getMessage = (payload) => ({
    type: GET_MESSAGE,
    payload,
})
export const getMessageSuccess = (payload) => ({
    type: GET_MESSAGE_SUCCESS,
    payload,
})
export const toggleConversation = (payload) => ({
    type: TOGGLE_CONVERSATION,
    payload,
})
export const conversationFailed = (payload) => ({
    type: CONVERSATION_FAILED,
    payload,
})


