import { combineReducers } from 'redux';
import appReducer from './app/reducer';
import authReducer from './auth/reducer';
import postReducer from './post/reducer';
import userReducer from './user/reducer';
import conversationReducer from './conversation/reducer';

export default combineReducers({
    app: appReducer,
    auth: authReducer,
    post: postReducer,
    user: userReducer,
    conversation: conversationReducer,
});
