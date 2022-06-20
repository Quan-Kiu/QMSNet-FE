import React from 'react'
import PropTypes from 'prop-types'
import { RequestWrapper } from './Request.style'
import AvatarCard from '../AvatarCard'
import { Button, Row } from 'antd'

const Request = props => {
  return (
    <RequestWrapper>
        <AvatarCard src="https://imgt.taimienphi.vn/cf/Images/np/2021/11/26/hinh-anh-avatar-dep-2.jpg" alt=""
        content={
            <>
                <div className="username">
                    QuanKiu
                </div>
                <span>
                    muốn kết bạn với bạn
                </span>

            </>
        }
        >
            <Row className="request-actions" justify="space-between">
            <Button size="large" className="q-button q-button-primary" type="primary">Chấp nhận</Button>
            <Button size="large" className="q-button q-button-outline" >Hủy lời mời</Button>
            </Row>
        </AvatarCard>
    </RequestWrapper>
  )
}

Request.propTypes = {}

export default Request