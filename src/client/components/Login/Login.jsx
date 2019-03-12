import React from 'react';
import {connect} from "react-redux";
import {Redirect} from 'react-router';
import loginActions from "../../../redux/login/actions";
import LoginWrapper from './LoginWrapper.style.js';
import {Button} from 'antd';
import Layouts from '../Layout/Layouts.jsx';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.getUserRequest = this.getUserRequest.bind(this)
  }

  getUserRequest() {
    const {getUser} = this.props;
    getUser();
  }

  render() {
    if (this.props.user) {
      return <Redirect to='/charts'/>
    } else {
      return (
        <Layouts>
          <LoginWrapper className='loginWrapper'>
            <div className='box'>
              <div className='box-header'>
                <p>Please logged in</p>
              </div>
              <div className='box-button'>
                <Button type="ghost" shape="round" icon="smile" size='large'
                        onClick={this.getUserRequest}>Google</Button>
              </div>
            </div>
          </LoginWrapper>
        </Layouts>
      )
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getUser: loginActions.loginUser}, dispatch)
}

Login.propTypes = {
  loginUser: PropTypes.func,
  user: PropTypes.object
};

export default connect(({user}) => ({user}), mapDispatchToProps)(Login);