import React, { useEffect, useState } from 'react'
import AvatarCard from '../AvatarCard'
import { CommentWrapper } from './Comment.style'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import { LikeIcon, UnlikeIcon } from '../../../assets/icon'
import { useDispatch, useSelector } from 'react-redux'
import { comment } from '../../../redux/post/action'
import { PATCH } from '../../../constants'
import { timeAgo } from '../../../utils/time_utils'
import { MoreOutlined } from '@ant-design/icons'

const Comment = (props) => {

    const { user } = useSelector((state) => state.auth)
    const { postDetail } = useSelector((state) => state.post)
    const dispatch = useDispatch();
    const [isLiked, setIsLiked] = useState(!!props?.comment?.likes?.includes(user._id));
    const [isReplyShow, setIsReplyShow] = useState(() => {
        const replys = postDetail?.comments?.filter((cmt) => cmt?.reply && cmt?.reply === props?.comment?._id);
        console.log(replys, props?.params)
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
            link: `${data._id}/${type || (isLiked ? 'unlike' : 'like')}`, method: PATCH, isPostDetail: props?.isPostDetail
        }))
    }




    useEffect(() => {
        if (postDetail) {

            const replys = postDetail?.comments?.filter((cmt) => cmt?.reply && cmt?.reply === props?.comment?._id);
            console.log(replys);
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
        <CommentWrapper id={!props.simple && props?.comment._id}>
            <AvatarCard avatarHidden={props.simple} src={props?.comment?.user?.avatar?.url} content={<>
                <Row gutter={10} wrap={false}>
                    <Col flex={1}>
                        <span className="actor">
                            {props?.comment?.user?.username}
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
                                        {props?.comment?.likes.length} lượt thích
                                    </Col>
                                }
                                <Col className="reply" onClick={() => {
                                    props.onReply(props.comment)
                                }}>
                                    Trả lời
                                </Col>
                                <Col className="actions-more">
                                    <MoreOutlined style={{
                                        transform: 'rotate(90deg)'
                                    }} />
                                </Col>
                            </>}
                        </Row>}
                    </Col>
                    {!props?.onlyTime &&
                        <Col>
                            {isLiked ? <UnlikeIcon onClick={() => handleCommentAction()} /> : <LikeIcon onClick={() => handleCommentAction()} />}

                        </Col>
                    }
                </Row>
                {isReplyShow.replys?.length > 0 && <>
                    <Row className="replys" gutter={10}>
                        <Col>
                            <div className="divider"></div>

                        </Col>
                        <Col onClick={() => setIsReplyShow({
                            ...isReplyShow,
                            show: !isReplyShow.show
                        })}>
                            {isReplyShow.show ? "Ẩn câu trả lời" : `Xem câu trả lời(${isReplyShow.replys.length})`}
                        </Col>
                    </Row>
                    {isReplyShow.show && isReplyShow.replys.map((cmt) => <CommentWrapper id={!props.simple && cmt._id}>
                        <AvatarCard avatarHidden={props.simple} src={cmt?.user?.avatar?.url} content={<>
                            <Row gutter={10} wrap={false}>
                                <Col flex={1}>
                                    <span className="actor">
                                        {cmt?.user?.username}
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
                                                    {cmt?.likes.length} lượt thích
                                                </Col>
                                            }
                                            <Col className="reply" onClick={() => {
                                                props.onReply({ ...props.comment, user: cmt.user })
                                            }}>
                                                Trả lời
                                            </Col>
                                            <Col className="actions-more">
                                                <MoreOutlined style={{
                                                    transform: 'rotate(90deg)'
                                                }} />
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
                </>}
            </>
            }></AvatarCard>
        </CommentWrapper>
    )
}

Comment.propTypes = {
    comment: PropTypes.object,
}

Comment.defaultProps = {
    simple: true
}


export default Comment