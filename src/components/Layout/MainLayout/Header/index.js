import { SearchOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Dropdown, Form, Input, Menu, Modal, Radio, Row, Select } from 'antd'
import { useCallback, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CreateIcon, ProfileIcon } from '../../../../assets/icon'
import { logout } from '../../../../redux/auth/action'
import { authSelector } from '../../../../redux/auth/reducer'
import { addPost, toggleModal } from '../../../../redux/post/action'
import { PostSelector } from '../../../../redux/post/reducer'
import { setUserDetailSuccess } from '../../../../redux/user/action'
import AvatarCard from '../../../Common/AvatarCard'
import ChooseEmoji from '../../../Common/ChooseEmoji'
import UploadAttachment from '../../../Common/UploadAttachment'
import { HeaderWrapper } from './Header.style'


const bgs=[{
  background: '#fff',
  color: 'black',
},
 { background: 'red',
  color: 'white',
},
 { background: 'orange',
  color: 'white',
},
 { background: 'yellow',
  color: 'red',
},
]

const Header = props => {
  const textInputRef = useRef();
  const {user} = useSelector(authSelector);
  const {showModal} = useSelector(PostSelector);
  const textAreaInputRef = useRef();
  const [currentBG,setCurrentBG] = useState({ background: '#fff',
  color: 'black',});
  const [form]= Form.useForm();
  const dispatch = useDispatch();

  const handleModal = ()=>{
    dispatch(toggleModal())
  }


  const onImageChange = useCallback((files)=>{
    form.setFieldsValue({
      media: files
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const handleSubmit = ()=>{
      const formData = form.getFieldValue();
      formData.status = formData?.status|| 1;
      formData.styles = currentBG;
      formData.content = textAreaInputRef.current?.value;
      dispatch(addPost(formData))

  }

  const menu = (
    <Menu
      items={[
        {
          icon: <ProfileIcon/>, 
          label: <div onClick={()=>{
              dispatch(setUserDetailSuccess({...user}));
          }}>Trang cá nhân</div>,
          key: '0',
        },
        {
          type: 'divider',
        },
        {
          icon: <i className='close-icon'></i>,
          label: <Button onClick={()=>{
            dispatch(logout())
          }} type="text">Đăng xuất</Button>  ,
          key: '3',
        },
      ]}
    />
  );
  

  return (
    <HeaderWrapper>
    
      <Modal maskClosable={false} afterClose={()=>{
        form.resetFields()
      }} destroyOnClose={true} wrapClassName="new-post-modal"  title="Tạo bài viết"  onOk={handleModal} onCancel={handleModal} visible={showModal} width={500} footer={<Button size="large" className="q-button" onClick={handleSubmit} type="primary">Đăng</Button>}>
          <AvatarCard src="" content={<>
            <div className="username">
              {user.username}
            </div>
            <Select className="scope" defaultValue={1} onChange={(value)=>{
              form.setFieldsValue({
                status: value,
              })
            }} size="small" >
              <Select.Option value={1}>Công khai</Select.Option>
              <Select.Option value={2}>Riêng tư</Select.Option>
            </Select>
          </>}>
          <div className="post__content">
          {currentBG.background !=='#fff' ?<>
          <textarea   ref={textAreaInputRef} onKeyDown={(e)=>{
                  var key = e.keyCode || e.charCode;
                  if(textInputRef.current.offsetHeight>200){
                    if(( key === 8 || key === 46)){
                      textInputRef.current.innerText = e.target.value;
                    }else{
                      e.target.value= String(textInputRef.current.innerText).substring(0, String(textInputRef.current.innerText).length - 1);
                    }
                  }

          }} onChange={(e)=>{
            if(textInputRef.current.offsetHeight<=200){
              textInputRef.current.innerText = e.target?.value;
            }
          }} id="post-content" className="hide-input"></textarea>

          <label style={currentBG} htmlFor="post-content">
            <p ref={textInputRef}>
             {textAreaInputRef.current?.value || 'Bạn đang nghĩ gì thế?'}
            </p>

          </label>
</>: <textarea style={{
  resize: 'unset'
}} ref={textAreaInputRef} className="content" rows={5}  placeholder='Bạn đang nghĩ gì thế?'></textarea>}
          </div>
          {currentBG.background ==='#fff' &&
          <UploadAttachment onImageChange={onImageChange} maxCount={4}/>}
          <Row justify="space-between">
              
              <Col>
              <Radio.Group defaultValue={currentBG}  onChange={(e)=>{
                form.resetFields();
                form.setFieldsValue({
                  styles:e.target.value
                })
                setCurrentBG(e.target.value);

              }} >
                {bgs.map((bg)=><Radio.Button value={bg}><div style={{
        width: "30px",
        height: "100%",
        background:bg.background,
      }}></div> </Radio.Button>)}
      
    </Radio.Group>
              </Col>
              <Col className="emoji-choose">
                <ChooseEmoji content={textInputRef?.current?.value} setContent={(value)=>{
                  if(textAreaInputRef.current){
                    if(currentBG.background==='#fff'){
                      textAreaInputRef.current.value+=value;
                    }
                    if(textInputRef?.current?.offsetHeight<=200){
                      textInputRef.current.innerText+=value;
                      textAreaInputRef.current.value+=value;
                    }
           
                  }
                }}/>
              </Col>
          </Row>
          </AvatarCard>
      </Modal>
      <Row gutter={36} justify="space-between" align="middle" className="header__content" >
        <Col className="header__content__logo">
          <Link to="/">
          <img src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="" />
          </Link>

        </Col>
        <Col className="header__content__func">
            <Row gutter={10}>
              <Col className="header__content__func__search">
                  <Input size="large" prefix={<SearchOutlined />} placeholder="Tìm kiếm" ></Input>
              </Col>

              <Col className="header__content__func__create-post">
                  <Button className="q-button" onClick={handleModal} size="large" type="primary" >
                  <CreateIcon  />
                    Tạo bài viết
                  </Button>

              </Col >
              <Col className="header__content__func__profile">
              <Dropdown overlay={menu} trigger={['hover']}>
              <Avatar size="large" onClick={(e)=>{
                e.preventDefault();
                  }} style={{
                    cursor: 'pointer'
                  }} src={user?.avatar?.url} />
  </Dropdown>
                 
              </Col>

            </Row>
        </Col>


      </Row>
    </HeaderWrapper>
  )
}

Header.propTypes = {}

export default Header