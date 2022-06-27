import { CloseOutlined, LoadingOutlined, MinusOutlined, SendOutlined } from '@ant-design/icons'
import { Avatar, Form, Input, message } from 'antd'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ImageIcon, LikeIcon } from '../../../assets/icon'
import { authSelector } from '../../../redux/auth/reducer'
import { addMessage, getMessage, toggleConversation } from '../../../redux/conversation/action'
import ChooseEmoji from '../ChooseEmoji'
import Message from '../Message'
import { ConversationItemWrapper } from './ConversationItem.style'

const ConversationItem = props => {
    const inputRef = useRef();
    const fileRef = useRef();
    const { user } = useSelector(authSelector);
    const [sendIconShow, setSendIconShow] = useState(false);
    const recipient = props?.data?.participants?.find((p) => p._id !== user._id);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [mediaLoading, setMediaLoading] = useState(false);
    useEffect(() => {
        if (props?.data?._id && !props?.data?.pagination) {

            dispatch(getMessage(props?.data));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props?.data?._id])

    const handleChosseEmoji = (value) => {
        setSendIconShow(true);
        form.setFieldsValue({
            text: (form.getFieldValue('text') || "") + value
        })
    }

    const handleSendMessage = (values) => {
        form.resetFields();

        setSendIconShow(false);
        dispatch(addMessage({
            recipient,
            fakeId: props?.data?.fakeId || "", _id: props?.data?._id || '', ...values
        }));
    }


    const handleOnFileChange = async (e) => {
        const files = e.target.files;
        if (files.length === 0) {
            return message.error('Vui lòng chọn file');
        }
        const file = files[0];
        if (
            file.type !== 'image/jpeg' &&
            file.type !== 'image/png'
        )
            return 'File của bạn không hợp lệ.';

        setMediaLoading(true);


        const formData = new FormData();

        formData.append('file', file);
        formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
        formData.append('cloud_name', process.env.REACT_APP_CLOUD_NAME);


        const res = await axios.post(
            process.env.REACT_APP_CLOUDINARY_API,
            formData,
        );
        if (res?.status === 200) {
            form.setFieldsValue({
                fakeId: ""
            })
            handleSendMessage({
                ...form.getFieldsValue(),
                text: "",
                media: {
                    url: res.data.url,
                    public_id: res.data.public_id
                }
            })
            setMediaLoading(false);

        } else {
            setMediaLoading(false);

        }

    }

    const handleOnScrollTop = (e) => {
        if (!props?.data?.isOver) {

            if (Math.ceil(e.target.offsetHeight + (-e.target.scrollTop)) >= e.target.scrollHeight) {
                dispatch(getMessage(props?.data));
            }
        }
    }



    return (
        <>
            <Form form={form} onFinish={handleSendMessage}>
                <Form.Item name="sender" hidden initialValue={user._id}>
                    <Input></Input>
                </Form.Item>
                {/* <Form.Item name="fakeId" hidden initialValue={props?.data?.fakeId}>
                <Input></Input>
            </Form.Item> */}
                <Form.Item hidden name="media">
                    <input onChange={handleOnFileChange} ref={fileRef} type="file" />
                </Form.Item>
                <ConversationItemWrapper>
                    <div className="header">
                        <div className="header-left">
                            <div className="avatar">
                                <Avatar src={recipient?.avatar?.url} />
                            </div>
                            <div className="information">
                                <div className="username">{recipient.username}</div>
                                <div className="activity-status">
                                    Đang hoạt động
                                </div>
                            </div>
                        </div>
                        <div className="header-right">
                            <MinusOutlined />
                            <CloseOutlined onClick={() => {
                                dispatch(toggleConversation(props?.data?._id || props?.data?.fakeId))
                            }} />
                        </div>

                    </div>
                    <div className="body" onScroll={handleOnScrollTop} >
                        {props?.data?.messages?.map((m, index) => <Message key={index} data={m} nextMess={props?.data?.messages[index - 1] || null} prevMess={props?.data?.messages[index + 1] || null} recipient={recipient} type={m?.sender === user._id ? 'me' : 'friend'} />)}
                    </div>
                    <div className="footer">
                        <ImageIcon onClick={() => fileRef.current.click()} />
                        <Form.Item name="text" noStyle>
                            <Input ref={inputRef} onKeyDown={(e) => {
                                if (e.keyCode === 13) {

                                    form.submit()
                                }

                            }} onChange={(e) => {
                                if (!sendIconShow && e.target.value) {
                                    setSendIconShow(true)
                                }
                                if (sendIconShow && !e.target.value) {
                                    setSendIconShow(false)
                                }
                            }} noStyle suffix={<ChooseEmoji setContent={handleChosseEmoji} id={`emoji-message-${Math.random()}`} />}></Input>
                        </Form.Item>
                        {mediaLoading ? <LoadingOutlined className='media-loading' /> : sendIconShow ? <SendOutlined onClick={() => {
                            form.submit()
                        }} className="send-icon" /> : <LikeIcon onClick={() => {

                            handleSendMessage({
                                ...form.getFieldsValue(),
                                text: "",
                                icon: true
                            })
                        }} />}

                    </div>
                </ConversationItemWrapper>
            </Form>
        </>
    )
}

ConversationItem.propTypes = {}

export default ConversationItem