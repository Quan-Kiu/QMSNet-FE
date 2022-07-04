import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const LayoutWrapper = styled.div`
width: 100%;

margin-top: 10rem;
margin-bottom: 3rem;
padding-right: 10rem;
`;

const Layout = props => {
  return (
    <LayoutWrapper onScroll={props?.onScroll}>
      {props.children}
    </LayoutWrapper>
  )
}

Layout.propTypes = {}

export default Layout