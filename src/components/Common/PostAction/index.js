import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {Row,Col} from 'antd'
import { CommentIcon, DirectIcon, LikeIcon, SaveIcon, UnlikeIcon } from '../../../assets/icon';
import { postAction } from '../../../redux/post/action';
import {useSelector,useDispatch} from 'react-redux'
import styled from 'styled-components';
const PostActionWrapper = styled.div`
border-top: 1px solid rgba(0,0,0,0.2);
.actions{
    padding: 1.5rem 0 .5rem 0;
    svg{
        width: 28px;
        height: 28px;
        cursor: pointer;
    }
}

.stats{
    font-weight: 600;
    font-size:1.6rem;
}
`;

const PostAction = ({post,setIsDetailPostShow,isPostDetail}) => {
    const {user} = useSelector((state)=>state.auth);
    const [isLiked,setIsLiked]= useState(!!post?.likes?.includes(user._id))
   
    const dispatch = useDispatch();
  return (<PostActionWrapper>
  <Row justify="space-between" align="middle"className="actions">
                <Col >
                                            <Row gutter={[12,12]}>
                                                <Col>

                                                {isLiked ? <UnlikeIcon className="jello-horizontal" onClick={()=>{
                                                    setIsLiked(!isLiked);
                                                    dispatch(postAction({
                                                        type:'unlike',
                                                        id: post?._id,
                                                        isPostDetail
                                                    }))
                                                }}/>: <LikeIcon  onClick={()=>{
                                                    setIsLiked(!isLiked);
                                                        dispatch(postAction({
                                                            type:'like',
                                                            id: post?._id,
                                                            isPostDetail
                                                        }))
                                                    }}/>}
                                                    
                                                </Col>
                                                <Col>
                                                    <CommentIcon onClick={()=>{
                                                        if(setIsDetailPostShow){

                                                            setIsDetailPostShow(post?._id)
                                                        }
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
                                            {post?.likes?.length===0?' Hãy là người đầu tiên thích bài viết này ':post?.likes?.length+` lượt thích`}
                                        </Col>
                                    </Row>
  </PostActionWrapper>
  )
}

PostAction.propTypes = {}

export default PostAction