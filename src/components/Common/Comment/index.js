import React from 'react'
import AvatarCard from '../AvatarCard'
import { CommentWrapper } from './Comment.style'
import PropTypes from 'prop-types'
import { Row,Col } from 'antd'
import { LikeIcon } from '../../../assets/icon'

const Comment = (props) => {
  return (
      <CommentWrapper>
          <AvatarCard avatarHidden={true} src='' content={<Row wrap={false}>
              <Col flex={1}>
            <span className="actor">
                {props?.comment?.user?.username}
            </span>
            <span className="content">
                {props?.comment?.content}
            </span>
              </Col>
              <Col>
                    <LikeIcon/>
              </Col>
          </Row>}></AvatarCard>
      </CommentWrapper>
  )
}

Comment.propTypes = {
    comment: PropTypes.object,
}


export default Comment