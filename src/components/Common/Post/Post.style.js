import styledComponents from "styled-components";

export const PostWrapper = styledComponents.div`



& + &{
    margin-top: 2rem;
}
.post__container{

    padding-bottom: 0;
}
    

    .text-content{
        margin: 1rem 0;
        margin-bottom: 0 !important;
        white-space: pre-line;
        font-size: 2rem;
        &.collapse{
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 3;
            display: -webkit-box;
            -webkit-box-orient: vertical;
        }
        &.with-style{
            text-align: center;
            word-break: break-all;
            user-select: none;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height:400px;
            padding: 3rem;
        }

    }


    .post__comment{
        &__stats{
            font-weight: 500;
            opacity: .7;
            cursor: pointer;
            margin: .5rem 0;
        }
    }

   
   
  
`;