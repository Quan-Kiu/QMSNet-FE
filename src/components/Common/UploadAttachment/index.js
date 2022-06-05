import { Col, Image, Modal, Progress, Row, Upload } from 'antd';
// import { imageUrl } from '../../constants/ApiUrl';
// import { arrayToString } from '../../util/handleImage';
import axios from 'axios';
import React, { useState } from 'react';
import { UploadWrapper } from './UploadAttachment.style';
import {EyeOutlined,DeleteOutlined,CloseOutlined} from '@ant-design/icons';
import { arrayToString } from '../../../utils/image_utils';

const UploadAttachment = ({ onImageChange, maxCount }) => {

    const [fileList, setFileList] = useState([]);
    const [preview, setPreview] = useState(false);
    const [videoPreview, setVideoPreview] = useState(false);

    const onChange = ({ fileList: newFileList }) => {
        if (newFileList.length === 0) {
            onImageChange(null);
            setFileList(newFileList);
        } else {
           
                setFileList(newFileList);
                
                if (newFileList[newFileList.length - 1]?.status === 'done') {
                    const filesUrl = arrayToString(newFileList);
                    onImageChange(filesUrl);
                }
            
        }
    };

    const uploadImage = async options => {
        const {action, onSuccess, onError, file, onProgress } = options;
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
          onError({ err });
        }
      };

    return (
        <>
            {preview && (
                <Image
                    style={{ display: 'none' }}
                    src={preview}
                    preview={{ visible: !!preview, onVisibleChange: () => setPreview('') }}
                />
            )}
            {videoPreview && (
                <div className="video-preview-modal scale-up-center"
              >
                  <div className="mark">
                    <CloseOutlined onClick={()=>setVideoPreview('')}/>
                  </div>
                <video
                  autoPlay
                  controls
                >
                  <source
                    src={videoPreview}
                    type="video/mp4"
                  />
                </video>

              </div>
            )}
            <UploadWrapper
                action="https://api.cloudinary.com/v1_1/quankiu/upload"
                listType="picture-card"
                customRequest={uploadImage}
                itemRender={(props,file,files,actions)=>{
                    return <div className="media-preview">
                        {file.type.match('image.*') && <img src={file?.response?.url}/>}
                        {file.type.match('video.*') && file?.response?.url && <video width="100%" height="100%" >
                                                        <source src={file?.response?.url} type="video/mp4"/>
                                                    </video>}
                        <div className="mark">
                            <Row gutter={12}>
                                <Col><EyeOutlined onClick={()=>{
                                    console.log(file.type.match('image.*'))
                                    file.type.match('image.*')? setPreview(file?.response?.url):setVideoPreview(file?.response?.url)}}/></Col>
                                <Col><DeleteOutlined onClick={actions.remove} /></Col>
                            </Row>
                        </div>
                    </div> 
                }}
                fileList={fileList}
                onChange={onChange}
                maxCount={maxCount}
            >
                {fileList.length < maxCount && '+ Upload'}

            </UploadWrapper>
           
        </>
    );
};

export default UploadAttachment;
