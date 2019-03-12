import React from 'react';
import {connect} from 'react-redux';
import Layouts from '../Layout/Layouts';
import Chart from './Chart.jsx';
import {Redirect} from 'react-router';
import PropTypes from 'prop-types';

class Charts extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.user) {
      return this.props.forecast
        ? (
          <Layouts>
            <div className='chartsWrapper'>
              <Chart city={{name: 'kiev', data: this.props.forecast.Kiev}}/>
              <Chart city={{name: 'lviv', data: this.props.forecast.Lviv}}/>
              <Chart city={{name: 'kharkiv', data: this.props.forecast.Kharkiv}}/>
            </div>
          </Layouts>
        )
        : <div>Ola</div>
    }
    else {
      return <Redirect to='/'/>
    }
  }
}

Charts.propTypes = {
  user: PropTypes.object.isRequired,
  forecast: PropTypes.object.isRequired
};

export default connect(({user, forecast}) => ({user, forecast}))(Charts);