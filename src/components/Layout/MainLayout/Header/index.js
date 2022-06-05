import { SearchOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Input, Modal, Radio, Row, Select,Image, Form } from 'antd'
import React, { useCallback, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CreateIcon } from '../../../../assets/icon'
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
  const [isNewPostModalShow,setIsNewPostModalShow]=useState(false);
  const textInputRef = useRef();
  const textAreaInputRef = useRef();
  const navigate = useNavigate();
  const [currentBG,setCurrentBG] = useState({ background: '#fff',
  color: 'black',});
  const [form]= Form.useForm();

  const handleShowModal = ()=>{
    setIsNewPostModalShow(true)
  }

  const handleCancelModal = ()=>{
    setIsNewPostModalShow(false)
  }

  const onImageChange = useCallback((files)=>{
    form.setFieldsValue({
      files
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  

  return (
    <HeaderWrapper>
    
      <Modal wrapClassName="new-post-modal"  title="Tạo bài viết"  onOk={handleShowModal} onCancel={handleCancelModal} visible={isNewPostModalShow} width={500} footer={<Button size="large" className="q-button" onClick={()=>{
          console.log(form.getFieldValue());
      }} type="primary">Đăng</Button>}>
          <AvatarCard src="" content={<>
            <div className="username">
              QuanKiu
            </div>
            <Select className="scope" size="small" defaultValue={"1"}>
              <Select.Option value="1">Công khai</Select.Option>
              <Select.Option value="2">Riêng tư</Select.Option>
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
              textInputRef.current.innerText = e.target.value;
            }
          }} id="post-content" className="hide-input"></textarea>

          <label style={currentBG} htmlFor="post-content">
            <p ref={textInputRef}>
             {textAreaInputRef.current.value || 'Bạn đang nghĩ gì thế?'}
            </p>

          </label>
</>: <textarea style={{
  resize: 'unset'
}} ref={textAreaInputRef} className="content" rows={5}  placeholder='Bạn đang nghĩ gì thế?'></textarea>}
          </div>
          <UploadAttachment onImageChange={onImageChange} maxCount={4}/>
          <Row justify="space-between">
              
              <Col>
              <Radio.Group defaultValue={currentBG} onChange={(e)=>{
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
                  <Button onClick={handleShowModal} size="large" type="primary" >
                  <CreateIcon  />
                    Tạo bài viết
                  </Button>

              </Col >
              <Col className="header__content__func__profile">
                  <Avatar size="large" onClick={()=>{
                    navigate('/profile');
                  }} style={{
                    cursor: 'pointer'
                  }} src="https://instagram.fsgn8-2.fna.fbcdn.net/v/t51.2885-19/259676907_471643571156945_1331133705939004080_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fsgn8-2.fna.fbcdn.net&_nc_cat=105&_nc_ohc=92EGNjWV2OQAX-FjSGG&edm=ABfd0MgBAAAA&ccb=7-5&oh=00_AT-dKN1l5cj6JCXBUxmtg_leZ4tv7uWBjKOsLBKCrYuWUg&oe=629A7B7B&_nc_sid=7bff83" />
              </Col>

            </Row>
        </Col>


      </Row>
    </HeaderWrapper>
  )
}

Header.propTypes = {}

export default Header