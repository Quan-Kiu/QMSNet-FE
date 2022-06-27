import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { FriendWrapper } from './Friend.style'
import { Row, Col, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import RequestCard from '../../components/Common/RequestCard'
import Layout from '../../components/Common/Layout'
import { getUserRequests, getUserSuggestions } from '../../redux/user/action'


const Friend = props => {
    const { suggestions, requests } = useSelector(state => state.user)


    return (
        <Layout>

            <FriendWrapper>
                <Row justify="space-between" align="middle">
                    <Col>
                        <div className="section-title">
                            Đang theo dõi bạn
                        </div>
                    </Col>

                </Row>
                <Row gutter={[32, 32]}>
                    {requests?.users?.map((user) => <Col xl={6} lg={6} md={8} sm={12} xs={24}>
                        <RequestCard data={user} />
                    </Col>)}
                </Row>
                <Row>
                    <Button size="large" className="q-button q-button-outline">Xem thêm</Button>
                </Row>
                <Row justify="space-between" align="middle">
                    <Col>
                        <div className="section-title">
                            Gợi ý theo dõi
                        </div>
                    </Col>

                </Row>
                <Row gutter={[32, 32]}>
                    {suggestions?.users?.map((user) => <Col xl={6} lg={6} md={8} sm={12} xs={24}>
                        <RequestCard suggestions data={user} />
                    </Col>)}
                </Row>
                {<Row>
                    <Button size="large" className="q-button q-button-outline">Xem thêm</Button>
                </Row>}

            </FriendWrapper>
        </Layout>
    )
}

Friend.propTypes = {}

export default Friend