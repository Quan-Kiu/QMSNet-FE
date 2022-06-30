import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { ConversationWrapper } from './Conversation.style'
import { CreateMessageIcon } from '../../../../../assets/icon'
import { Avatar, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import AvatarCard from '../../../../Common/AvatarCard';
import { timeAgo } from '../../../../../utils/time_utils';
import { useDispatch, useSelector } from 'react-redux'
import ConversationItem from './ConversationItem'
import { getConversation, toggleNewConversation } from '../../../../../redux/conversation/action'


const Conversation = props => {
    const { conversations } = useSelector(state => state.conversation);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getConversation());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <ConversationWrapper>
            <div className="header">
                <div className="title">
                    Chat
                </div>
                <CreateMessageIcon className="create-icon" onClick={() => dispatch(toggleNewConversation())} />
            </div>
            <Input size="large" prefix={<SearchOutlined />} placeholder="Tìm kiếm" ></Input>
            <div className="body">
                {conversations.map((cv) => cv._id && <ConversationItem data={cv} />)}

            </div>


        </ConversationWrapper>
    )
}

Conversation.propTypes = {}

export default Conversation