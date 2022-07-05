import { Avatar } from 'antd'
import { timeAgo } from '../../../../../utils/time_utils'
import { NotifyWrapper } from './Notify.style'
import { useDispatch } from 'react-redux';
import { readNotify } from '../../../../../redux/notify/action';
import { setDetailModal } from '../../../../../redux/post/action';
import { setUserDetail } from '../../../../../redux/user/action';
import { setReportModal } from '../../../../../redux/app/action';

const Notify = ({ notify }) => {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    if (!notify?.isRead) {
      dispatch(readNotify(notify._id));
    }

    switch (notify?.action) {
      case 1:
        return dispatch(setUserDetail(notify?.user))
      case 2:
        return dispatch(setDetailModal(notify.postId))
      case 3:
        return dispatch(setDetailModal(notify.postId, notify.commentId))
      case 4:
        return dispatch(setDetailModal(notify.postId, notify.commentId))
      case 5:
        return dispatch(setDetailModal(notify.postId, notify.commentId))
      case 6:
        return dispatch(setReportModal(notify.reportId))
      default:
        break;
    }
  }


  return (
    <NotifyWrapper onClick={handleOnClick} className={`${notify?.isRead && 'isRead'}`}>
      <Avatar size="large" src={notify?.user?.avatar?.url || 'http://res.cloudinary.com/quankiu/image/upload/v1656676441/qmedia/xuezrusaqdmu4wstb5nk.png'} />
      <div className="right">
        <div className="content" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px'

        }}>
          <div style={{
            flex: '1',
          }}>
            {notify?.action !== 6 && <span>{notify?.user?.username}</span>} {notify?.text} <div className="preview-content">
              {notify?.content}
            </div>
          </div>
          {notify?.media?.length > 0 && <div className="notify-media">
            {notify?.media[0]?.url.match('/image/') ? <img src={notify?.media[0]?.url} alt={notify?.media[0]?.url} /> : <video controls={false}  >
              <source src={notify?.media[0]?.url} type="video/mp4" />
            </video>}
          </div>}
        </div>
        <div className="createdAt">
          {timeAgo(notify?.updatedAt, false)}
        </div>
      </div>
    </NotifyWrapper>
  )
}

Notify.propTypes = {}

export default Notify