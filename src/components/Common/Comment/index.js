import React, { useState } from 'react'
import AvatarCard from '../AvatarCard'
import { CommentWrapper } from './Comment.style'
import PropTypes from 'prop-types'
import { Row,Col } from 'antd'
import { LikeIcon, UnlikeIcon } from '../../../assets/icon'
import { useDispatch, useSelector } from 'react-redux'
import { comment } from '../../../redux/post/action'
import { PATCH } from '../../../constants'
import { timeAgo } from '../../../utils/time_utils'
import { MoreOutlined } from '@ant-design/icons'

const Comment = (props) => {



const {user} = useSelector((state)=>state.auth)
const dispatch = useDispatch();
const [isLiked,setIsLiked] = useState(!!props?.comment?.likes?.includes(user._id)) ;

const handleCommentAction = ()=>{
    setIsLiked(!isLiked);
    
    dispatch(comment({
       link: `${props?.comment._id}/${isLiked?'unlike':'like'}`,method:PATCH,isPostDetail: props?.isPostDetail
    }))
}
  return (
      <CommentWrapper>
          <AvatarCard avatarHidden={props.simple} src={props?.comment?.user?.avatar?.url}  content={<Row gutter={10} wrap={false}>
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
                <Col className="reply">
                    Trả lời
                </Col>
                <Col className="actions-more">
                    <MoreOutlined style={{
                        transform: 'rotate(90deg)'
                    }}/>
                </Col>
                </>}
            </Row>}
              </Col>
              {!props?.onlyTime &&
              <Col>
                   {isLiked ? <UnlikeIcon onClick={handleCommentAction}/> : <LikeIcon onClick={handleCommentAction}/>}
                   
              </Col>
          }
          </Row>}></AvatarCard>
      </CommentWrapper>
  )
}

Comment.propTypes = {
    comment: PropTypes.object,
}

Comment.defaultProps = {
    simple:true
}


export default Comment