import React from 'react';
import {Layout} from 'antd';
import LayoutWrapper from './Layout.style';
import {connect} from 'react-redux';
import {Button} from 'antd';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';

const {Header, Content, Footer} = Layout;

class Layouts extends React.Component {
  constructor(props) {
    super(props)
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    window.location.href = 'http://localhost:3000/logout'
  }

  render() {
    return (
      <LayoutWrapper>
        <Layout className='layout'>
          <Header className='header'>
            <div className='logo'>
              <p>Welcome to weather forecast app</p>
            </div>
            {this.props.user ?
              <div className='buttonWrapper'>
                <Button type="ghost" shape="round" size='large'
                        onClick={this.logOut}>Logout
                </Button>
              </div>
              : null
            }
          </Header>
          <Content className='content'>
            {this.props.children}
          </Content>
          <Footer className='footer'>
            <p>Inspired by default!</p>
          </Footer>
        </Layout>
      </LayoutWrapper>
    )
  }
}

Layouts.propTypes = {
  user: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default connect(({user}) => ({user}))(Layouts);
