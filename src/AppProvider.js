import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './configs/theme';

const AppProvider = ({ children }) => {

    return (
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
    );
};

AppProvider.propTypes = {};

export default AppProvider;
