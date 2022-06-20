import { APP_ACTION } from './action';

const initialState = {
    WIDTH: window.innerWidth,
    appLoading: null,
    tabActive: 'home'
};

const app = (state = initialState, action) => {
    switch (action.type) {
        case APP_ACTION.updateWindowSize:
            return {
                ...state,
                WIDTH: action.payload,
            };
        case APP_ACTION.setAppLoading:
            return {
                ...state,
                appLoading: action.payload,
            };
        case APP_ACTION.setTabActive:
            return {
                ...state,
                tabActive: action.payload,
            };
        default:
            return state;
    }
};

export default app;
