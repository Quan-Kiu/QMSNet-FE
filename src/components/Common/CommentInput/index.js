import { Button, Form, Input } from 'antd'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { POST } from '../../../constants'
import { comment } from '../../../redux/post/action'
import ChooseEmoji from '../ChooseEmoji'
import { CommentInputWrapper } from './CommentInput.style'

const CommentInput = props => {
  const dispatch = useDispatch();
  const [form]= Form.useForm();
  const {user} = useSelector(state=>state.auth);
  const [isDisableButton,setIsDisableButton] = useState(true);
  const handleOnSubmit = (values)=>{
    
    dispatch(comment({
      link: 'create',
      data: values,
      method: POST,
      isPostDetail: props?.isPostDetail
    }))
    form.setFieldsValue({
      content: ""
    })
  }

  const setContent = (values)=>{
    if(isDisableButton){
      setIsDisableButton(false)
    }
    form.setFieldsValue({
      content: (form.getFieldValue('content')||"")+values
    })
    
  }

  return (
      <CommentInputWrapper className="comment-input">
        <Form form={form}  initialValues={{
          postId: props?.post?._id
        }} onFinish={handleOnSubmit}>
          <Form.Item hidden name="postId" >
            <Input></Input>
          </Form.Item>
          <Form.Item style={{
          marginBottom: '0'
        }} name="content" rules={[
            {
              validator: (_,values)=>{
                if(!values.trim()){
                  if(!isDisableButton){

                    setIsDisableButton(true)
                  }
                }else{
                  if(isDisableButton){
                    setIsDisableButton(false)
                  }
                }
                return Promise.resolve();
              }
            }
          ]}>
            <Input bordered={false} required  placeholder="Thêm bình luận" prefix={<ChooseEmoji id={`comment-emoji-${props?.post?._id+Math.random()}`} setContent={setContent} />} suffix={<Button htmlType="submit" disabled={isDisableButton} type="link">Đăng</Button>}></Input>
          </Form.Item>
        </Form>
      </CommentInputWrapper>
  )
}

CommentInput.propTypes = {
}


export default CommentInput