import { Button } from 'antd'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetail, userFollow } from '../../../redux/user/action';
import { userSelector } from '../../../redux/user/reducer';
import { RequestCardWrapper } from './RequestCard.style'

const RequestCard = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { suggestionLoading } = useSelector(state => state.user);

  const handleOnBtnClick = () => {
    setLoading(true)
    const type = 'follow';
    dispatch(userFollow({
      path: type + '/' + props?.data?._id,
      simple: true
    }))
  }

  useEffect(() => {
    if (!suggestionLoading) {
      setLoading(false)
    }

  }, [suggestionLoading])




  return (
    <RequestCardWrapper>
      <img className="avatar" src={props?.data?.avatar?.url} alt={props?.data?.avatar?.url} />
      <div className="actions">
        <div className="name" onClick={() => {
          dispatch(setUserDetail(props?.data))
        }}>{props?.data?.username}</div>
        {props.suggestions ? <Button loading={loading} onClick={handleOnBtnClick} className="q-button" type="primary" >Theo dõi</Button> :
          <Button loading={loading} onClick={handleOnBtnClick} className="q-button q-button-outline" >Theo dõi lại</Button>}

      </div>
    </RequestCardWrapper>

  )
}

RequestCard.propTypes = {}

export default RequestCard