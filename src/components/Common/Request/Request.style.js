import styledComponents from "styled-components";

export const  RequestWrapper = styledComponents.div`
-webkit-box-shadow:0px 0px 10px 4px rgba(62,66,66,0.05);
-moz-box-shadow: 0px 0px 10px 4px rgba(62,66,66,0.05);
box-shadow: 0px 0px 10px 4px rgba(62,66,66,0.05);
margin: 1rem 0;
padding: 2rem;
    background: ${(style)=>style.theme.bg};
    .request-actions{
        margin-top: 2rem;
    }
    
`;