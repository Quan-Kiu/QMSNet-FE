import React from 'react'
import PropTypes from 'prop-types'
import { ContactWrapper } from './Contact.style'
import AvatarCard from '../AvatarCard'
import { Row } from 'antd'
import { MoreOutlined } from '@ant-design/icons';

const Contact = props => {
  return (
    <ContactWrapper>
        <AvatarCard content={
            <Row justify="space-between" align="middle">
                <div className="username">
                    QuanKiu
                </div>
                <MoreOutlined  style={{
                    transform: 'rotate(90deg)',
                    cursor: 'pointer',
                }}/>
            </Row>
        }>

        </AvatarCard>
    </ContactWrapper>
  )
}

Contact.propTypes = {}

export default Contact