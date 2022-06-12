import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import React from 'react'
import { SearchWrapper } from './Search.style'
import SearchHistory from '../SearchHistory';

const Search = () => {
  return (
    <SearchWrapper>
                    <div className="title">Tìm kiếm</div>
                    <Input size="large" prefix={<SearchOutlined />} placeholder="Tìm kiếm" ></Input>
                    <div className="search-history" >
                        <div className="search-history-title">
                            Tìm kiếm gần đây
                        </div>
                        <div className="remove-search-history">Xoá tất cả</div>
                    </div>
                        <div className="search-history-list">
                            <SearchHistory content="quanquan"/>
                            <SearchHistory content="quanquan"/>
                            <SearchHistory content="quanquan"/>
                            <SearchHistory content="quanquan"/>
                            <SearchHistory content="quanquan"/>
                        </div>
                </SearchWrapper>
  )
}

export default Search