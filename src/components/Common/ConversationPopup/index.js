import React, { useRef } from 'react'
import { CreateMessageIcon } from '../../../assets/icon'
import ConversationItem from '../ConversationItem'
import { ConversationPopupWrapper } from './ConversationPopup.style'

const ConversationPopup = props => {
  return (
    <ConversationPopupWrapper>
        <div className="create-conversation-btn">
        <CreateMessageIcon/>
        </div>
        <div className="conversation-list">
            
            <ConversationItem/>    
        </div>
    </ConversationPopupWrapper>
  )
}

ConversationPopup.propTypes = {}

export default ConversationPopup