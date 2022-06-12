import React from 'react'
import PropTypes from 'prop-types'
import { ConversationWrapper } from './Conversation.style'
import { CreateMessageIcon} from '../../../../../assets/icon'
import { Avatar, Input } from 'antd'
import { SearchOutlined} from '@ant-design/icons';
import AvatarCard from '../../../../Common/AvatarCard';
import {timeAgo} from '../../../../../utils/time_utils';


const Conversation = props => {
  return (
    <ConversationWrapper>
        <div className="header">
            <div className="title">
                Chat
            </div>
            <CreateMessageIcon className="create-icon"/>
        </div>
        <Input size="large" prefix={<SearchOutlined />} placeholder="Tìm kiếm" ></Input>
        <div className="body">
            <div className="conversation">
                <div className="conversation__avatar">
                    <Avatar/>
                </div>
                <div className="conversation__content">
                    <div className="username">
                        QuanQuan
                    </div>
                    <div className="message">
                        Hello nha
                        <span> · {timeAgo("2021-12-24T04:29:47.739+00:00")}</span>
                    </div>
                </div>
            </div>
            <div className="conversation">
                <div className="conversation__avatar">
                    <Avatar/>
                </div>
                <div className="conversation__content">
                    <div className="username">
                        QuanQuan
                    </div>
                    <div className="message">
                        Hello nha
                        <span> · {timeAgo("2021-12-24T04:29:47.739+00:00")}</span>
                    </div>
                </div>
            </div>
            <div className="conversation">
                <div className="conversation__avatar">
                    <Avatar/>
                </div>
                <div className="conversation__content">
                    <div className="username">
                        QuanQuan
                    </div>
                    <div className="message">
                        <div className="message-left">
                            Hello nha aaaaaaaaaaaaaasasaaaaaaaaaaaaaaaaaa
                        </div>
                        <span> · {timeAgo("2021-12-24T04:29:47.739+00:00")}</span>
                    </div>
                </div>
            </div>
            <div className="conversation">
                <div className="conversation__avatar">
                    <Avatar/>
                </div>
                <div className="conversation__content">
                    <div className="username">
                        QuanQuan
                    </div>
                    <div className="message">
                        Hello nha
                        <span> · {timeAgo("2021-12-24T04:29:47.739+00:00")}</span>
                    </div>
                </div>
            </div>
        </div>
        

    </ConversationWrapper>
  )
}

Conversation.propTypes = {}

export default Conversation