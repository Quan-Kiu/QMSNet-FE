import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { NavBarWrapper } from './NavBar.style'
import { Col, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ContactIcon, HomeIcon, MessageIcon, NotifyIcon, SearchIcon, SettingIcon } from '../../../../assets/icon'

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
        }} className={`navbar-item ${props.active?'active':'unActive'}`}>
            <Col lg={6} md={24}>
                {props.icon}
            </Col>
            <Col lg={18} md={0}>
                {props.label}
            </Col>
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
        icon: <SearchIcon/>
    },
    {
        label: 'Thông báo',
        key: 'notify',
        icon: <NotifyIcon/>
    },
    {
        label: 'Tin nhắn',
        key: 'message',
        icon: <MessageIcon/>
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
          {navbars.map((nav)=><NavBarItem active={activeKey===nav.label} key={props.key} label={nav.label} icon={nav.icon} setActiveKey={setActiveKey} />)}
      </NavBarWrapper>
  )
}

NavBar.propTypes = {}

export default NavBar