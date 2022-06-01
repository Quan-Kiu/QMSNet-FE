const { createGlobalStyle } = require('styled-components');

export const GlobalStyle = createGlobalStyle`

*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

html{
    font-size: 62.5%;
}

body{
    font-size: 1.4rem;
    background: rgba(249,249,249,1);
}

ul,li{
    padding:0;
    margin:0;
    box-sizing: border-box;
    list-style-type: none;
}

  
  a{
    text-decoration: none;
  }
  
  
  img{
    display: block;
    max-width: 100%;
  }
  
  .section-title{
    padding: 1rem 0;
    font-size: 1.6rem;
    font-weight: 600;
    opacity: .6;
    text-transform: uppercase;
}

.box-shadow{
    -webkit-box-shadow:0px 0px 10px 4px rgba(62,66,66,0.05);
-moz-box-shadow: 0px 0px 10px 4px rgba(62,66,66,0.05);
box-shadow: 0px 0px 10px 4px rgba(62,66,66,0.05);
}


.ant-modal-wrap{
    z-index:1000000;
}
.ant-message{
    
    z-index:1000000;
}

.ant-btn-primary{
    background: ${(style)=>style.theme.blueClr};
    border-color: ${(style)=>style.theme.blueClr};
}

.ant-btn-primary[disabled]{
    background: #1890ff8c;
    color: white;   
    &:hover{
        background: #1890ff8c;
    color: white;  
    }
}

.username{
    color: ${(style)=>style.theme.headingTextClr};
    font-size: 1.6rem;
    font-weight: 600;   
}

.q-button{
    border-radius: 10px;
    &.button-primary{
    }
    &.button-outline{
}
}
.new-post-modal{
    .ant-modal-header{
        .ant-modal-title{
            font-size: 2rem;
            font-weight: 700;

        }
        text-align: center;
    }
    
    .ant-modal-footer{
        button{
            width: 100%;
        } 
            
    }
}




}

`;
