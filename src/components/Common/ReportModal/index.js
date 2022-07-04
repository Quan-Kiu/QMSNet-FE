import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { ReportModalWrapper } from './ReportModal.style'
import { Button, Form, Input, Modal, Select } from 'antd'
import axiosClient from '../../../api/axiosClient'


const ReportModal = props => {
    const [options, setOptions] = useState([])
    const [form] = Form.useForm()
    const title = props?.type === 'A' ? 'Báo cáo tài khoản' : 'Báo cáo nội dung';

    const fetchApi = async () => {
        try {
            const res = await axiosClient.post(`/reportType/getAll`, {
                type: props.type
            });
            if (res.success) {
                setOptions(res.data);
            }
        } catch (error) {
        }
    }

    useEffect(() => {
        fetchApi()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Modal visible={props.visible} title={title} footer={null} onCancel={() => {
            props.setVisible(null)
        }} wrapClassName='report-modal'>
            <ReportModalWrapper >
                <Form form={form}>
                    <Form.Item name="type" >
                        <Select >
                            {
                                options.map((o, index) => (<Select.Option key={o.key} value={o.key}>
                                    {o.name}
                                </Select.Option>))
                            }

                        </Select>
                    </Form.Item>

                    <Form.Item name="description" >
                        <Input.TextArea
                            rows={10}></Input.TextArea>
                    </Form.Item>

                    <Button size="large" type="primary" style={{
                        width: '100%'
                    }} className='q-button'>
                        Báo cáo
                    </Button>
                </Form>
            </ReportModalWrapper>
        </Modal>
    )
}

ReportModal.propTypes = {}

export default ReportModal