import React,{useState} from 'react'
import PropTypes from 'prop-types'
import { NotifiesWrapper } from './Notifies.style'
import Notify from '../Notify';

const notifyTypes = [{
    label: 'Tất cả',
    key: 'all'
},
  { label: 'Chưa đọc',
    key: 'unRead'
},
]

const Notifies = props => {
    const [notifyType,setNotifyType] = useState(notifyTypes[0].key)
  return (
      <NotifiesWrapper>
         <div className="title">
             Thông báo
         </div>
         <div className="notify-type">
             {notifyTypes.map((n)=>
                (<div key={n.key} onClick={()=>{
                    if(n.key!==notifyType){
                        setNotifyType(n.key)
                    }
                }} className={`type ${n.key === notifyType?"active":""}`}>{n.label}</div>)
             )}
         </div>
         <div className="notify-history">
             <div className="notify-history-title">
                 Trước đó
             </div>
             <div className="notify-history-remove">
                 Xem tất cả
             </div>
         </div>
         <div className="notify-list">
            <Notify notify={{
                user: {
                    username: 'QuanNe'
                },
                content: 'đã thêm một ảnh mới: Hello cac ban',
                createdAt:"2021-12-24T04:29:47.739+00:00"
            }}/>
            <Notify notify={{
                user: {
                    username: 'QuanNe'
                },
                content: 'đã thêm một ảnh mới: Hello cac ban',
                createdAt:"2021-12-24T04:29:47.739+00:00"
            }}/>
            <Notify notify={{
                user: {
                    username: 'QuanNe'
                },
                content: 'đã thêm một ảnh mới: Hello cac ban',
                createdAt:"2021-12-24T04:29:47.739+00:00"
            }}/>
            <Notify notify={{
                user: {
                    username: 'QuanNe'
                },
                content: 'đã thêm một ảnh mới: Hello cac ban',
                createdAt:"2021-12-24T04:29:47.739+00:00"
            }}/>
            <Notify notify={{
                user: {
                    username: 'QuanNe'
                },
                content: 'đã thêm một ảnh mới: Hello cac ban',
                createdAt:"2021-12-24T04:29:47.739+00:00"
            }}/>
            <Notify notify={{
                user: {
                    username: 'QuanNe'
                },
                content: 'đã thêm một ảnh mới: Hello cac ban',
                createdAt:"2021-12-24T04:29:47.739+00:00"
            }}/>
            <Notify notify={{
                user: {
                    username: 'QuanNe'
                },
                content: 'đã thêm một ảnh mới: Hello cac ban',
                createdAt:"2021-12-24T04:29:47.739+00:00"
            }}/>
            <Notify notify={{
                user: {
                    username: 'QuanNe'
                },
                content: 'đã thêm một ảnh mới: Hello cac ban',
                createdAt:"2021-12-24T04:29:47.739+00:00"
            }}/>
            <Notify notify={{
                user: {
                    username: 'QuanNe'
                },
                content: 'đã thêm một ảnh mới: Hello cac ban',
                createdAt:"2021-12-24T04:29:47.739+00:00"
            }}/>
            <Notify notify={{
                user: {
                    username: 'QuanNe'
                },
                content: 'đã thêm một ảnh mới: Hello cac ban',
                createdAt:"2021-12-24T04:29:47.739+00:00"
            }}/>
            <Notify notify={{
                user: {
                    username: 'QuanNe'
                },
                content: 'đã thêm một ảnh mới: Hello cac ban',
                createdAt:"2021-12-24T04:29:47.739+00:00"
            }}/>
            <Notify notify={{
                user: {
                    username: 'QuanNe'
                },
                content: 'đã thêm một ảnh mới: Hello cac ban',
                createdAt:"2021-12-24T04:29:47.739+00:00"
            }}/>
            <Notify notify={{
                user: {
                    username: 'QuanNe'
                },
                content: 'đã thêm một ảnh mới: Hello cac ban',
                createdAt:"2021-12-24T04:29:47.739+00:00"
            }}/>
            <Notify notify={{
                user: {
                    username: 'QuanNe'
                },
                content: 'đã thêm một ảnh mới: Hello cac ban',
                createdAt:"2021-12-24T04:29:47.739+00:00"
            }}/>
            <Notify notify={{
                user: {
                    username: 'QuanNe'
                },
                content: 'đã thêm một ảnh mới: Hello cac ban',
                createdAt:"2021-12-24T04:29:47.739+00:00"
            }}/>
            <Notify notify={{
                user: {
                    username: 'QuanNe'
                },
                content: 'đã thêm một ảnh mới: Hello cac ban',
                createdAt:"2021-12-24T04:29:47.739+00:00"
            }}/>
            <Notify notify={{
                user: {
                    username: 'QuanNe'
                },
                content: 'đã thêm một ảnh mới: Hello cac ban',
                createdAt:"2021-12-24T04:29:47.739+00:00"
            }}/>
         </div>
            <Notify notify={{
                user: {
                    username: 'QuanNe'
                },
                content: 'đã thêm một ảnh mới: Hello cac ban',
                createdAt:"2021-12-24T04:29:47.739+00:00"
            }}/>
      </NotifiesWrapper>
  )
}

Notifies.propTypes = {}

export default Notifies