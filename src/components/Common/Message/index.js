import { Avatar } from 'antd'
import React from 'react'
import { MessageWrapper } from './Message.style'

const Message = props => {
    const {type}= props;

    const styleProps =  type === 'me'?{
        ['attr-type']: type,
        ['attr-background']: '#1877F2',
        ['attr-color']: 'white',

    }:{
        ['attr-type']: type,
        ['attr-background']:'#E4E6EB',
        ['attr-color']:'initial',
        
    }
  return (
    <MessageWrapper {...styleProps} className={type}>
       {type === 'friend' && <Avatar src=""/>} 
        <div className="content">
            aaaaaaaaaaaaaaaaaaaaaaaaaa asssssssssssssss assssssssssssssssssssssssssssss            
        </div>
    </MessageWrapper>
  )
}

Message.propTypes = {}

export default Message