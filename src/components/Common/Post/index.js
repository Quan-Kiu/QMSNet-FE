import { MoreOutlined } from '@ant-design/icons'
import { Modal, Row } from 'antd'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PostModal from '../../../containers/Post/PostModal'
import { setDetailModal, setPostDetail } from '../../../redux/post/action'
import { setUserDetail } from '../../../redux/user/action'
import { timeAgo } from '../../../utils/time_utils'
import AvatarCard from '../AvatarCard'
import Box from '../Box'
import Carousel from '../Carousel'
import Comment from '../Comment'
import CommentInput from '../CommentInput'
import PostAction from '../PostAction'
import { PostWrapper } from './Post.style'


const Post = ({ post, isPostDetail }) => {
    const dispatch = useDispatch();
    return (<>
        <PostWrapper>

            <Box className={'post__container'}>
                <AvatarCard src={post?.user?.avatar?.url} content={
                    <Row align="middle" justify="space-between">
                        <div className="info">
                            <div onClick={() => {
                                dispatch(setUserDetail(post?.user));
                            }} className="username">{post?.user?.username}</div>
                            <div className="createdAt">{timeAgo(post?.createdAt, false)}</div>
                        </div>
                        <div className="event">
                            <MoreOutlined style={{
                                transform: 'rotate(90deg)'
                            }} />
                        </div>
                    </Row>
                }>

                    <div style={{
                        background: post?.styles?.background,
                        color: post?.styles?.color,
                    }} className={`text-content ${post?.styles?.background !== "#fff" && 'with-style'}`} >
                        {post?.content}
                    </div>
                    <Carousel media={post?.media} />
                    <PostAction post={post} />

                    <div className="post__comment">
                        {post?.comments?.length > 0 ? <div className="post__comment__stats" onClick={() => {
                            dispatch(setDetailModal(post?._id))
                        }}>
                            Xem tất cả {post?.comments?.length} bình luận
                        </div> : <div className="post__comment__stats">
                            Hãy là người đầu tiên bình luận bài viết này
                        </div>}

                        {post?.comments?.slice(
                            post.comments.length - 2,
                            post.comments.length
                        ).map((cmt) => <Comment comment={cmt} />)}

                    </div>
                    {!isPostDetail && <CommentInput post={post} />}

                </AvatarCard>
            </Box>
        </PostWrapper>
    </>
    )
}

CommentInput.propTypes = {
    post: PropTypes.object
}


export default Post