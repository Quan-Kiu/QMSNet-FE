import React from 'react'
import PropTypes from 'prop-types'
import { RequestWrapper } from './Request.style'
import AvatarCard from '../AvatarCard'
import { Button, Col, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { setUserDetail, userFollow } from '../../../redux/user/action'
import { useNavigate } from 'react-router-dom'

const Request = ({ data }) => {
    const dispatch = useDispatch();
    return (
        <RequestWrapper>
            <AvatarCard src={data?.avatar?.url} alt={data?.avatar?.url}
                content={
                    <Row justify="space-between" align="middle">
                        <Col>
                            <div className="username" onClick={() => {
                                dispatch(setUserDetail(data))
                            }}>
                                {data?.username}
                            </div>
                            <span>
                                đã theo dõi bạn.
                            </span>
                        </Col>
                        <Col>
                            <Button onClick={() => {
                                dispatch(userFollow({
                                    path: 'follow' + '/' + data?._id,
                                    simple: true
                                }))
                            }} className="q-button q-button-outline" >Theo dõi lại</Button>
                        </Col>

                    </Row>
                }
            >

            </AvatarCard>
        </RequestWrapper>
    )
}

Request.propTypes = {}

export default Request