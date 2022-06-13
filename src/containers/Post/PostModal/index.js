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

const PostModal = props => {
    const {postDetail,postDetailLoading} = useSelector((state) => state.post)
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
        <Col span={16}>
        <Skeleton.Avatar loading={true} size={"large"} shape={"square"} />
        </Col>
        <Col span={18}>
        <Skeleton avatar paragraph={{ rows: 10 }} />
        </Col>
        </>
         :<><Col span={16}>
            <Carousel media={postDetail?.media}/>
        </Col>
        <Col span={8}>
        <AvatarCard src={postDetail?.user?.avatar?.url} content={
                                    <Row align="middle" justify="space-between">
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
                                <div style={{
                                        background: postDetail?.styles?.background,
                                        color: postDetail?.styles?.color,
                                    }} className={`text-content ${postDetail?.styles?.background!=="#fff" && 'with-style'}`} >
                                    {postDetail?.content}
                                </div>
                                <div className="comments">
                                    {postDetail?.comments?.map((cmt)=> <Comment simple={false} comment={cmt}/>)}
                                </div>
                                <CommentInput post={postDetail}/>
        </Col></>}
        
    </PostModalWrapper>
  )
}

PostModal.propTypes = {}

export default PostModal