import { Avatar,Image } from 'antd'
import React from 'react'
import { UnlikeIcon } from '../../../assets/icon';
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
       {type === 'friend' && <Avatar src={props?.recipient?.avatar?.url}/>} 
       {props?.data?.media && props.data?.media?.url?.match('/image/') &&<Image className="image" src={props?.data?.media?.url}/>}
        {props?.data?.text && <div className="content">
          {props.data.text}
        </div>}
        {props?.data?.icon && <UnlikeIcon className="like"  />}
    </MessageWrapper>
  )
}

Message.propTypes = {}

export default Message