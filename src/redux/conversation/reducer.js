import { ADD_CONVERSATION, CONVERSATION_FAILED, GET_CONVERSATION, GET_CONVERSATION_SUCCESS, GET_MESSAGE_SUCCESS, TOGGLE_CONVERSATION, UPDATE_CONVERSATION } from "./action";

const initialState = {
    loading: false,
    conversations: [],
    totalActive: 0,
    
}


const conversationReducer = (state= initialState,action)=>{
    switch (action.type){
        case ADD_CONVERSATION:
            const current = [...state.conversations];
            current.unshift(action.payload);
            return {
                ...state,
                conversations: current
            }
        case GET_CONVERSATION:
            return {
                ...state,
                loading: true,
            }
        case TOGGLE_CONVERSATION:
            const toggle = state.conversations.findIndex((cv)=>cv._id === action.payload);
            const cloneCv = [...state.conversations];
            console.log(cloneCv);
            let newTotal =state.totalActive;
            if(toggle !== -1){
                if(state.conversations[toggle]?.isOpen){
                    cloneCv[toggle].isOpen = "";
                }else{
                    newTotal+=1;
                    cloneCv[toggle].isOpen = newTotal;
                }
            }
            console.log(cloneCv);
            return {
                ...state,
                conversations: cloneCv,
                totalActive: newTotal
            }
        case GET_CONVERSATION_SUCCESS:
            return {
                ...state,
                conversations: action.payload,
                loading: false,
            }
        case GET_MESSAGE_SUCCESS:
            const currentMessages =  state.conversations[action.payload.index]?.messages || [];
            state.conversations[action.payload.index].messages =  [...currentMessages,...action.payload.messages]
            state.conversations[action.payload.index].pagination =  action.payload.pagination;
            state.conversations[action.payload.index].isOver =  action.payload.pagination.count === 0;
            return {
                ...state,
                loading: false,
            }
        case CONVERSATION_FAILED:
            return {
                ...state,
                loading: false,
            }
        case UPDATE_CONVERSATION:
            const clone = [...state.conversations];
            let index = -1;
            if(action?.fakeId){
                 index =clone.findIndex((cv)=>cv.fakeId === action?.fakeId)

            }else{

                index =clone.findIndex((cv)=>cv._id === action.payload.conversation._id)
                
            }

            if(index!==-1){
                let cloneMessage = clone[index]?.messages?clone[index].messages: [];
                delete clone[index]?.fakeId;
                let newConversation = {...clone[index],...action?.payload?.conversation ,messages: [action?.payload?.message,...cloneMessage]};
                clone.splice(index, 1);
                clone.unshift(newConversation);
            }
            return {
                ...state,
                conversations: clone
            }
       
        default:
            return state;
    }
}

export const conversationSelector = (state)=> state.conversation;

export default conversationReducer;



