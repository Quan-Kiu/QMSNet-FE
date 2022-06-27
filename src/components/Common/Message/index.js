import { Avatar, Image } from 'antd'
import React from 'react'
import { UnlikeIcon } from '../../../assets/icon';
import { dateTime } from '../../../utils/time_utils';
import { MessageWrapper } from './Message.style'

const Message = props => {
  const { type } = props;

  const styleProps = type === 'me' ? {
    ['attr-type']: type,
    ['attr-background']: '#1877F2',
    ['attr-color']: 'white',

  } : {
    ['attr-type']: type,
    ['attr-background']: '#E4E6EB',
    ['attr-color']: 'initial',

  }

  return (
    <>
      <MessageWrapper {...styleProps} className={type}>
        {type === 'friend' && <Avatar style={{
          opacity: props?.nextMess?.sender !== props?.data?.sender ? '1' : '0'
        }} src={props?.recipient?.avatar?.url} />}
        {props?.data?.media && props.data?.media?.url?.match('/image/') && <Image className="image" src={props?.data?.media?.url} />}
        {props?.data?.text && <div className="content">
          {props.data.text}
        </div>}
        {props?.data?.icon && <UnlikeIcon className="like" />}
      </MessageWrapper>
      {((Date.parse(props?.data?.createdAt) - Date.parse(props?.prevMess?.createdAt)) >=
        3600000 ||
        !props?.prevMess?.createdAt) && <div style={{
          textAlign: 'center',
          fontSize: '12px'
        }} className="createdAt">{dateTime(props?.data?.createdAt)}</div>}
    </>
  )
}

Message.propTypes = {}

export default Message