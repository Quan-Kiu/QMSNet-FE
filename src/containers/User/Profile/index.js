import { EditFilled, MailFilled, MailOutlined, MoreOutlined, UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons'
import { Button, Col, Form, Modal, Row, Space } from 'antd'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AvatarCard from '../../../components/Common/AvatarCard'
import Box from '../../../components/Common/Box'
import Layout from '../../../components/Common/Layout'
import Post from '../../../components/Common/Post'
import UploadWithUpdate from '../../../components/Common/UploadWithUpdate'
import { maritalStatus } from '../../../constants'
import { setTabActive } from '../../../redux/app/action'
import { getPostUserDetail, userFollow } from '../../../redux/user/action'
import Information from './Form/Infomation'
import Story from './Form/Story'
import { ProfileWrapper } from './Profile.style'
import { useNavigate } from 'react-router-dom'

const Profile = props => {
    const { user, status } = useSelector((state) => state.auth);
    const { userDetail, postUserDetail, followLoading } = useSelector((state) => state.user);
    const [isShowEditModal, setIsShowEditModal] = useState(false);
    const [isShowEditDetailModal, setIsShowEditDetailModal] = useState(false);
    const form = Form.useForm();
    const dispatch = useDispatch();
    const isFollowed = useMemo(() => !!userDetail?.followers?.includes(user._id), [userDetail]);

    useEffect(() => {

        dispatch(setTabActive(""))
        if (userDetail?._id !== postUserDetail?.user_id) {
            dispatch(getPostUserDetail(userDetail?._id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userDetail])



    const handleShowEditModal = () => {
        setIsShowEditModal(true);
    }
    const handleCloseEditModal = () => {
        setIsShowEditModal(false);
    }
    const handleShowEditDetailModal = (component) => {
        setIsShowEditDetailModal(component);
    }
    const handleCloseEditDetailModal = () => {
        setIsShowEditDetailModal(false);
    }

    useEffect(() => {
        if (status.success && isShowEditDetailModal) {
            setIsShowEditDetailModal(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])

    const handleFollow = () => {
        const type = isFollowed ? 'unFollow' : 'follow';
        dispatch(userFollow({
            path: type + '/' + userDetail?._id
        }))
    }

    const introductionElement = <>{userDetail?.works?.map((work, index) => (<Space>
        <img src="/assets/images/work.png" alt="works" />
        <p>{work?.working ? 'Đang làm việc tại ' : 'Đã làm việc tại '}<b>{work.name}</b></p>
    </Space>
    ))}
        {userDetail?.schools?.map((school, index) => (
            <Space>
                <img src="/assets/images/schools.png" alt="schools" />
                <p>{school?.learning ? 'Học tại ' : 'Đã học tại '}<b>{school.name}</b></p>

            </Space>))}
        {userDetail?.address?.province && <Space>
            <img src="/assets/images/home.png" alt="home" />
            <p>Sống tại <b>{userDetail?.address?.district},{userDetail?.address?.province}</b></p>
        </Space>}

        {userDetail?.countryside?.province && <Space>
            <img src="/assets/images/location.png" alt="location" />
            <p>Đến từ <b>{userDetail?.countryside?.district},{userDetail?.countryside?.province}</b></p>
        </Space>}

        {userDetail?.mobile && <Space>
            <img src="/assets/images/phone.png" alt="phone" />
            <div className="bod">{userDetail?.mobile}</div>
        </Space>}
        {userDetail?.email && (!userDetail?.userSettings?.PRIVACY?.email || userDetail?.userSettings?.PRIVACY?.email === 1) && <Space>
            <img src="/assets/images/mail.png" alt="mail" />
            <div className="bod">{userDetail?.email}</div>
        </Space>}
        {userDetail?.dob && <Space>
            <img src="/assets/images/dob.png" alt="dob" />
            <div className="bod">Sinh ngày {moment(userDetail?.dob).format('DD/MM/YYYY')}</div>
        </Space>}

        <Space>
            <img src="/assets/images/followers.png" alt="followers" />
            <div className="followers">Có <b>{userDetail?.followers.length}</b> người theo dõi</div>
        </Space>
        <Space>

            <img src="/assets/images/followers.png" alt="followers" />
            <div className="following">Đang theo dõi <b>{userDetail?.following.length}</b> người</div>
        </Space>
        {userDetail?.maritalStatus &&
            <Space>
                <img src="/assets/images/maritalStatus.png" alt="maritalStatus" />

                <div className="marital_status">{maritalStatus[userDetail?.maritalStatus]}</div>
            </Space>}

        <Space>
            <img src="/assets/images/joined.png" alt="joined" />
            <div className="join">Tham gia vào {moment(userDetail?.createdAt).format('MM, YYYY')}</div>
        </Space></>
    const navigate = useNavigate()


    return (
        <>
            <Modal width={800} maskStyle={{
                color: 'black'
            }} destroyOnClose={true} footer={null} title={'Chỉnh sửa'} className="edit-detail-profile-modal" visible={!!isShowEditDetailModal} onCancel={handleCloseEditDetailModal}>
                {isShowEditDetailModal}
            </Modal>
            <Modal destroyOnClose={true} footer={null} width={700} visible={isShowEditModal} onCancel={handleCloseEditModal} className="edit-profile-modal" title="Chỉnh sửa thông tin cá nhân">

                <UploadWithUpdate />


                <Row justify="space-between">
                    <Col className="edit-title">
                        Tiểu sử
                    </Col>
                    <Col>
                        <Button onClick={() => handleShowEditDetailModal(<Story form={form} />)} type="link">Chỉnh sửa</Button>
                    </Col>
                </Row>
                <Row className='edit-preview' justify="center" style={{
                    textAlign: 'center',
                    whiteSpace: 'pre-line',
                }}>
                    {userDetail?.story}
                </Row>
                <Row justify="space-between">
                    <Col className="edit-title">
                        Giới thiệu
                    </Col>
                    <Col>
                        <Button onClick={() => navigate('/settings')} type="link">Chỉnh sửa</Button>
                    </Col>
                </Row>
                <div className='edit-preview' >
                    {introductionElement}
                </div>

            </Modal>
            <Layout>

                <ProfileWrapper>
                    <Box style={
                        {
                            marginBottom: '10px'
                        }
                    }>

                        <Row className="header-profile" justify="space-between" align="middle">
                            <Col >
                                <AvatarCard style={{
                                    alignItems: "center"
                                }} src={userDetail?.avatar.url} className={'avatar'} content={<>
                                    <div className="username">{userDetail?.username}</div>
                                    <div className="fullname">{userDetail?.fullname}</div>
                                </>} />
                            </Col>
                            <Col className='header-profile__right'>
                                <Row gutter={24} align="stretch">
                                    <Col>
                                        {user?._id !== userDetail?._id && <Button size="large" loading={followLoading} icon={isFollowed ? <UserDeleteOutlined /> : <UserAddOutlined />} onClick={handleFollow} className="q-button" type="primary">{isFollowed ? 'Bỏ theo dõi' : 'Theo dõi'}</Button>}
                                        {user?._id === userDetail?._id && <Button size="large" className="q-button q-button-outline" icon={<EditFilled />} onClick={handleShowEditModal}>Chỉnh sửa thông tin cá nhân</Button>}
                                    </Col>
                                    {isFollowed &&
                                        <Col>
                                            <Button className='q-button q-button-outline' >
                                                <MailOutlined />
                                                Nhắn tin
                                            </Button>
                                        </Col>
                                    }
                                    {user?._id !== userDetail?._id && <Col>
                                        <Button>
                                            <MoreOutlined style={{
                                                transform: 'rotate(90deg)'
                                            }} />
                                        </Button>
                                    </Col>}
                                </Row>
                            </Col>
                        </Row>
                    </Box>
                    <Row gutter={[32, 32]}>

                        <Col xl={8} lg={8} md={24} className="about">
                            <Box>
                                <div className="story">
                                    <div className="section-title">Tiểu sử</div>

                                    <p style={{
                                        whiteSpace: "pre-line"
                                    }}>
                                        {userDetail?.story}
                                    </p>

                                </div>
                                <div className="stats">
                                    <div className="section-title" >Giới thiệu</div>
                                    {introductionElement}
                                </div>
                            </Box>
                        </Col>
                        <Col xl={16} lg={16} md={24}>

                            {postUserDetail?.posts?.length > 0 ? postUserDetail?.posts?.map((post) => <Post post={post} isPostDetail={true} />) : <Box style={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '1.8rem',
                                fontWeight: '600',
                                justifyContent: 'center',
                                height: '100px'
                            }}>
                                Không có bài viết
                            </Box>}
                        </Col>
                    </Row>
                </ProfileWrapper>
            </Layout>
        </>
    )
}

Profile.propTypes = {}

export default Profile