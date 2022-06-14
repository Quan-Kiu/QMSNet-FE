import styledComponents from "styled-components";

export const CommentWrapper = styledComponents.div`
    margin-top: 10px;
    .avatar-card{
        align-items: start!important;
    }
    .likes, .reply{
        font-weight: 700;
        opacity: .6;
    }
    svg{
        width: 12px;
        height: 12px;
        cursor: pointer;
    }


    
    .actions{
        font-weight: 500;
        opacity:.7;
        cursor: pointer;
        margin-top:1rem;
        font-size: 1.2rem;
        &-more{
            display: none;
        }
        &:hover{
            .actions-more{
                display: block;
            }

        }
    }
`;