import { Avatar } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { setTabActive } from '../../../../../redux/app/action'
import { openConversation } from '../../../../../redux/conversation/action'
import { timeAgo } from '../../../../../utils/time_utils'

const ConversationItem = ({ data }) => {
    const { user } = useSelector(state => state.auth);
    const { tabActive } = useSelector(state => state.app);
    const { conversations } = useSelector(state => state.conversation);
    const recipient = data?.participants?.find((p) => p._id !== user?._id);
    const unReadConversation = conversations?.reduce((prev, n) => {
        if (n?.read?._id && !(n?.read?.some((u) => u === user._id))) {
            return [...prev, n._id]
        } else {
            return prev;
        }
    }, []);

    const dispatch = useDispatch();
    const location = useLocation();
    const handleOnConversationClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
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
                <Avatar src={recipient?.avatar?.url} />
            </div>
            <div className="conversation__content">
                <div className="username">
                    {recipient?.username}
                </div>
                <div className="message">
                    {data?.text}
                    <span> · {timeAgo(data?.updatedAt)}</span>
                </div>
            </div>
            <div className="dot"></div>
        </div>
    )
}

ConversationItem.propTypes = {}

export default ConversationItem