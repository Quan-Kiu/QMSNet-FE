import { Col, Row } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ContactIcon, HomeIcon, MessageIcon, NotifyIcon, SearchIcon, SettingIcon } from '../../../../assets/icon'
import Conversation from './Conversation'
import { NavBarWrapper } from './NavBar.style'
import Notifies from './Notifies'
import Search from './Search'
import ConversationPopup from '../../../Common/ConversationPopup';

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
                {props?.popup}
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
        popup: <Search/>,
        
    },
    {
        label: 'Thông báo',
        key: 'notify',
        icon: <NotifyIcon/>,
        popup: <Notifies/>,
    },
    {
        label: 'Tin nhắn',
        key: 'message',
        icon: <MessageIcon/>,
        popup: <Conversation/>
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
          <>
      <NavBarWrapper>
          {navbars.map((nav)=><NavBarItem popup={nav?.popup} active={activeKey===nav.label} key={props.key} label={nav.label} icon={nav.icon} setActiveKey={setActiveKey} />)}
      </NavBarWrapper>
          </>

  )
}

NavBar.propTypes = {}

export default NavBar