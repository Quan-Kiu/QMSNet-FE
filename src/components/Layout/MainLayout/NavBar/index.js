import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { NavBarWrapper } from './NavBar.style'
import { Col, Input, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ContactIcon, HomeIcon, MessageIcon, NotifyIcon, SearchIcon, SettingIcon } from '../../../../assets/icon'
import {SearchOutlined} from '@ant-design/icons';

const NavBarItem = props =>{
    const navigate =  useNavigate();
    return (
        <Row gutter={24} onClick={()=>{
            console.log(props.label);
            props.setActiveKey(props.label)
            if(props?.path){
                navigate(props.path);
            }
            if(props?.onClick){
                props.onClick();
            }
        }} className={`navbar-item ${props.active?'active':'unActive'} ${props.popup?'popup':'nonpopup'}` }>
            <Col lg={6} md={24}>
                {props.icon}
            </Col>
            <Col lg={18} md={0}>
                {props.label}
            </Col>
            <div className="navbar__item__content">
                <div className="title">Tìm kiếm</div>
                <Input size="large" prefix={<SearchOutlined />} placeholder="Tìm kiếm" ></Input>
            </div>
        </Row>
    )
}

const navbars = [
    {
        label: 'Trang chủ',
        key: 'home',
        icon: <HomeIcon/>
    },
    {
        label: 'Tìm kiếm',
        key: 'search',
        icon: <SearchIcon/>,
        popup: true,
    },
    {
        label: 'Thông báo',
        key: 'notify',
        icon: <NotifyIcon/>,
        popup: true,
    },
    {
        label: 'Tin nhắn',
        key: 'message',
        icon: <MessageIcon/>,
        popup: true,
    },
    {
        label: 'Bạn bè',
        key: 'people',
        icon: <ContactIcon/>
    },
    {
        label: 'Cài đặt',
        key: 'setting',
        icon: <SettingIcon/>
    },
]

const NavBar = props => {
    const [activeKey,setActiveKey] = useState(navbars[0].label);
  return (
      <NavBarWrapper>
          {navbars.map((nav)=><NavBarItem popup={nav?.popup} active={activeKey===nav.label} key={props.key} label={nav.label} icon={nav.icon} setActiveKey={setActiveKey} />)}
      </NavBarWrapper>
  )
}

NavBar.propTypes = {}

export default NavBar