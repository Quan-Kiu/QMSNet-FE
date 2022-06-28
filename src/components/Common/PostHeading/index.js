import { CommentOutlined, DeleteOutlined, EditOutlined, GlobalOutlined, UnlockOutlined, WarningOutlined } from '@ant-design/icons'
import { Button, Col, Modal, Popover, Row } from 'antd'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { MoreIcon, SaveIcon, UnsaveIcon } from '../../../assets/icon'
import { deletePost, postAction, toggleModal } from '../../../redux/post/action'
import { setUserDetail } from '../../../redux/user/action'
import { timeAgo } from '../../../utils/time_utils'

const PostHeadingWrapper = styled.div`
.info{
    .createdAt{
        display: flex;
        align-items: center;
        gap: 5px;
        font-size:13px;
    }
    img,svg{
        width: 12px;
        height: 12px;
    }
}

`;

const PostHeading = ({ post, style }) => {
    const [showConfirmDelete, setShowConfirmDelete] = useState(null);
    const [isPopoverShow, setIsPopoverShow] = useState(false);
    const pseudoRef = useRef(null);
    const { user } = useSelector(state => state.auth);
    const isSaved = user?.saved?.some((s) => s?._id === post?._id);
    const dispatch = useDispatch();
    const handleSavePost = () => {

        dispatch(postAction({
            type: isSaved ? 'unsave' : 'save',
            id: post?._id,
        }))
    }
    return (
        <PostHeadingWrapper style={style}>
            <Modal centered bodyStyle={{
                fontSize: '16px'
            }} visible={showConfirmDelete} footer={<Row justify="end">
                <Button size="large" onClick={() => {
                    setShowConfirmDelete(null)
                }} style={{
                    fontWeight: '600'
                }} type="link">Hủy</Button>
                <Button size="large" className="q-button" onClick={() => {
                    dispatch(deletePost(showConfirmDelete))
                    setShowConfirmDelete(null);
                }} type="primary">Xóa</Button>
            </Row>} onCancel={() => {
                setShowConfirmDelete(null)
            }} destroyOnClose={true} title="Bạn có muốn xóa bài viết này?">
                Chúng tôi sẽ gỡ bài viết này và bạn sẽ không thể khôi phục nó.
            </Modal>
            <Row align="middle" justify="space-between">
                <div className="info">
                    <div onClick={() => {
                        dispatch(setUserDetail(post?.user));
                    }} className="username">{post?.user?.username}</div>
                    <div className="createdAt">{timeAgo(post?.createdAt)} - {post?.status === 1 ? <GlobalOutlined /> : <img src="/assets/images/key.png" />} </div>
                </div>
                <div className="event">
                    <Popover overlayClassName='postActions' placement="leftTop" content={<>
                        <div className="postActions" >
                            <Row onClick={handleSavePost}>
                                <Col>
                                    {isSaved ? <UnsaveIcon /> : <SaveIcon />}
                                </Col>
                                <Col>
                                    {isSaved ? 'Bỏ lưu bài viết' : "Lưu bài viết"}
                                </Col>
                            </Row>
                            {user?._id === post?.user?._id && <Row onClick={() => {
                                dispatch(toggleModal(post))
                            }}>
                                <Col>
                                    <EditOutlined />
                                </Col>
                                <Col>
                                    Chỉnh sửa bài viết
                                </Col>
                            </Row>}
                            {user?._id === post?.user?._id && <Row onClick={() => {
                                dispatch(postAction({
                                    type: 'disableComment',
                                    id: post?._id,
                                }))
                            }}>
                                <Col>
                                    {post?.disableComment ? <UnlockOutlined /> : <CommentOutlined />}
                                </Col>
                                <Col>
                                    {post?.disableComment ? 'Mở bình luận' : 'Tắt bình luận'}

                                </Col>
                            </Row>}
                            {user?._id === post?.user?._id && <Row onClick={() => {
                                setShowConfirmDelete(post)
                            }}>
                                <Col>
                                    <DeleteOutlined />
                                </Col>
                                <Col>
                                    Xóa bài viết
                                </Col>
                            </Row>}
                            {user?._id !== post?.user?._id && <Row onClick={() => {
                                setShowConfirmDelete(post)
                            }}>
                                <Col>
                                    <WarningOutlined />
                                </Col>
                                <Col>
                                    Báo cáo bài viết
                                </Col>
                            </Row>}
                        </div>
                    </>} trigger="click">
                        <MoreIcon style={{
                            cursor: 'pointer'
                        }} />
                    </Popover>

                </div>
            </Row>
        </PostHeadingWrapper>
    )
}

PostHeading.propTypes = {}

export default PostHeading