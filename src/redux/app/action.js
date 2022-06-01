export const APP_ACTION = {
    updateWindowSize: 'UPDATE-WINDOW-SIZE',
    setAppLoading: 'SET-APP-LOADING',
};

export const updateWindowSize = (payload) => ({
    type: APP_ACTION.updateWindowSize,
    payload,
});



export const setAppLoading = (payload) => ({
    type: APP_ACTION.setAppLoading,
    payload,
});
