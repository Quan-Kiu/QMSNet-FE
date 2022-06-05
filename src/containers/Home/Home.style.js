import styledComponents from 'styled-components';
import { lg, md } from '../../constants/breakPoint';
import useResponsive from '../../hooks/useResponsive';

export const HomeWrapper = styledComponents.div`
    .main__content{
        height: 100rem;
    }
    .container{

        .left-bar{
            z-index: 999;
        }

        & > .ant-col:nth-child(3){
            padding: 0!important;
            
        }
        & .ant-col:nth-child(1){
            
            ${useResponsive`${lg};
            .box-shadow{
                .ant-row{
                    & > .ant-col:nth-child(2){
                        display:none;
                    }
                }
            }

            .left-bar{
                
                         position: fixed;
                         .navbar-item{
                             .ant-col{
                                 padding-left: 16px !important;
                                }
                            }
                        }
                        
                    }
                        `}
                        
                        
                    }

     
    .right-bar{
        padding: 0 .8rem;
        top:10rem;
        width: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        &::-webkit-scrollbar {
            width: 8px;
          }
          
    &::-webkit-scrollbar-thumb {
      background: rgba(0,0,0,0.2); 
    
      border-radius: 10px;
    }
}
`;

export const MainContentWrapper = styledComponents.div`
.new-post{
    &__content{
        input{
           border: unset;
           &:focus{
               border: unset;
               box-shadow: unset;
               outline: none;
           }
        } 
    }
}

.posts{
    &__content{
        padding: 2rem;
    }
    .text-content{
        margin: 1rem 0;
    }
    .media-content{
        img{
            height: 60rem;
            object-fit: cover;
            width: 100%;
            border-radius: 20px;
        }
    }
}
    
`;