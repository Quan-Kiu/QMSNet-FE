import styledComponents from "styled-components";

export const PostWrapper = styledComponents.div`

& + &{
    margin-top: 2rem;
}
.post__container{

    padding-bottom: 0;
}
    .actions{
        padding: 1.5rem 0 .5rem 0;
        svg{
            width: 28px;
            height: 28px;
            cursor: pointer;
        }
    }

    .stats{
        font-weight: 600;
        font-size:1.6rem;
    }

    .text-content{
        white-space: pre-line;
        font-size: 2rem;
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