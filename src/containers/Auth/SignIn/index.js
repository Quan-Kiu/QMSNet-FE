import { Button, Divider, Form, Input } from 'antd'
import React from 'react'
import { AuthWrapper } from '../Auth.style'
import { MailOutlined,LockOutlined,FacebookOutlined} from '@ant-design/icons'
import Box from '../../../components/Common/Box'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginStart } from '../../../redux/auth/action'

const SignIn = () => {
const [form] = Form.useForm();
  const dispatch = useDispatch();
  const {loading} = useSelector((state)=>state.auth);

  const handleOnFinishForm = (values)=>{
    dispatch(loginStart(values))
  }

  return (
    <AuthWrapper>
        <div className="pseudo"></div>
        <video autoPlay muted loop id="myVideo">
            <source src="/assets/video/video-bg.mp4" type="video/mp4"/>
        </video>
        <Box width="400px" className="">
            <img className="main__box__logo" src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="" />
            
            <Form form={form} onFinish={handleOnFinishForm} name="horizontal_login" layout="horizontal" >
      <Form.Item
        name="email"
        rules={[{type:"email", required: true, message: 'Vui lòng nhập Email!' }]}
      >
        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              !!form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Log in
          </Button>
        )}
      </Form.Item>
      <Divider>Hoặc</Divider>
      <div className="social__button">
      <FacebookOutlined /> Đăng nhập bằng Facebook
      </div>
      <div className="forgot__button">
          <Link to={''}>
            Quên mật khẩu
          </Link>  
      </div>
    </Form>
        </Box>

    <Box width="400px" style={{
        marginTop: '2rem',
        padding: '3rem'
    }}>
        <div className="navigate">
            Bạn chưa có tài khoản ư? <Link to={'/signup'}>Đăng ký</Link>   
        </div>   
    </Box>
    </AuthWrapper>
  )
}

export default SignIn