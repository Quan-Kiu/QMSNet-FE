import { Badge, Row } from 'antd'
import React from 'react'
import Request from '../../../components/Common/Request'
import { RequestsWrapper } from './Requests.style'

const Requests = props => {
  return (
    <RequestsWrapper>
        <Row align="middle" justify="space-between" className="heading">
            <div className="section-title">
                Lời mời kết bạn
            </div>
            <Badge count={5}></Badge>

        </Row>
        <div className="requests">
            <Request/>
            <Request/>
        </div>
    </RequestsWrapper>
  )
}

Requests.propTypes = {}

export default Requests