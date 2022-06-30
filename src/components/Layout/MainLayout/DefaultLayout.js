import { Col, Modal } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Friend from '../../../containers/Friend';
import HomePage from '../../../containers/Home';
import { HomeWrapper, MainContentWrapper } from '../../../containers/Home/Home.style';
import PostModal from '../../../containers/Post/PostModal';
import Settings from '../../../containers/Settings';
import Profile from '../../../containers/User/Profile';
import { setTabActive } from '../../../redux/app/action';
import { authSelector } from '../../../redux/auth/reducer';
import { getPosts, setDetailModal, setPostDetail } from '../../../redux/post/action';
import { getUserRequests, getUserSuggestions } from '../../../redux/user/action';
import Box from '../../Common/Box';
import Container from '../../Common/Container';
import ConversationPopup from '../../Common/ConversationPopup';
import PrivateRoute from '../PrivateRoute';
import { LayoutWrapper } from './DefaultLayout.style';
import Header from './Header';
import NavBar from './NavBar';
import Siderbar from './Sidebar';

const LayoutRoutes = () => {
    const location = useLocation();
    const { tabActive } = useSelector((state) => state.app);
    const { isLogin } = useSelector(authSelector);
    const { userDetail } = useSelector((state) => state.user);
    const navigate = useNavigate();


    const dispatch = useDispatch();

    useEffect(() => {
        if (tabActive !== 'home' && location.pathname === "/") {
            dispatch(setTabActive('home'))
        }
        if (location.pathname === "/friend") {
            dispatch(setTabActive('people'))
        }
        if (location.pathname === "/settings") {
            dispatch(setTabActive('setting'))
        }
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    useEffect(() => {
        if (userDetail) {
            navigate(`/${userDetail.username}`)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userDetail])

    useEffect(() => {
        if (isLogin) {
            dispatch(getPosts(''));
            dispatch(getUserSuggestions())
            dispatch(getUserRequests())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogin])




    return (
        <Routes>
            <Route path="/" element={
                <PrivateRoute>
                    <HomePage />
                </PrivateRoute>
            } />
            <Route path="/friend" element={
                <PrivateRoute>
                    <Friend />
                </PrivateRoute>
            } />
            <Route path="/settings" element={
                <PrivateRoute>
                    <Settings />
                </PrivateRoute>
            } />
            <Route path="/:slug" element={
                <PrivateRoute>
                    <Profile />
                </PrivateRoute>
            } />
        </Routes>
    )
}

const DefaultLayout = (props) => {
    const { user } = useSelector(authSelector);
    const { postDetail, detailModal } = useSelector(state => state.post);
    const dispatch = useDispatch();

    return <LayoutWrapper>

        <Modal afterClose={() => {
            dispatch(setPostDetail(null));
        }} width={`${postDetail?.styles?.background === '#fff' && postDetail?.media?.length === 0 ? '50%' : '90%'}`} bodyStyle={{
            padding: '0 10px'
        }} centered={true} closable={false} onCancel={() => { dispatch(setDetailModal(null)) }} destroyOnClose={true} className='post-modal' visible={detailModal?.id} footer={null} title={null}>
            <PostModal id={detailModal?.id} params={detailModal?.params} />
        </Modal>
        <HomeWrapper>
            {user && <Header />}
            <Container className="container">
                <Col xl={5} lg={5} md={3} sm={4} xs={4}>
                    {user && <Siderbar className="left-bar">
                        <Box className="box-shadow" style={{
                            paddingTop: '0',
                            paddingBottom: '0',
                        }}>
                            <NavBar />

                        </Box>
                    </Siderbar>}
                </Col>
                <Col xl={19} lg={19} md={21} sm={20} xs={20} >
                    <MainContentWrapper>

                        <LayoutRoutes />
                        {user &&
                            <ConversationPopup />}
                    </MainContentWrapper>
                </Col>

            </Container>

        </HomeWrapper>


    </LayoutWrapper>
};

DefaultLayout.propTypes = {};

export default DefaultLayout;
