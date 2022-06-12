import { combineReducers } from 'redux';
import appReducer from './app/reducer';
import authReducer from './auth/reducer';
import postReducer from './post/reducer';

export default combineReducers({
    app: appReducer,
    auth: authReducer,
    post: postReducer,
});
