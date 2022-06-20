import styledComponents from "styled-components";

export const MessageWrapper = styledComponents.div`
    display: flex;
    gap: .5rem;
    align-items: flex-end;
    .ant-avatar{
        flex-shrink:0;
    }
& + &{
    margin-bottom: .5rem;
}    
    justify-content:${props=> props['attr-type']==="me"?'right;':'initial;'}
   
    &.me{
        margin-right: 1rem;
    }

    .like{
        width: 50px;
        height: 50px;
    }
        

    
    .content{
        max-width: 200px;
        background: ${props=>props['attr-background']};
        color: ${props=>props['attr-color']};
        padding: 1rem;
        font-size: 1.5rem;
        border-radius:15px;
        word-break: break-all;


    }

    .image{
        width: 150px;
        height:150px;
        object-fit: contain;
        border: thin solid rgba(0,0,0,0.2);
    }
`;