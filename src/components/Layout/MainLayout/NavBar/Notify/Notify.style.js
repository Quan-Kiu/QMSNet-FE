import styledComponents from "styled-components";

export const NotifyWrapper = styledComponents.div`
display: flex;
gap: 1rem;
color: black;
padding: 1rem;
margin: 0 -1rem;
cursor: pointer;
border-radius:.5rem;
position: relative;
padding-right: 3rem;
.notify-media{
    width: 50px;
    *{
        width: 100%;
    }
}
&:after {
    content: '';
    background: ${props => props.theme['fds_blue60']};
    right: 1rem;
    position: absolute;
    width: 10px;
    top: 50%;
    transform: translateY(-50%);
    height: 10px;
    border-radius:50%;
}
&:hover{
    background: rgba(0,0,0,0.08);

}
.preview-content{
    display: inline-block;
    word-break: break-all;
        -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    display:-webkit-inline-box;
    line-height: 1;
}


&.isRead{
    opacity:.8;
    &:after{
        display: none;
    }
    .createdAt{
        color: black;
        font-weight: 400;
    }
}
.createdAt{
    font-weight: 500;
    font-size:1.3rem;
    
    color: ${props => props.theme['fds_blue60']};

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