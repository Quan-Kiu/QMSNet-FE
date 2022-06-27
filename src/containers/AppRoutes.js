import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AdminLayout from '../components/Layout/AdminLayout/AdminLayout';
import DefaultLayout from '../components/Layout/MainLayout/DefaultLayout';
import { refreshToken } from '../redux/auth/action';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../redux/auth/reducer';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import io from 'socket.io-client';
import { getSocket } from '../redux/socket/action';


const AppRoutes = () => {
    const { isLogin } = useSelector(authSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(refreshToken())
        const socket = io('192.168.1.2:5000');
        console.log(socket)
        dispatch(getSocket(socket));
        return () => {
            socket.close();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (isLogin) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogin])

    return (
        <>
            <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<DefaultLayout />} />
                <Route path="*" element={<AdminLayout />} />
            </Routes>
        </>
    );
};

export default AppRoutes;
