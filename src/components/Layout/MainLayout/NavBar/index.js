import { Col, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { ContactIcon, HomeIcon, MessageIcon, NotifyIcon, SearchIcon, SettingIcon } from '../../../../assets/icon'
import { setTabActive } from '../../../../redux/app/action'
import Conversation from './Conversation'
import { NavBarWrapper } from './NavBar.style'
import Notifies from './Notifies'
import Search from './Search'

const NavBarItem = props =>{
    const dispatch = useDispatch();
    const navigate =  useNavigate();
    const location = useLocation();
    return (
        <>
        {props.active && props.popup && <div onClick={()=>{ 
            if(location.pathname==='/'){
                dispatch(setTabActive('home'))
            }else{
                dispatch(setTabActive(''))

            }
        }} className="pseudo"></div>}
        <Row  gutter={24} onClick={()=>{
            if(props?.path){
                navigate(props.path);
            }
            if(props?.onClick){
                props.onClick();
            }
            dispatch(setTabActive(props.navKey))
           
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
                </>
    )
}

const navbars = [
    {
        label: 'Trang chủ',
        key: 'home',
        icon: <HomeIcon/>,
        path: '/'
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
    const {tabActive} = useSelector((state)=>state.app);
    console.log(tabActive);
  return (
          <>
      <NavBarWrapper>
            
          {navbars.map((nav)=><NavBarItem popup={nav?.popup} active={tabActive===nav.key} navKey={nav.key} path={nav?.path} key={props.key} label={nav.label} icon={nav.icon}  />)}
      </NavBarWrapper>
          </>

  )
}

NavBar.propTypes = {}

export default NavBar