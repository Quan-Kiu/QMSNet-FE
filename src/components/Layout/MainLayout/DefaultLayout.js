import { Col, Input, Row } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import SignIn from '../../../containers/Auth/SignIn';
import SignUp from '../../../containers/Auth/SignUp';
import HomePage from '../../../containers/Home';
import { HomeWrapper, MainContentWrapper } from '../../../containers/Home/Home.style';
import Profile from '../../../containers/User/Profile';
import { setTabActive } from '../../../redux/app/action';
import { authSelector } from '../../../redux/auth/reducer';
import { getPosts, toggleModal } from '../../../redux/post/action';
import AvatarCard from '../../Common/AvatarCard';
import Box from '../../Common/Box';
import Container from '../../Common/Container';
import ConversationPopup from '../../Common/ConversationPopup';
import PrivateRoute from '../PrivateRoute';
import { LayoutWrapper } from './DefaultLayout.style';
import Header from './Header';
import NavBar from './NavBar';
import Siderbar from './Sidebar';

const LayoutRoutes = ()=>{
    const location = useLocation();
    const {tabActive} = useSelector((state)=>state.app);
    const {userDetail} = useSelector((state)=>state.user);
    const dispatch = useDispatch();
    const navigate =  useNavigate();
    useEffect(()=>{
        if(tabActive!== 'home' && location.pathname === "/"){
            dispatch(setTabActive('home'))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[location.pathname])
    useEffect(()=>{
        if(userDetail){
            navigate(`/${userDetail.username}`)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[userDetail])
    
    return (
        <Routes>

            <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute> }/>
            <Route path="/:slug" element={<PrivateRoute><Profile/></PrivateRoute>}/>
            
        </Routes>
    )
}

const DefaultLayout = (props) => {
    const {user,isLogin} = useSelector(authSelector);
    const dispatch = useDispatch();
    useEffect(() => {
        if(isLogin){
            dispatch(getPosts(''));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isLogin])

   
    return <LayoutWrapper>
            <HomeWrapper>
            {user && <Header/>}
            <Container className="container">
                <Col xl={4} lg={5} md={3} sm={4} xs={4}>
                {user &&  <Siderbar className="left-bar">
                        <Box className="box-shadow" style={{
                            paddingTop: '0',
                            paddingBottom: '0',
                        }}>
                            <NavBar/>
                        </Box>
                    </Siderbar>}
                </Col>
                <Col xl={20} lg={19} md={21} sm={20}  xs={20} >
                <MainContentWrapper>
            <LayoutRoutes/>
            {user &&
            <ConversationPopup/>}
                </MainContentWrapper>
                </Col>
                
            </Container>
           
        </HomeWrapper>
            

        </LayoutWrapper>
};

DefaultLayout.propTypes = {};

export default DefaultLayout;
