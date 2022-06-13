import React from 'react'
import PropTypes from 'prop-types'
import { AvatarCardWrapper } from './AvatarCard.style'
import { Avatar, Badge, Col } from 'antd'

const AvatarCard = props => {
  return (
      <>
    <AvatarCardWrapper wrap={false} align="top" gutter={[12,12]}>
        {!props.avatarHidden &&  <Col>
                
                <       Avatar src={props.src}>
                        </Avatar>
                    </Col>}
           

            <Col flex={1}>
                {props.content}
            </Col>
    </AvatarCardWrapper>
        {props.children}
      </>
  )
}

AvatarCard.propTypes = {
    src: PropTypes.string,
    avararHidden: PropTypes.bool,
}

AvatarCard.defaultProps = {
    src: '',
    avararHidden: false
}

export default AvatarCard