import React from 'react'
import PropTypes from 'prop-types'
import { NotifiesWrapper, NotifyWrapper } from './Notify.style'
import { Avatar } from 'antd'
import { timeAgo } from '../../../../../utils/time_utils'

const Notify = props => {
  return (
    <NotifyWrapper>
        <Avatar size="large" src=""/>
        <div className="right">
            <div className="content">
                <span>{props.notify.user.username}</span> {props.notify.content}
            </div>
        <div className="createdAt">
            {timeAgo(props.notify.createdAt,false)}
        </div>
        </div>
    </NotifyWrapper>
  )
}

Notify.propTypes = {}

export default Notify