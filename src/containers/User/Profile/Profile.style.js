import styledComponents from "styled-components";

export const ProfileWrapper = styledComponents.div`
margin: 0 auto;
width: 100%;
padding: 0 10rem;
margin-top: 10rem;

.header-profile{
    .ant-avatar{
        width: 120px;
        height: 120px;
        border-radius:50%;

    }
    user-select: none;
    .username{
        font-size: 2.5rem;
        font-weight: 700;
        letter-spacing: .2rem;
    }
    .email{
        opacity: .6;
        font-weight: 500;
        font-size: 1.6rem;
    }
    svg{
        width: 25px;
        height: 25px;
    }

    &__right{
        button{
            height: 100%;
        }

        .q-button{
            padding: 1rem 2rem;
            width: 150px;
        }
    }
}

.about{
    .story{
        p{

            margin: 1rem 0;
            margin-bottom: 2rem;
            text-align: center;
        }
    }
}
`;