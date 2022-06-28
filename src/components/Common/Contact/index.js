import React from 'react'
import PropTypes from 'prop-types'
import { ContactWrapper } from './Contact.style'
import AvatarCard from '../AvatarCard'
import { Badge, Col, Row } from 'antd'
import { MoreOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { setUserDetail } from '../../../redux/user/action'
import { openConversation } from '../../../redux/conversation/action'

const Contact = props => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const contact = props.data.participants.find((p) => p._id !== user._id);
    return (
        <ContactWrapper >
            <Row className="pseudo">
                <Col span={8}>
                    <div className="dot"></div>
                    <Badge dot status="success" offset={[-20, 80]}>
                        <img src={contact?.avatar?.url} alt={contact?.avatar?.url} />
                    </Badge>
                </Col>
                <Col span={16}>
                    <div className="username" >
                        <span className="name" onClick={() => {
                            dispatch(setUserDetail(contact))
                        }}>{contact?.username}</span>  <span className="fullname">
                            ({contact?.fullname})
                        </span>
                    </div>

                    {contact?.userSettings?.PRIVACY?.email && <div className="email">
                        <img src="/assets/images/mail.png" alt="mail" />
                        {contact?.email}
                    </div>}
                    <div className="stats">
                        <img src="/assets/images/followers.png" alt="followers" />
                        Có <span>{contact?.followers?.length}</span> đang theo dõi.
                    </div>
                    <div className="stats">
                        <img src="/assets/images/followers.png" alt="followers" />
                        Đang theo dõi <span>{contact?.following?.length}</span> người.
                    </div>

                </Col>
            </Row>
            <AvatarCard onClick={() => {
                dispatch(openConversation(props.data._id))
            }} showDot src={contact?.avatar?.url} style={{
                alignItems: 'center'
            }} content={<>

                <Row justify="space-between" align="middle">
                    <div className="username" style={{
                        color: 'black',
                        fontWeight: '500',
                        textDecoration: 'none',
                    }}>
                        {contact?.username}
                    </div>

                </Row>
            </>
            }>

            </AvatarCard>
        </ContactWrapper>
    )
}

Contact.propTypes = {}

export default Contact