import { Button, Col, Form, Input, Row } from 'antd';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { CloseOutlined, SaveOutlined } from '../../../../components/icons';
import { updateProfile } from '../../../../redux/auth/action';

const StoryWrapper = styled.div`
    textarea{
        text-align: center!important;
    }
`;

const Story = props => {
    const {loading,user} = useSelector((state)=>state.auth);
    const textRef = useRef();
    const dispatch = useDispatch();

    const handleOnUpdateStory = (values)=>{
       
        if(values) {
            dispatch(updateProfile(values))
        }
    }

  return (
    <StoryWrapper>
        <Form onFinish={handleOnUpdateStory}>
            <Form.Item name="story" rules={[
                {
                    max: 100,
                    message: 'Vui lòng nhập nhỏ hơn 100 ký tự'
                }
            ]}>
                <Input.TextArea defaultValue={user?.story} ref={textRef}  showCount maxLength={100}  autoSize={{
                minRows: 6,
                maxRows: 6
            }}  style={{
                width: '100%'
            }}>
            </Input.TextArea>
            </Form.Item>
            <Row gutter={16} style={{
            marginTop: '40px',
        }} justify="end">
            <Col span={24}>
            <Button size="large" style={{
                width: '100%',
            }} type="primary" loading={loading}  htmlType="submit" icon={<SaveOutlined/>}>Lưu</Button>
            </Col>
        </Row>
        </Form>
        
    </StoryWrapper>
  )
}

Story.propTypes = {}

export default Story