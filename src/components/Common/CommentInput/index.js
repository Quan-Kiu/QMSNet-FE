import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { CommentInputWrapper } from './CommentInput.style'
import { Button, Col, Form, Input, Row } from 'antd'
import { EmojiIcon } from '../../../assets/icon'
import { useDispatch } from 'react-redux'
import { comment } from '../../../redux/post/action'
import { POST } from '../../../constants'
import ChooseEmoji from '../ChooseEmoji'

const CommentInput = props => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const [form]= Form.useForm();
  const handleOnSubmit = (values)=>{
   
    dispatch(comment({
      link: 'create',
      data: values,
      method: POST,
      isPostDetail: props?.isPostDetail
    }))
  }

  const setContent = (values)=>{
    inputRef.current.input.defaultValue += values;
  }

  return (
      <CommentInputWrapper className="comment-input">
        <Form form={form} initialValues={{
          postId: props?.post?._id
        }} onFinish={handleOnSubmit}>
          <Form.Item hidden name="postId" >
            <Input></Input>
          </Form.Item>
          <Form.Item name="content">
            <Input bordered={false}  ref={inputRef} placeholder="Thêm bình luận" prefix={<ChooseEmoji id="comment-emoji" setContent={setContent} />} suffix={<Button htmlType="submit" type="link">Đăng</Button>}></Input>
          </Form.Item>
        </Form>
      </CommentInputWrapper>
  )
}

CommentInput.propTypes = {
}


export default CommentInput