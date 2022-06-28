import { Avatar, Badge } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { setTabActive } from '../../../../../redux/app/action'
import { openConversation, readMessage } from '../../../../../redux/conversation/action'
import { timeAgo } from '../../../../../utils/time_utils'

const ConversationItem = ({ data }) => {
    const { user } = useSelector(state => state.auth);
    const { tabActive } = useSelector(state => state.app);
    const { conversations } = useSelector(state => state.conversation);
    const { data: onlines } = useSelector(state => state.online);
    const recipient = data?.participants?.find((p) => p._id !== user?._id);
    const isOnline = onlines?.find((cv) => cv._id === data?._id);

    const unReadConversation = conversations?.reduce((prev, n) => {
        if (n?.read && !(n?.read?.some((u) => u === user._id))) {
            return [...prev, n._id]
        } else {
            return prev;
        }
    }, [data]);

    const dispatch = useDispatch();
    const location = useLocation();
    const handleOnConversationClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(openConversation(data?._id));
        if (unReadConversation.includes(data?._id)) {
            dispatch(readMessage(data?._id));
        }
        dispatch(openConversation(data?._id));
        if (location.pathname === '/' && tabActive !== 'home') {
            dispatch(setTabActive('home'));
        } else {
            dispatch(setTabActive(''));
        }


    }
    return (
        <div className={`conversation ${unReadConversation.includes(data?._id) ? 'unRead' : 'read'}`} onClick={handleOnConversationClick}>
            <div className="conversation__avatar">
                <Badge dot={isOnline} status="success" offset={[-10, 40]}>
                    <Avatar src={recipient?.avatar?.url} />
                </Badge>
            </div>
            <div className="conversation__content">
                <div className="username">
                    {recipient?.username}
                </div>
                <div className="message">
                    {data?.text || (data?.media && 'Tin nhắn hình ảnh') || (data?.icon && '❤️')}
                    <span> · {timeAgo(data?.updatedAt)}</span>
                </div>
            </div>
            <div className="dot"></div>
        </div>
    )
}

ConversationItem.propTypes = {}

export default ConversationItem