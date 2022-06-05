import { Upload } from "antd";
import styledComponents from "styled-components";

export const UploadWrapper = styledComponents(Upload)`


.media-preview {
    width: 100%;
    height: 100%;
    img,video{
        width: 100%;
        height: 100%;
        object-fit: cover;
        cursor: pointer;
    }
    border: thin solid rgba(0,0,0,0.1);
    position: relative;
    .mark{
        display: none;
        position: absolute;
        inset: 0;
        background: rgba(0,0,0,0.6);
    }

    &:hover{
        .mark{

            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 20px;
        }
    }
   
}
`;