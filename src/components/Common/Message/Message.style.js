import styledComponents from "styled-components";

export const MessageWrapper = styledComponents.div`
    display: flex;
    gap: .5rem;
    align-items: flex-end;
    .ant-avatar{
        flex-shrink:0;
    }
& + &{
    margin-top: .5rem;
}    
    justify-content:${props=> props['attr-type']==="me"?'right;':'initial;'}
   

        

    
    .content{
        max-width: 200px;
        background: ${props=>props['attr-background']};
        color: ${props=>props['attr-color']};
        padding: 1rem;
        font-size: 1.5rem;
        border-radius:15px;
        word-break: break-all;


    }
`;