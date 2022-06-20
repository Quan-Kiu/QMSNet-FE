import { Button, Col, Collapse, DatePicker, Form, Input, Row, Select, Switch } from 'antd'
import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { MinusCircleOutlined, PlusOutlined, SaveOutlined } from '../../../../components/icons'
import { updateProfile } from '../../../../redux/auth/action'
import { authSelector } from '../../../../redux/auth/reducer'

const InfomationForm = styled(Form)`
  .title{
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .ant-row.ant-form-item{
    margin-bottom: 10px;
  }
  .ant-collapse-content > .ant-collapse-content-box{
    padding: 10px;
  }
  .ant-collapse-icon-position-right > .ant-collapse-item > .ant-collapse-header{
    font-size: 1.8rem;
    font-weight: 600;
    padding: 10px 0;
    padding-left: 10px;
  }
`;

const Information = props => {
  const dispatch = useDispatch();
  const {user} = useSelector(authSelector);
  const [province,setProvince] = useState([]);
  const [districts,setDistricts] = useState();
  useEffect(() => {
    const fetchApi = async()=>{
      const res = await axios.get('https://provinces.open-api.vn/api/?depth=2');
      if(res.data?.length>0){
        setProvince(res.data);
      }
    }
    fetchApi();
  },[])

    const handleOnUpdate = (values)=>{
        dispatch(updateProfile({...values,dob:values?.dob}))
  }
    const [form] = Form.useForm();
  return (
    <InfomationForm  layout="vertical" form={form} onFinish={handleOnUpdate}>
      
      <Collapse defaultActiveKey={'general'} expandIconPosition={"right"} >
      <Collapse.Panel header="Thông tin chung" key="general">
        <Form.Item initialValue={user.fullname} label="Họ và tên" name="fullname">
          <Input size="large"></Input>
        </Form.Item>
        <Form.Item  label="Ngày sinh" name="dob">
        <DatePicker size="large" defaultValue={moment(user?.dob)} style={{
          width: '100%'
        }} dropdownClassName="q-date-picker" format={'DD/MM/YYYY'} />
        </Form.Item>
        <Form.Item  initialValue={user?.mobile} label="Số điện thoại" name="mobile">
        <Input size="large"  />
        </Form.Item>
        <Form.Item initialValue={user?.gender} label="Mối quan hệ" name="gender">
            <Select size="large">
                <Select.Option value={1}>Nam</Select.Option>
                <Select.Option value={2}>Nữ</Select.Option>
            </Select>
        </Form.Item>
        <Form.Item initialValue={user?.maritalStatus} label="Mối quan hệ" name="maritalStatus">
            <Select size="large">
                <Select.Option value={1}>Độc thân</Select.Option>
                <Select.Option value={2}>Đang hẹn hò</Select.Option>
                <Select.Option value={3}>Đã kết hôn</Select.Option>
            </Select>
        </Form.Item>
      </Collapse.Panel>
      <Collapse.Panel header="Công việc" key="works">
      <Row>
      <Col span={24}>
       <Form.List  initialValue={user?.works||[]} name="works">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row key={key} gutter={[10,10]} align="top">
                <Col flex={1}>
                Tên công ty
                <Form.Item
                  style={{
                    flex: '1'
                  }}
                  {...restField}
                  name={[name, 'name']}
                  rules={[{ required: true, message: 'Vui lòng nhập tên công ty!' }]}
                >
                  <Input size="large"  placeholder="Công ty" />
                </Form.Item>
                Chức vụ
                <Form.Item
                  {...restField}
                  name={[name, 'position']}
                  rules={[{ required: true, message: 'Vui lòng nhập tên chức vụ!' }]}
                >
                  <Input size="large" placeholder="Chức vụ" />
                </Form.Item>
                Tôi đang làm việc ở đây
                <Form.Item
                  {...restField}
                  name={[name, 'working']}
                >
                  <Switch size="large" defaultChecked={user?.works[key]?.working} valuePropName="checked"></Switch>
                </Form.Item>
                
                </Col>
                <Col style={{
                  paddingRight: '10px'
                }}>
                <MinusCircleOutlined onClick={() => remove(name)} />
                </Col>
              </Row>
            ))}
            {(user?.works?.length + fields.length)<3 &&  <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Thêm công việc
              </Button>
            </Form.Item>}
           
          </>
        )}
      </Form.List>
      </Col>
        </Row>
      </Collapse.Panel>
      <Collapse.Panel header="Trường Học" key="schools">
      <Row>
      <Col span={24}>
       <Form.List initialValue={user?.schools} name="schools">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row key={key} gutter={[10,10]} align="top">
                <Col flex={1}>
                <Form.Item
                  style={{
                    flex: '1'
                  }}
                  {...restField}
                  name={[name, 'name']}
                  rules={[{ required: true, message: 'Vui lòng nhập tên trường!' }]}
                >
                  <Input  placeholder="Tên Trường" />
                </Form.Item>
                Tôi đang học ở đây
                <Form.Item
                  {...restField}
                  name={[name, 'learning']}
                >
                  <Switch defaultChecked={user?.schools[key]?.learning}></Switch>
                </Form.Item>
                
                </Col>
                <Col>
                <MinusCircleOutlined onClick={() => remove(name)} />
                </Col>
              </Row>
            ))}
           {(user?.schools?.length + fields?.length <3)&& <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Thêm trường học
              </Button>
            </Form.Item>}
          </>
        )}
      </Form.List>
      </Col>
        </Row>
      </Collapse.Panel>
      <Collapse.Panel header="Nơi Ở/Quê Quán" key="address">
      <Form.Item initialValue={user?.address} name="address" label="Nơi ở hiện nay">
        <Row gutter={10}>
            <Col span={12}>
          <Form.Item
            name={['address', 'province']}
            noStyle
            rules={[{ required: true, message: 'Tỉnh/Thành không được để trống' }]}
            >
            <Select size="large" onChange={async(value,options)=>{
               const res = await axios.get(`https://provinces.open-api.vn/api/p/${options.code}?depth=2`);
               if(res.data){
                setDistricts(res.data);
               }
            }} showSearch optionFilterProp='name' options={province} fieldNames={{
              label: 'name',
              value: 'name'

            }} placeholder="Chọn tinh thành">
            </Select>
          </Form.Item>
          </Col>

          <Col span={12}>

          <Form.Item
            name={['address', 'district']}
            noStyle
            
            rules={[{ required: true, message: 'Thị xã/Huyện không được để trống' }]}
            >
            <Select size="large" showSearch optionFilterProp='name' options={districts?.districts} fieldNames={{
              label: 'name',
              value: 'name'
              
            }} placeholder="Chọn Thị xã/Huyện">
            </Select>
          </Form.Item>
      </Col>
              </Row>
      </Form.Item>
      <Form.Item initialValue={user?.countryside} name="countryside" label="Quê quán">
        <Row gutter={10}>
            <Col span={12}>
          <Form.Item
            name={['countryside', 'province']}
            noStyle
            rules={[{ required: true, message: 'Tỉnh/Thành không được để trống' }]}
            >
            <Select size="large" onChange={async(value,options)=>{
               const res = await axios.get(`https://provinces.open-api.vn/api/p/${options.code}?depth=2`);
               if(res.data){
                setDistricts(res.data);
               }
            }} showSearch optionFilterProp='name' options={province} fieldNames={{
              label: 'name',
              value: 'name'

            }} placeholder="Chọn tinh thành">
            </Select>
          </Form.Item>
          </Col>

          <Col span={12}>

          <Form.Item
            name={['countryside', 'district']}
            noStyle
            
            rules={[{ required: true, message: 'Thị xã/Huyện không được để trống' }]}
            >
            <Select size="large" showSearch optionFilterProp='name' options={districts?.districts} fieldNames={{
              label: 'name',
              value: 'name'
              
            }} placeholder="Chọn Thị xã/Huyện">
            </Select>
          </Form.Item>
      </Col>
              </Row>
      </Form.Item>
       
      </Collapse.Panel>
     
    </Collapse>
        <Form.Item>
        <Button icon={<SaveOutlined/>} size="large" style={{
          marginTop: '10px',
          width: '100%',
        }} type="primary" htmlType="submit">
          Lưu
        </Button>
      </Form.Item>
    </InfomationForm>
  )
}

Information.propTypes = {}

export default Information