import styledComponents from "styled-components";

export const HeaderWrapper = styledComponents.div`
    padding: 2rem 4rem;
    -webkit-box-shadow:0px 5px 15px 5px rgba(62,66,66,0.1);
    -moz-box-shadow: 0px 5px 15px 5px rgba(62,66,66,0.1);
    box-shadow: 0px 5px 15px 5px rgba(62,66,66,0.1);
position: fixed;
left: 0;
right: 0;
z-index: 999;
background: ${(themes)=>themes.theme.bg};



    .header__content{

        &__logo{
            img{
                width: 10rem;
                object-fit: cover;
            }
        }
        &__func{
            &__search{
                width: 30rem;
                & > span{
                    border-radius:8px;
                    background: rgba(0,0,0,0.03);
                    pointer-event: none;
                    
                    svg{
                        background: transparent;

                        opacity: .5;
                    }
                    input{
                        background: initial;
                    }
                }
            }
            &__create-post{
                button{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: .5rem;
                    border-radius: 8px;
                    font-weight: 500;
                }
                svg{
                    width: 2rem;
                    height: 2rem;
                }
            }
        }
    }


`;