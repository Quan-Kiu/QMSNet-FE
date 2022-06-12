import styledComponents from "styled-components";

export const BoxWrapper = styledComponents.div`
    border: thin solid rgb(242, 242, 242);
    padding:2rem 2rem;
    z-index: 1;
    width: 100%;
    background: white;
    border-radius: 6px;
    -webkit-box-shadow:0px 0px 5px 0px rgba(62,66,66,0.15);
    -moz-box-shadow: 0px 0px 5px 0px rgba(62,66,66,0.15);
    box-shadow: 0px 0px 5px 0px rgba(62,66,66,0.15);
`;