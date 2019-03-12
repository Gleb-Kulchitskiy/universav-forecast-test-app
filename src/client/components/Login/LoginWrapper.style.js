import styled from 'styled-components';

const LoginWrapper = styled.div`
  height: 350px;
  width: 350px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  .box{
    height: 100%;
    display: flex;
    flex-direction: column;
    border: 2px solid #4e81a0;
    border-radius: 5%;
    .box-header{
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
     p{
     padding-top: 46px;
     margin: 0;
     font-size: 20px;
     color: #2f3540eb;
     }
    }
    .box-button{
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    }
  }
  `;
export default LoginWrapper;