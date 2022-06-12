import { MailOutlined, MoreOutlined,ReadOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Form, Image, Modal, Row, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import AvatarCard from '../../../components/Common/AvatarCard'
import Box from '../../../components/Common/Box'
import Post from '../../../components/Common/Post'
import { posts } from '../../../data/post'
import { ProfileWrapper } from './Profile.style'
import {useSelector} from 'react-redux';
import moment from 'moment'
import Story from './Form/Story'
import Information from './Form/Infomation'
import { maritalStatus } from '../../../constants'
import UploadWithUpdate from '../../../components/Common/UploadWithUpdate'

const Profile = props => {
const {user,status} = useSelector((state)=>state.auth);
const [isShowEditModal,setIsShowEditModal] = useState(false);
const [isShowEditDetailModal,setIsShowEditDetailModal] = useState(false);
const form = Form.useForm();

const handleShowEditModal = ()=>{
    setIsShowEditModal(true);
}
const handleCloseEditModal = ()=>{
    setIsShowEditModal(false);
}
const handleShowEditDetailModal = (component)=>{
    setIsShowEditDetailModal(component);
}
const handleCloseEditDetailModal = ()=>{
    setIsShowEditDetailModal(false);
}

useEffect(() => {
    if(status.success && isShowEditDetailModal){
        setIsShowEditDetailModal(false);
    }

// eslint-disable-next-line react-hooks/exhaustive-deps
},[status])

const introductionElement = <>{user?.works?.map((work,index)=>(<Space>
    <img src="/assets/images/work.png" alt="works" />
    <p>{work?.working ?'Đang làm việc tại ':'Đã làm việc tại '}<b>{work.name}</b></p>    
</Space>
))}
{user?.schools?.map((school,index)=>(
<Space>
    <img src="/assets/images/schools.png" alt="schools" />
    <p>{school?.learning ?'Học tại ':'Đã học tại '}<b>{school.name}</b></p>
    
</Space>))}
{user?.address?.province&&<Space>
    <img src="/assets/images/home.png" alt="home" />
   <p>Sống tại <b>{user?.address?.district},{user?.address?.province}</b></p> 
</Space>}

{user?.countryside?.province &&<Space>
    <img src="/assets/images/location.png" alt="location" />
   <p>Đến từ <b>{user?.countryside?.district},{user?.countryside?.province}</b></p> 
</Space>}

{user?.mobile&&<Space>
<img src="/assets/images/phone.png" alt="phone" />
<div className="bod">{user?.mobile}</div>
</Space>}
{user?.email &&<Space>
<img src="/assets/images/mail.png" alt="mail" />
<div className="bod">{user?.email}</div>
</Space>}
{user?.dob && <Space>
<img src="/assets/images/dob.png" alt="dob" />
<div className="bod">Sinh ngày {moment(user?.dob).format('DD/MM/YYYY')}</div>
</Space>}

<Space>
<img src="/assets/images/followers.png" alt="followers" />
<div className="followers">Có <b>{user.followers.length}</b> người theo dõi</div>
</Space>
<Space>

<img src="/assets/images/followers.png" alt="followers" />
<div className="following">Đang theo dõi <b>{user.following.length}</b> người</div>
</Space>
{user?.maritalStatus &&
<Space>
<img src="/assets/images/maritalStatus.png" alt="maritalStatus" />

<div className="marital_status">{maritalStatus[user?.maritalStatus]}</div>
</Space>}

<Space>
<img src="/assets/images/joined.png" alt="joined" />
<div className="join">Tham gia vào {moment(user.createdAt).format('MM, YYYY')}</div>
</Space></>

  return (
    <>
    <Modal width={800} maskStyle={{
        color: 'black'
    }}  destroyOnClose={true} footer={null} title={'Chỉnh sửa'} className="edit-detail-profile-modal" visible={!!isShowEditDetailModal} onCancel={handleCloseEditDetailModal}>
        {isShowEditDetailModal}
    </Modal>
    <Modal destroyOnClose={true} footer={null} width={700} visible={isShowEditModal} onCancel={handleCloseEditModal} className="edit-profile-modal" title="Chỉnh sửa thông tin cá nhân">
        
        <UploadWithUpdate/>
       
      
        <Row justify="space-between">
            <Col className="edit-title">
                Tiểu sử
            </Col>
            <Col>
                <Button onClick={()=>handleShowEditDetailModal(<Story form={form}/>)} type="link">Chỉnh sửa</Button>
            </Col>
        </Row>
        <Row className='edit-preview' justify="center" style={{
            textAlign: 'center',
            whiteSpace: 'pre-line',
        }}>
                {user.story}
        </Row>
        <Row justify="space-between">
            <Col className="edit-title">
                Giới thiệu
            </Col>
            <Col>
                <Button onClick={()=>handleShowEditDetailModal(<Information/>)} type="link">Chỉnh sửa</Button>
            </Col>
        </Row>
        <div className='edit-preview' >
            {introductionElement}
        </div>
            
    </Modal>
    <ProfileWrapper>
        <Box style={
            {
                marginBottom:'10px'
            }
        }>

        <Row className="header-profile" justify="space-between" align="middle">
            <Col >
                <AvatarCard src={user.avatar.url} className={'avatar'} content={<>
                    <div className="username">{user.username}</div>
                    <div className="fullname">{user.fullname}</div>
                </>} />
            </Col>
            <Col className='header-profile__right'>
                <Row gutter={24} align="stretch">
                    <Col>
                    {!user && <Button size="large" className="q-button" type="primary">Theo dõi</Button>}
                    {user && <Button size="large" onClick={handleShowEditModal} className="q-button" type="primary">Chỉnh sửa thông tin cá nhân</Button>}
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
                                
                                <p style={{
                                    whiteSpace: "pre-line"
                                }}>
                                    {user?.story}
                                </p>
                                
                            </div>
                            <div className="stats">
                            <div className="section-title" >Giới thiệu</div>
                            {introductionElement}
                            </div>
                        </Box>
                </Col>
                <Col xl={16} lg={16} md={24}>
                        <Box>
                            {/* <Post post={posts[0]}/>
                           <Post post={posts[0]}/>
                           <Post post={posts[0]}/>
                           <Post post={posts[0]}/>
                           <Post post={posts[0]}/> */}
                        </Box>
                </Col>
            </Row>
    </ProfileWrapper>
  </>
  )
}

Profile.propTypes = {}

export default Profile