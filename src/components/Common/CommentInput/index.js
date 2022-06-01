import React from 'react'
import PropTypes from 'prop-types'
import { CommentInputWrapper } from './CommentInput.style'
import { Button, Col, Input, Row } from 'antd'
import { EmojiIcon } from '../../../assets/icon'

const CommentInput = props => {
  return (
      <CommentInputWrapper>
            <Input bordered={false} placeholder="Thêm bình luận" prefix={<EmojiIcon/>} suffix={<Button type="link">Đăng</Button>}></Input>
      </CommentInputWrapper>
  )
}

CommentInput.propTypes = {
}


export default CommentInput