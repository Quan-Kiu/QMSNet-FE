import { Button, Divider, Form, Input } from 'antd'
import React from 'react'
import Box from '../../../components/Common/Box'
import { AuthWrapper } from '../Auth.style'
import { FacebookOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { register } from '../../../redux/auth/action'

const SignUp = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    dispatch(register(values))
  }
  return (
    <AuthWrapper>
      <div className="pseudo"></div>
      <video autoPlay muted loop id="myVideo">
        <source src="/assets/video/video-bg.mp4" type="video/mp4" />
      </video>
      <Box width="400px" className="">
        <img className="main__box__logo" src="/assets/images/logo.png" alt="" />
        <div className="title">
          Đăng ký để xem ảnh và video từ bạn bè.
        </div>
        <Button type="ghost" style={{
          margin: '2rem 0',
        }}>
          <div className="social__button">
            <FacebookOutlined /> Đăng nhập bằng Facebook
          </div>
        </Button>
        <Form form={form} onFinish={onSubmit} name="horizontal_login" layout="horizontal" >
          <Form.Item
            name="email"
            rules={[{ type: "email", required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="fullname"
            rules={[{ required: true, message: 'Vui lòng nhập tên đầy đủ!' }]}
          >
            <Input placeholder="Tên đầy đủ" />
          </Form.Item>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
          >
            <Input placeholder="Tên người dùng" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !form.isFieldsTouched(true) ||
                  !!form.getFieldsError().filter(({ errors }) => errors.length).length
                }
              >
                Đăng ký
              </Button>
            )}
          </Form.Item>
          <p>Bằng cách đăng ký, bạn đồng ý với <Link to="/">Điều khoản</Link>, <Link to="/">Chính sách dữ liệu</Link> và <Link to="/">Chính sách cookie</Link> của chúng tôi.</p>

        </Form>
      </Box>

      <Box width="400px" style={{
        marginTop: '2rem',
        padding: '3rem'
      }}>
        <div className="navigate">
          Bạn chưa có tài khoản ư? <Link to={'/'}>Đăng nhập</Link>
        </div>
      </Box>
    </AuthWrapper>
  )
}

export default SignUp