import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../components/Layout/AdminLayout/AdminLayout';
import DefaultLayout from '../components/Layout/MainLayout/DefaultLayout';

const AppRoutes = () => {
    return (
        <>
        <Routes>
            <Route path="*" element={<DefaultLayout/>}/>
            <Route path="*" element={<AdminLayout />} />
        </Routes>
        </>
    );
};

export default AppRoutes;
