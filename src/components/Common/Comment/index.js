import React, { useEffect, useState } from 'react'
import AvatarCard from '../AvatarCard'
import { CommentWrapper } from './Comment.style'
import PropTypes from 'prop-types'
import { Row, Col, Popover, Modal, Button } from 'antd'
import { LikeIcon, UnlikeIcon } from '../../../assets/icon'
import { useDispatch, useSelector } from 'react-redux'
import { comment } from '../../../redux/post/action'
import { DELETE, PATCH } from '../../../constants'
import { timeAgo } from '../../../utils/time_utils'
import { DeleteOutlined, MoreOutlined, WarningOutlined } from '@ant-design/icons'

const Comment = (props) => {
    const [showConfirmDelete, setShowConfirmDelete] = useState(null);
    const { user } = useSelector((state) => state.auth)
    const { postDetail } = useSelector((state) => state.post)
    const dispatch = useDispatch();
    const [isLiked, setIsLiked] = useState(!!props?.comment?.likes?.includes(user?._id));
    const [isReplyShow, setIsReplyShow] = useState(() => {
        const replys = postDetail?.comments?.filter((cmt) => cmt?.reply && cmt?.reply === props?.comment?._id && cmt?.user?.status === 'A');
        const isShow = replys?.some((cmt) => cmt._id === props?.params);

        return {
            replys: replys,
            show: isShow
        }
    });

    const handleCommentAction = (cmt = "", type = "") => {
        if (!cmt) {
            setIsLiked(!isLiked);
        }
        const data = cmt || props.comment;
        dispatch(comment({
            link: `${data?._id}/${type || (isLiked ? 'unlike' : 'like')}`, method: PATCH, isPostDetail: props?.isPostDetail
        }))
    }

    useEffect(() => {
        if (postDetail) {

            const replys = postDetail?.comments?.filter((cmt) => cmt?.reply && cmt?.reply === props?.comment?._id);
            if (replys?.length !== isReplyShow?.replys?.length) {
                setIsReplyShow({
                    replys: replys,
                    show: replys[replys?.length - 1]?.user?._id === user._id
                })
            } else {
                setIsReplyShow({
                    replys: replys,
                    show: isReplyShow?.show
                })
            }

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props?.comment])
    return (
        <CommentWrapper id={!props.simple ? props?.comment?._id?.toString() : undefined}>
            <Modal centered bodyStyle={{
                fontSize: '16px'
            }} visible={showConfirmDelete} footer={<Row justify="end">
                <Button size="large" onClick={() => {
                    setShowConfirmDelete(null)
                }} style={{
                    fontWeight: '600'
                }} type="link">H???y</Button>
                <Button size="large" className="q-button" onClick={() => {
                    dispatch(comment({
                        isPostDetail: true,
                        link: showConfirmDelete,
                        method: DELETE
                    }))
                    setShowConfirmDelete(null);
                }} type="primary">X??a</Button>
            </Row>} onCancel={() => {
                setShowConfirmDelete(null)
            }} destroyOnClose={true} title="B???n c?? mu???n x??a b??nh lu???n n??y?">
                Ch??ng t??i s??? x??a b??nh lu???n n??y, v?? nh???ng tr??? l???i b??nh lu???n n??y, b???n s??? kh??ng th??? kh??i ph???c n??.
            </Modal>
            <AvatarCard avatarHidden={props.simple} src={props?.comment?.user?.avatar?.url} content={<>
                <Row gutter={10} wrap={false}>
                    <Col flex={1}>
                        <span className="actor">
                            {props?.comment?.user?.username}
                            <i style={{
                                backgroundImage: "url('/assets/images/blue-check.png')",
                                backgroundSize: '15px',
                                marginLeft: '5px',
                                width: '15px',
                                height: '15px',
                                display: props?.comment?.user?.isAdmin ? "inline-block" : "none"
                            }}></i>
                        </span>
                        <span className="content">
                            {props?.comment?.content}
                        </span>
                        {!props.simple && <Row className="actions" gutter={10}>
                            <Col className="createdAt">
                                {timeAgo(props?.comment?.createdAt)}
                            </Col>
                            {!props?.onlyTime && <>
                                {props?.comment?.likes.length > 0 &&
                                    <Col className="likes">
                                        {props?.comment?.likes.length} l?????t th??ch
                                    </Col>
                                }
                                {props?.comment?.user?._id !== user._id && <Col className="reply" onClick={() => {
                                    props.onReply(props.comment)
                                }}>
                                    Tr??? l???i
                                </Col>}
                                <Col className="actions-more">
                                    <Popover overlayClassName='postActions' placement="bottom" content={<>
                                        <div className="postActions" >
                                            {user?._id === props?.comment?.user?._id && <Row onClick={() => {
                                                setShowConfirmDelete(props?.comment._id)
                                            }}>

                                                <Col style={{
                                                    fontSize: '14px'
                                                }
                                                } >
                                                    X??a b??nh lu???n
                                                </Col>
                                            </Row>}
                                            {user?._id !== props?.comment?.user?._id && <Row onClick={() => {
                                            }}>

                                                <Col style={{
                                                    fontSize: '14px'
                                                }
                                                } >
                                                    B??o c??o b??nh lu???n
                                                </Col>
                                            </Row>}
                                        </div>
                                    </>} trigger="click">
                                        <MoreOutlined style={{
                                            transform: 'rotate(90deg)'
                                        }} />
                                    </Popover>

                                </Col>
                            </>}
                        </Row>}
                    </Col>
                    {
                        !props?.onlyTime &&
                        <Col>
                            {isLiked ? <UnlikeIcon onClick={() => handleCommentAction()} /> : <LikeIcon onClick={() => handleCommentAction()} />}

                        </Col>
                    }
                </Row >
                {
                    isReplyShow.replys?.length > 0 && <>
                        <Row className="replys" gutter={10}>
                            <Col>
                                <div className="divider"></div>

                            </Col>
                            <Col onClick={() => setIsReplyShow({
                                ...isReplyShow,
                                show: !isReplyShow.show
                            })}>
                                {isReplyShow.show ? "???n c??u tr??? l???i" : `Xem c??u tr??? l???i(${isReplyShow.replys.length})`}
                            </Col>
                        </Row>
                        {isReplyShow.show && isReplyShow.replys.map((cmt) => cmt?.user?.status === 'A' && <CommentWrapper id={!props.simple && cmt._id}>
                            <AvatarCard avatarHidden={props.simple} src={cmt?.user?.avatar?.url} content={<>
                                <Row gutter={10} wrap={false}>
                                    <Col flex={1}>
                                        <span className="actor">
                                            {cmt?.user?.username}
                                            <i style={{
                                                backgroundImage: "url('/assets/images/blue-check.png')",
                                                backgroundSize: '15px',
                                                marginLeft: '5px',
                                                width: '15px',
                                                height: '15px',
                                                display: cmt?.user?.isAdmin ? "inline-block" : "none"
                                            }}></i>
                                        </span>
                                        <span className="content">
                                            {cmt?.content}
                                        </span>
                                        {!props.simple && <Row className="actions" gutter={10}>
                                            <Col className="createdAt">
                                                {timeAgo(cmt?.createdAt)}
                                            </Col>
                                            {!props?.onlyTime && <>
                                                {cmt?.likes.length > 0 &&
                                                    <Col className="likes">
                                                        {cmt?.likes.length} l?????t th??ch
                                                    </Col>
                                                }
                                                {cmt?.user?._id !== user._id && <Col className="reply" onClick={() => {
                                                    props.onReply({ ...props.comment, user: cmt.user })
                                                }}>
                                                    Tr??? l???i
                                                </Col>}
                                                <Col className="actions-more">
                                                    <Popover overlayClassName='postActions' placement="bottom" content={<>
                                                        <div className="postActions" >
                                                            {user?._id === cmt?.user?._id && <Row onClick={() => {
                                                                setShowConfirmDelete(props?.comment._id)
                                                            }}>
                                                                <Col>
                                                                    <DeleteOutlined />
                                                                </Col>
                                                                <Col>
                                                                    X??a b??nh lu???n
                                                                </Col>
                                                            </Row>}
                                                            {user?._id !== cmt?.user?._id && <Row onClick={() => {
                                                            }}>
                                                                <Col>
                                                                    <WarningOutlined />
                                                                </Col>
                                                                <Col>
                                                                    B??o c??o b??nh lu???n
                                                                </Col>
                                                            </Row>}
                                                        </div>
                                                    </>} trigger="click">
                                                        <MoreOutlined style={{
                                                            transform: 'rotate(90deg)'
                                                        }} />
                                                    </Popover>

                                                </Col>
                                            </>}
                                        </Row>}
                                    </Col>
                                    {!props?.onlyTime &&
                                        <Col>
                                            {cmt?.likes?.includes(user._id) ? <UnlikeIcon onClick={() => handleCommentAction(cmt, 'unlike')} /> : <LikeIcon onClick={() => handleCommentAction(cmt, 'like')} />}

                                        </Col>
                                    }
                                </Row>
                            </>
                            }></AvatarCard>
                        </CommentWrapper>)
                        }
                    </>
                }
            </>
            }></AvatarCard >
        </CommentWrapper >
    )
}

Comment.propTypes = {
    comment: PropTypes.object,
}

Comment.defaultProps = {
    simple: true
}


export default Comment