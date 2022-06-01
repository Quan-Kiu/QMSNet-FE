import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from '../../../containers/Auth/SignIn';
import SignUp from '../../../containers/Auth/SignUp';
import HomePage from '../../../containers/Home';
import { LayoutWrapper } from './DefaultLayout.style';
import Header from './Header';

const LayoutRoutes = ()=>{
    
    return (
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
        </Routes>
    )
}

const DefaultLayout = (props) => {
    return (
        <LayoutWrapper>
            <Header/>
            <LayoutRoutes/>
        </LayoutWrapper>
    );
};

DefaultLayout.propTypes = {};

export default DefaultLayout;
