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



const HomePage = (props) => {
    const [windowSize] = UseWindow()


   
    return (
        <HomeWrapper>
            
            <Container className="container" gutter={[32,32]}>
                <Col xl={5} lg={5} md={3} sm={4} xs={4}>
                    <Sidebar className="left-bar">
                        {/* <Box className={"box-shadow"}>
                            <AvatarCard src="https://imgt.taimienphi.vn/cf/Images/np/2021/11/26/hinh-anh-avatar-dep-2.jpg" content={
                                <>
                                <div className="username">
                                Alexandra Borke
                            </div>    
                            <div className="id">
                                @alexsunshine
                            </div>
                                </>
                            }/>
                        </Box> */}

                        <Box className="box-shadow" style={{
                            paddingTop: '0',
                            paddingBottom: '0',
                        }}>
                            <NavBar/>
                        </Box>
                    </Sidebar>
                </Col>
                <Col xl={12} lg={12} md={20} sm={20}   xs={20} >
                <MainContentWrapper>
                        <Box className="new-post box-shadow">
                            <Row align="middle">
                                <Col>
                                    <AvatarCard src="https://imgt.taimienphi.vn/cf/Images/np/2021/11/26/hinh-anh-avatar-dep-2.jpg" />
                                </Col >
                                <Col className="new-post__content" flex={1}>
                                    <Input  size="large" placeholder="Bạn đang nghĩ gì?"></Input>
                                </Col>
                            </Row>
                        </Box>


                        <div className="posts" style={{
                            marginTop: '2rem'
                        }}>
                            
                           <Post post={posts[0]}/>
                           <Post post={posts[0]}/>
                           <Post post={posts[0]}/>
                           <Post post={posts[0]}/>
                           <Post post={posts[0]}/>
                        </div>
                </MainContentWrapper>
                </Col>
                <Col xl={7} lg={7} md={0}>
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
