import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { PostModalWrapper } from './PostModal.style'
import { Col, Row, Skeleton } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getPost } from '../../../redux/post/action'
import Carousel from '../../../components/Common/Carousel'
import AvatarCard from '../../../components/Common/AvatarCard'
import { timeAgo } from '../../../utils/time_utils'
import { MoreOutlined } from '@ant-design/icons'
import CommentInput from '../../../components/Common/CommentInput'
import Comment from '../../../components/Common/Comment'
import PostAction from '../../../components/Common/PostAction'

const PostModal = props => {
    const {postDetail,postDetailLoading} = useSelector((state) => state.post)
    const isSimplePost =postDetail?.styles?.background === '#fff' && postDetail?.media?.length===0;
    const dispatch = useDispatch();


    useEffect(() =>{
        if(props.id !== postDetail?._id){
            dispatch(getPost(props.id))
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.id])
  return (
    <PostModalWrapper gutter={[32,32]}>
        {postDetailLoading ? 
        <>
        {!isSimplePost && <Col span={16} className="left">
        <Skeleton.Avatar loading={true} size={"large"} shape={"square"} />
        </Col>}
        <Col span={isSimplePost?24:8} className="right">
        <Skeleton avatar paragraph={{ rows: 10 }} />
        </Col>
        </>
         :<> {!isSimplePost && <Col span={16} className="left">
            {postDetail?.styles?.background!=="#fff" ? <div style={postDetail?.styles} className="content-with-style">
                {postDetail?.content}
            </div>
            :
            <Carousel media={postDetail?.media}/>
            }
        </Col>}
        <Col span={isSimplePost?24:8} className="right">
        <AvatarCard className="post-detail-header" src={postDetail?.user?.avatar?.url} content={
                                    <Row align="middle" justify="space-between" style={{
                                        
                                        padding: '1rem 0'
                                    }}>
                                        <div className="info">
                                            <div className="username">{postDetail?.user?.username}</div>
                                            <div className="createdAt">{timeAgo(postDetail?.createdAt,false)}</div>
                                        </div>
                                        <div className="event">
                                            <MoreOutlined style={{
                                                transform: 'rotate(90deg)'
                                            }}/>
                                        </div>
                                    </Row>  
                                }/>
                                
                                <div className="comments">
                                    {postDetail?.content && postDetail.styles.background==='#fff'&&
                                    <Comment simple={false} comment={{
                                        user: postDetail?.user,
                                        createdAt: postDetail?.createdAt,
                                        content: postDetail?.content

                                    }} onlyTime={true}/>}
                                    {postDetail?.comments?.map((cmt)=> <Comment simple={false} isPostDetail={true} comment={cmt}/>)}
                                </div>
                                <PostAction isPostDetail={true} post={postDetail} />
                                <CommentInput post={postDetail} isPostDetail={true}/>
        </Col></>}
        
    </PostModalWrapper>
  )
}

PostModal.propTypes = {}

export default PostModal