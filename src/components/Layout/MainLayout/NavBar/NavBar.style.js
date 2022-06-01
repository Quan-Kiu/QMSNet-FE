import styledComponents from "styled-components";

export const NavBarWrapper = styledComponents.div`

    .ant-row{
        padding: 2rem 1rem;
        cursor: pointer;
        margin-left: -2.3rem !important;
        margin-right: -2rem !important;
        color: ${(style)=>style.theme.headingTextClr};
        font-weight: 600;
        opacity: .6;
        border-left: 3px solid transparent;
        &+.ant-row{
            border-top: 1px solid rgba(0,0,0,0.1);
        }
        &.active{
            opacity: 1;
            svg{
                fill: ${(style)=>style.theme.blueClr};
                path{
                    color: ${(style)=>style.theme.blueClr};
                    
                }
            }
            color: ${(style)=>style.theme.blueClr};
            border-left: 3px solid ${(style)=>style.theme.blueClr};
            background: rgba(0,0,0,0.02);
        }
    }

`;