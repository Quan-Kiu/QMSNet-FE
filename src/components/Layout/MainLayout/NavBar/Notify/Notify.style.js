import styledComponents from "styled-components";

export const NotifyWrapper = styledComponents.div`
display: flex;
gap: 1rem;
color: black;
padding: 1rem;
margin: 0 -1rem;
cursor: pointer;
border-radius:.5rem;
&:hover{
    background: rgba(0,0,0,0.08);

}
.createdAt{
    font-weight: 500;
    font-size:1.3rem;
}
.right{
    .content{
        word-break: break-all;
        -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    display: -webkit-box;
    }
}
font-weight: 400;
span{
    font-weight: 600;
}
.ant-avatar{
    flex-shrink:0;
    width: 60px;
    height: 60px;
    object-fit: contain;
}
`;