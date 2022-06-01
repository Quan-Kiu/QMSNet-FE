import { MoreOutlined } from '@ant-design/icons'
import { Carousel, Col, Row } from 'antd'
import React from 'react'
import { CommentIcon, DirectIcon, LikeIcon, SaveIcon } from '../../../assets/icon'
import { comments } from '../../../data/comment'
import AvatarCard from '../AvatarCard'
import Box from '../Box'
import Comment from '../Comment'
import CommentInput from '../CommentInput'
import { PostWrapper } from './Post.style'
import PropTypes from 'prop-types'
import { timeAgo } from '../../../utils/time_utils'



const Post = ({post}) => {
  return (
      <PostWrapper>

    <Box className={'post__container'}>
                                <AvatarCard  content={
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
                                    <div className="text-content">
                                    {post?.content}
                                    </div>
                                    <div className="media-content">
                                        <Carousel afterChange={()=>{}}>
                                            {post?.images.map((img)=><img src={img?.url} alt={img?.url} />)}
                                        </Carousel>
                                    </div>
                                    <Row justify="space-between" align="middle"className="actions">
                                        <Col >
                                            <Row gutter={[12,12]}>
                                                <Col>
                                                    <LikeIcon/>
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
                                            {post?.likes.length+` lượt thích`}
                                        </Col>
                                    </Row>

                                    <div className="post__comment">
                                        <div className="post__comment__stats">
                                            Xem tất cả 126 bình luận
                                        </div>
                                        <Comment comment={comments[0]}/>
                                        <Comment comment={comments[1]}/>
                                        
                                    </div>
                                   
                                    <CommentInput/>
                                </AvatarCard>
                            </Box>
      </PostWrapper>
  )
}

CommentInput.propTypes = {
    post: PropTypes.object
}


export default Post