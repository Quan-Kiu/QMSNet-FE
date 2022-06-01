import { SearchOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Input, Modal, Row } from 'antd'
import React, { useState } from 'react'
import { CreateIcon } from '../../../../assets/icon'
import { HeaderWrapper } from './Header.style'



const Header = props => {
  const [isNewPostModalShow,setIsNewPostModalShow]=useState(false);

  const handleShowModal = ()=>{
    setIsNewPostModalShow(true)
  }

  const handleCancelModal = ()=>{
    setIsNewPostModalShow(false)
  }

  return (
    <HeaderWrapper>
      <Modal wrapClassName="new-post-modal"  title="Tạo bài viết"  onOk={handleShowModal} onCancel={handleCancelModal} visible={isNewPostModalShow} width={600} footer={<Button className="q-button" type="primary">Đăng</Button>}>
            content
      </Modal>
      <Row gutter={36} justify="space-between" align="middle" className="header__content" >
        <Col className="header__content__logo">
          <img src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="" />

        </Col>
        <Col className="header__content__func">
            <Row gutter={10}>
              <Col className="header__content__func__search">
                  <Input size="large" prefix={<SearchOutlined />} placeholder="Tìm kiếm" ></Input>
              </Col>

              <Col className="header__content__func__create-post">
                  <Button onClick={handleShowModal} size="large" type="primary" >
                  <CreateIcon  />
                    Tạo bài viết
                  </Button>

              </Col >
              <Col className="header__content__func__profile">
                  <Avatar size="large" src="https://instagram.fsgn8-2.fna.fbcdn.net/v/t51.2885-19/259676907_471643571156945_1331133705939004080_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fsgn8-2.fna.fbcdn.net&_nc_cat=105&_nc_ohc=92EGNjWV2OQAX-FjSGG&edm=ABfd0MgBAAAA&ccb=7-5&oh=00_AT-dKN1l5cj6JCXBUxmtg_leZ4tv7uWBjKOsLBKCrYuWUg&oe=629A7B7B&_nc_sid=7bff83" />
              </Col>

            </Row>
        </Col>


      </Row>
    </HeaderWrapper>
  )
}

Header.propTypes = {}

export default Header