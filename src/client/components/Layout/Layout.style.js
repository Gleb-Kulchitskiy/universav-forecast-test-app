import styled from 'styled-components';

const LayoutWrapper = styled.div`
 .layout{
   min-height: 100vh;
   display: flex;
   justify-content: center;
   flex-direction: column;
   .header{
   flex: 1;
   background-color: #f0f2f5;
     .buttonWrapper{
     position: absolute;
     right: 30px;
     top: 1px;
     }
     .logo{
       display: flex;
       align-items: center;
       justify-content: center;
       height: 100%;
       text-align: center;
         p{
         color: #073258;
         margin: 0;
         font-size: 30px;
       }  
     }
   }  
   .content{
     flex: 4;
     display: flex;
     justify-content: center;
     align-items: center;
     .chatWrapper{
     width: 100%;
     height: 100%;
     display: flex;
     flex-direction: column
     }
     .chartWrapper{
     padding-top: 25px;
     }
    }
   .footer{
     flex: 1;
     text-align: center;
     p{
       font-size: 20px;
       color: #073258;
       margin: 0;
   }
  }
`;
export default LayoutWrapper;