import { MoreOutlined } from '@ant-design/icons'
import { Col, Modal, Row } from 'antd'
import PropTypes from 'prop-types'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CommentIcon, DirectIcon, LikeIcon, SaveIcon, UnlikeIcon } from '../../../assets/icon'
import PostModal from '../../../containers/Post/PostModal'
import { postAction, setPostDetail } from '../../../redux/post/action'
import { timeAgo } from '../../../utils/time_utils'
import AvatarCard from '../AvatarCard'
import Box from '../Box'
import Carousel from '../Carousel'
import Comment from '../Comment'
import CommentInput from '../CommentInput'
import PostAction from '../PostAction'
import { PostWrapper } from './Post.style'


const Post = ({post}) => {
   const dispatch = useDispatch();
   const {postDetail} = useSelector(state=>state.post);
    const [isDetailPostShow,setIsDetailPostShow]= useState(null);
    return (<>
  <Modal afterClose={()=>{
      dispatch(setPostDetail(null));
}} width={`${postDetail?.styles?.background === '#fff' && postDetail?.media?.length===0 ?'50%':'90%'}`} bodyStyle={{
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
                                    <PostAction setIsDetailPostShow={setIsDetailPostShow} post={post}/>

                                    <div className="post__comment">
                                    {post?.comments?.length>0 ? <div className="post__comment__stats" onClick={()=>{
                                        dispatch(setIsDetailPostShow(post?._id))
                                    }}>
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