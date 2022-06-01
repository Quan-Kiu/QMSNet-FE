import React from 'react'
import PropTypes from 'prop-types'
import { ContactsWrapper } from './Contacts.style'
import { Badge, Row } from 'antd'
import Contact from '../../../components/Common/Contact'

const Contacts = props => {
  return (
      <ContactsWrapper>
          <Row justify="space-between" align="middle" className="heading">
            <div className="section-title">
                Người liên hệ
            </div>
            <Badge count={5} style={{
                background: 'green',
            }}></Badge>
        </Row>
            <div className="contacts">
                <Contact/>
                <Contact/>
                <Contact/>
                <Contact/>
                <Contact/>
                <Contact/>
                <Contact/>
                <Contact/>
                <Contact/>
                <Contact/>
                <Contact/>
                <Contact/>
                <Contact/>
                <Contact/>
                <Contact/>
                <Contact/>
                <Contact/>
                <Contact/>
                <Contact/>
                <Contact/>
                <Contact/>
                <Contact/>
                <Contact/>
            </div>
      </ContactsWrapper>
  )
}

Contacts.propTypes = {}

export default Contacts