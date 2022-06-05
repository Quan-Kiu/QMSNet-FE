import { MailOutlined, MoreOutlined } from '@ant-design/icons'
import { Button, Col, Row } from 'antd'
import React from 'react'
import AvatarCard from '../../../components/Common/AvatarCard'
import Box from '../../../components/Common/Box'
import Post from '../../../components/Common/Post'
import { posts } from '../../../data/post'
import { ProfileWrapper } from './Profile.style'

const Profile = props => {
  return (
    <ProfileWrapper>
        <Box>

        <Row className="header-profile" justify="space-between" align="middle">
            <Col >
                <AvatarCard className={'avatar'} content={<>
                    <div className="username">Quankiugl</div>
                    <div className="email">quankiugl@gmail.com</div>
                </>} />
            </Col>
            <Col className='header-profile__right'>
                <Row gutter={24} align="stretch">
                    <Col>
                        <Button size="large" className="q-button" type="primary">Theo dõi</Button>
                    </Col>
                    <Col>
                    <Button>
                        <MailOutlined/>
                    </Button>
                    </Col>
                    <Col>
                        <Button>
                        <MoreOutlined style={{
                            transform: 'rotate(90deg)'
                        }}/>
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
        </Box>
            <Row gutter={[32,32]}>

                <Col xl={8} lg={8} md={24}  className="about">
                        <Box>
                            <div className="story">
                            <div className="section-title">Tiểu sử</div>
                                
                                <p>
                                    

...........🎵...........



                                </p>
                                
                            </div>
                            <div className="stats">
                            <div className="section-title">Giới thiệu</div>
                                    <div className="fullname"><b>Nguyễn Ngọc Quân</b></div>
                                    <div className="bod">Sinh ngày 13/12/2001</div>
                                    <div className="posts">Có <b>22</b> bài đăng</div>
                                    <div className="followers">Có <b>2</b> người theo dõi</div>
                                    <div className="following">Đang theo dõi <b>20</b> người</div>
                                    <div className="marital_status">Độc thân</div>
                                    <div className="join">Tham gia vào Tháng 9 năm 2019</div>
                                </div>

                        </Box>
                </Col>
                <Col xl={16} lg={16} md={24}>
                        <Box>
                            <Post post={posts[0]}/>
                           <Post post={posts[0]}/>
                           <Post post={posts[0]}/>
                           <Post post={posts[0]}/>
                           <Post post={posts[0]}/>
                        </Box>
                </Col>
            </Row>
    </ProfileWrapper>
  )
}

Profile.propTypes = {}

export default Profile