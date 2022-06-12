import React from 'react'
import { ClockCircleOutlined,CloseOutlined  } from '@ant-design/icons';
import { SearchHistoryWrapper } from './SearchHistory.style';
import { Col, Row } from 'antd';
const SearchHistory = (props) => {
  return (
    <SearchHistoryWrapper>
      <div className="prefix-icon">

                <ClockCircleOutlined/>
      </div>
                <div className="content">
                {props.content}

                </div>
                <div className="suffix-icon">
                <CloseOutlined/>
                </div>
    </SearchHistoryWrapper>

  )
}

export default SearchHistory