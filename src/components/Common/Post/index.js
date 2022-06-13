import { MoreOutlined } from '@ant-design/icons'
import { Col, Modal, Row } from 'antd'
import PropTypes from 'prop-types'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CommentIcon, DirectIcon, LikeIcon, SaveIcon, UnlikeIcon } from '../../../assets/icon'
import PostModal from '../../../containers/Post/PostModal'
import { postAction } from '../../../redux/post/action'
import { timeAgo } from '../../../utils/time_utils'
import AvatarCard from '../AvatarCard'
import Box from '../Box'
import Carousel from '../Carousel'
import Comment from '../Comment'
import CommentInput from '../CommentInput'
import { PostWrapper } from './Post.style'


const Post = ({post}) => {
    const carouselRef = useRef();
    const navigate = useNavigate();
    const {user} = useSelector((state)=>state.auth);
    const [isLiked,setIsLiked]= useState(!!post.likes.includes(user._id))
    const dispatch = useDispatch();
    const [isDetailPostShow,setIsDetailPostShow]= useState(null);
  return (<>
  <Modal width={'90%'} bodyStyle={{
    padding: '0 10px'
  }} centered={true} closable={false} onCancel={()=>{setIsDetailPostShow(null)}} destroyOnClose={true} className='post-modal' visible={isDetailPostShow} footer={null} title={null}>
       <PostModal id={isDetailPostShow}/>
  </Modal>
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
                                    <Carousel media={post?.media}/>
                                    <Row justify="space-between" align="middle"className="actions">
                                        <Col >
                                            <Row gutter={[12,12]}>
                                                <Col>

                                                {isLiked ? <UnlikeIcon className="jello-horizontal" onClick={()=>{
                                                    setIsLiked(!isLiked);
                                                    dispatch(postAction({
                                                        type:'unlike',
                                                        id: post._id
                                                    }))
                                                }}/>: <LikeIcon  onClick={()=>{
                                                    setIsLiked(!isLiked);
                                                        dispatch(postAction({
                                                            type:'like',
                                                            id: post._id
                                                        }))
                                                    }}/>}
                                                    
                                                </Col>
                                                <Col>
                                                    <CommentIcon onClick={()=>{
                                                        setIsDetailPostShow(post._id)
                                                    }}/>
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
</>
  )
}

CommentInput.propTypes = {
    post: PropTypes.object
}


export default Post