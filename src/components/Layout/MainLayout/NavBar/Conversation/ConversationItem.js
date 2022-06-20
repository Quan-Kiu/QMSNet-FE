import React from 'react'
import PropTypes from 'prop-types'
import { Avatar } from 'antd'
import { timeAgo } from '../../../../../utils/time_utils'
import { useDispatch, useSelector } from 'react-redux'
import { toggleConversation, updateConversation } from '../../../../../redux/conversation/action'
import { setTabActive } from '../../../../../redux/app/action'
import {useLocation} from 'react-router-dom'

const ConversationItem = ({data}) => {
    const {user} = useSelector(state=>state.auth);
    const {tabActive} = useSelector(state=>state.app);
    const recipient = data?.participants?.find((p)=>p._id !== user?._id); 
    const dispatch = useDispatch();
    const location = useLocation();
    const handleOnConversationClick = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        dispatch(toggleConversation(data?._id));
        if(location.pathname === '/' && tabActive !== 'home'){
            dispatch(setTabActive('home'));
        }else{
            dispatch(setTabActive(''));
        }


    }
  return (
    <div className="conversation" onClick={handleOnConversationClick}>
                <div className="conversation__avatar">
                    <Avatar src={recipient?.avatar?.url}/>
                </div>
                <div className="conversation__content">
                    <div className="username">
                        {recipient?.username}
                    </div>
                    <div className="message">
                    {data?.text}
                        <span> · {timeAgo(data?.updatedAt)}</span>
                    </div>
                </div>
            </div>
  )
}

ConversationItem.propTypes = {}

export default ConversationItem