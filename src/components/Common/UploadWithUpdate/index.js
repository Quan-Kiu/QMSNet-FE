import { Button, Col, Image, message, Progress, Row, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { updateProfile } from '../../../redux/auth/action';

const Wrapper = styled.div`
  img{
    border-radius: 50%;
    object-fit:contain;
    border: thin solid rgba(0,0,0,0.2);
  }
  .ant-upload.ant-upload-select{
    width: auto;
    height: auto;
    background: unset;
    border: unset;
  }
  .ant-upload-list-picture-card-container{
    display: none;
  }
`;

const UploadWithUpdate = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const uploadRef = useRef();

  const onChange = ({ fileList: newFileList }) => {
    if (newFileList[0]?.status === 'done') {
      dispatch(updateProfile({
        avatar: {
          url: newFileList[0]?.response?.url,
          public_id: newFileList[0]?.response?.public_id,
        }
      }))
    };
  }

  const uploadImage = async options => {
    const { action, onSuccess, onError, file, onProgress } = options;
    const fmData = new FormData();
    const config = {
      onUploadProgress: event => {
        onProgress({ percent: (event.loaded / event.total) * 100 });
      }
    };
    fmData.append('upload_preset', 'ijubicjh');
    fmData.append('cloud_name', 'quankiu');
    fmData.append('file', file);

    try {
      const res = await axios.post(
        action,
        fmData,
        config
      );
      onSuccess(res.data);
    } catch (err) {
      message.error(err.message);
      onError({ err });
    }
  };



  return (<Wrapper>
    <Row justify="space-between">
      <Col className="edit-title">
        Ảnh đại diện
      </Col>
      <Col>
        <ImgCrop rotate>
          <Upload
            maxCount={1}
            ref={uploadRef}
            action="https://api.cloudinary.com/v1_1/quankiu/upload"
            listType="picture-card"
            customRequest={uploadImage}
            // onPreview={onPreview}
            onChange={onChange}
            howUploadList={false}
          >
            <Button type="link">
              Tải lên
            </Button>
          </Upload>
        </ImgCrop>
      </Col>
    </Row>
    <Row style={{
      flexDirection: "column",
    }} className='edit-preview' align="middle">
      <Image loading={true} width={200} src={user?.avatar?.url}></Image>

    </Row>

  </Wrapper>
  );
};

export default UploadWithUpdate;