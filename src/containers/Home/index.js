import { Col, Input, Modal, Row } from 'antd';
import React from 'react';
import AvatarCard from '../../components/Common/AvatarCard';
import Box from '../../components/Common/Box';
import Container from '../../components/Common/Container';
import NavBar from '../../components/Layout/MainLayout/NavBar';
import Sidebar from '../../components/Layout/MainLayout/Sidebar';
import UseWindow from '../../hooks/useWindowResize';
import Post from '../../components/Common/Post';
import Contacts from './Contacts';
import { HomeWrapper, MainContentWrapper } from './Home.style';
import Requests from './Requests';
import { posts } from '../../data/post';
import { useDispatch, useSelector } from 'react-redux';
import { PostSelector } from '../../redux/post/reducer';
import { toggleModal } from '../../redux/post/action';



const HomePage = (props) => {
    const [windowSize] = UseWindow()
    const {data} = useSelector(PostSelector); 
    const dispatch = useDispatch();


   
    return (
        <HomeWrapper>
            <Container className="container" >
                <Col xl={16} lg={16} md={24} sm={24} xs={24} style={{
                    paddingRight: '5rem',
                }}>
                <MainContentWrapper>
                        <Box className="new-post box-shadow" >
                            <Row align="middle">
                                <Col>
                                    <AvatarCard src="https://imgt.taimienphi.vn/cf/Images/np/2021/11/26/hinh-anh-avatar-dep-2.jpg" />
                                </Col >
                                <Col onClick={()=>{
                                        dispatch(toggleModal())
                                    }} className="new-post__content" flex={1}>
                                    <Input  size="large" placeholder="Bạn đang nghĩ gì?"></Input>
                                </Col>
                            </Row>
                        </Box>


                        <div className="posts" style={{
                            marginTop: '2rem'
                        }}>
                            {data?.posts && data?.posts.map((post)=><Post post={post}/>)}
                        </div>
                </MainContentWrapper>
                </Col>
                <Col xl={8} lg={8} md={0}>
                <Sidebar style={
                    {
                        height: windowSize.height-100
                    }
                } className="right-bar">
                    <Requests/>
                    <Contacts/>
                </Sidebar>
                </Col>
            </Container>
           
        </HomeWrapper>
    );
};

HomePage.propTypes = {};

export default HomePage;
