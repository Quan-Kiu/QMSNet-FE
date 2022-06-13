import { Row } from "antd";
import styled from "styled-components";

export const PostModalWrapper = styled(Row)`
    height: 90vh;
    padding-top: 0;
    padding-bottom: 0;

    & > .ant-col:first-child{
        .ant-skeleton-avatar{
            width: 100%;
            height: 90vh;
        }
        display: flex;
        background: black;
        flex-direction: column;
        justify-content: center;
        img,video{
            max-height: 90vh;
            object-fit: contain;
        }
    }
    & > .ant-col:last-child{
        max-height: 90vh;
        display: flex;
        flex-direction: column;

        .comments{
            &::-webkit-scrollbar {
                display: none;
            }
            flex: 1;
            overflow: auto;
        }
    }
`;