import { LeftCircleFilled, MoreOutlined, RightCircleFilled } from '@ant-design/icons'
import { Button, Carousel, Col, Row } from 'antd'
import React, { useRef } from 'react'
import { CommentIcon, DirectIcon, LikeIcon, SaveIcon, UnlikeIcon } from '../../../assets/icon'
import { comments } from '../../../data/comment'
import AvatarCard from '../AvatarCard'
import Box from '../Box'
import Comment from '../Comment'
import CommentInput from '../CommentInput'
import { PostWrapper } from './Post.style'
import PropTypes from 'prop-types'
import { timeAgo } from '../../../utils/time_utils'
import {useDispatch, useSelector} from 'react-redux'
import { postAction } from '../../../redux/post/action'


const Post = ({post}) => {
    const carouselRef = useRef();
    const {user} = useSelector((state)=>state.auth);
    const isLiked = post.likes.includes(user._id);
    const dispatch = useDispatch();
  return (
      <PostWrapper>

    <Box className={'post__container'}>
                                <AvatarCard src={post?.user?.avatar?.url} content={
                                    <Row align="middle" justify="space-between">
                                        <div className="info">
                                            <div className="username">{post?.user?.username}</div>
                                            <div className="createdAt">{timeAgo(post?.createdAt,false)}</div>
                                        </div>
                                        <div className="event">
                                            <MoreOutlined style={{
                                                transform: 'rotate(90deg)'
                                            }}/>
                                        </div>
                                    </Row>  
                                }>

                                    <div style={{
                                        background: post?.styles?.background,
                                        color: post?.styles?.color,
                                    }} className={`text-content ${post?.styles?.background!=="#fff" && 'with-style'}`} >
                                    {post?.content}
                                    </div>
                                    {post?.media?.length>0 && <div className="media-content">
                                        <Carousel ref={carouselRef}>
                                            {post?.media.map((media)=> media?.url.match('/image/')? <img src={media?.url} alt={media?.url} />:<video controls  >
                                                        <source src={media?.url} type="video/mp4"/>
                                                    </video>)}
                                        </Carousel>
                                        {post.media.length > 1 && <> <Button className="actions next" type="text" onClick={()=>{
                                        carouselRef.current.next();
                                        }}><RightCircleFilled /></Button>
                                        <Button className="actions prev" type="text" onClick={()=>{
                                        carouselRef.current.prev();
                                        }}><LeftCircleFilled /></Button></>}
                                       
                                    </div>}
                                    <Row justify="space-between" align="middle"className="actions">
                                        <Col >
                                            <Row gutter={[12,12]}>
                                                <Col>

                                                {isLiked ? <UnlikeIcon className="jello-horizontal" onClick={()=>{
                                                    dispatch(postAction({
                                                        type:'unlike',
                                                        id: post._id
                                                    }))
                                                }}/>: <LikeIcon  onClick={()=>{
                                                        dispatch(postAction({
                                                            type:'like',
                                                            id: post._id
                                                        }))
                                                    }}/>}
                                                    
                                                </Col>
                                                <Col>
                                                    <CommentIcon/>
                                                </Col>
                                                <Col>
                                                    <DirectIcon/>
                                                </Col>
                                            </Row>
                                            
                                        </Col>
                                        <Col >
                                        <SaveIcon/>
                                        </Col>
                                    </Row>
                                    <Row className="stats">
                                        <Col span={24}>
                                            {post?.likes.length===0?' Hãy là người đầu tiên thích bài viết này ':post?.likes.length+` lượt thích`}
                                        </Col>
                                    </Row>

                                    <div className="post__comment">
                                    {post?.comments?.length>2 ? <div className="post__comment__stats">
                                            Xem tất cả {post?.comments?.length} bình luận
                                        </div>: <div className="post__comment__stats">
                                            Hãy là người đầu tiên bình luận bài viết này
                                        </div>}
                                        
                                        {post?.comments?.slice(
                                post.comments.length - 2,
                                post.comments.length
                            ).map((cmt)=><Comment comment={cmt}/>)}
                                        
                                    </div>
                                   
                                    <CommentInput post={post}/>
                                </AvatarCard>
                            </Box>
      </PostWrapper>
  )
}

CommentInput.propTypes = {
    post: PropTypes.object
}


export default Post