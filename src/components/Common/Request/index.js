import { Button, Col, Row } from 'antd'
import { useDispatch } from 'react-redux'
import { setUserDetail, userFollow } from '../../../redux/user/action'
import AvatarCard from '../AvatarCard'
import { RequestWrapper } from './Request.style'

const Request = ({ data, suggestion }) => {
    const dispatch = useDispatch();
    return (
        <RequestWrapper>
            <AvatarCard style={{
                alignItems: 'center',
            }} src={data?.avatar?.url} alt={data?.avatar?.url}
                content={
                    <Row gutter={[12, 12]} wrap={false} justify="space-between" align="middle" >
                        <Col>
                            <div className="username" onClick={() => {
                                dispatch(setUserDetail(data))
                            }}>
                                {data?.username}
                            </div>
                            <span>
                                {suggestion ? 'Gợi ý cho bạn.' : 'đã theo dõi bạn.'}
                            </span>
                        </Col>
                        <Col style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end'
                        }}>
                            {!suggestion ? <Button onClick={() => {
                                dispatch(userFollow({
                                    path: 'follow' + '/' + data?._id,
                                    simple: true
                                }))
                            }} className="q-button q-button-outline" >Theo dõi lại</Button> : <Button onClick={() => {
                                dispatch(userFollow({
                                    path: 'follow' + '/' + data?._id,
                                    simple: true
                                }))
                            }} className="q-button" type="primary" >Theo dõi</Button>}

                        </Col>

                    </Row>
                }
            >

            </AvatarCard>
        </RequestWrapper >
    )
}

Request.propTypes = {}

export default Request