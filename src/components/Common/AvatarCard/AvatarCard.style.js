import { Row } from "antd";
import styledComponents from "styled-components";

export const AvatarCardWrapper = styledComponents(Row)`

.ant-avatar{
    border-radius:10px;
    width: 40px;
    height: 40px;
    object-fit:cover;
}
.actor{
    margin-right: .5rem;
    font-weight: 500;

}
`;