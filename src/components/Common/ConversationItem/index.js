import { CloseOutlined, MinusOutlined,SendOutlined  } from '@ant-design/icons'
import { Avatar, Input } from 'antd'
import React, { useRef,useState } from 'react'
import { ImageIcon, LikeIcon } from '../../../assets/icon'
import ChooseEmoji from '../ChooseEmoji'
import Message from '../Message'
import { ConversationItemWrapper } from './ConversationItem.style'

const ConversationItem = props => {
    const inputRef = useRef();
    const [sendIconShow,setSendIconShow] = useState(false);

  return (
    <ConversationItemWrapper>
                <div className="header">
                    <div className="header-left">
                            <div className="avatar">
                                <Avatar src="" />
                            </div>
                            <div className="infomation">
                            <div className="username">Trần Minh</div>
                            <div className="activity-status">
                                Đang hoạt động
                            </div>
                            </div>
                    </div>
                    <div className="header-right">
                    <MinusOutlined />
                    <CloseOutlined />
                    </div>

                </div>
                <div className="body">
                        <Message type="friend"/>
                        <Message type="me"/>
                        <Message type="me"/>
                        <Message type="me"/>
                        <Message type="me"/>
                        <Message type="me"/>
                        <Message type="friend"/>
                        <Message type="friend"/>
                        <Message type="friend"/>
                        <Message type="friend"/>
                        <Message type="friend"/>


                </div>
                <div className="footer">
                    <ImageIcon/>   
                    <Input ref={inputRef} onChange={(e)=>{
                        if(!sendIconShow && e.target.value){
                            setSendIconShow(true)
                        }
                        if(sendIconShow && !e.target.value){
                            setSendIconShow(false)
                        }
                    }} noStyle suffix={<ChooseEmoji id="emoji-message"/>}></Input>
                    {sendIconShow ? <SendOutlined style={{
                        width: '20px',
                        height: '20px',
                    }} />: <LikeIcon/>}     
                </div>
    </ConversationItemWrapper>
  )
}

ConversationItem.propTypes = {}

export default ConversationItem