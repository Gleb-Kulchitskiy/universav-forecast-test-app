import React from 'react';
import PropTypes from 'prop-types';

import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer, Label
} from 'recharts';

class Chart extends React.Component {
  render() {
    return (
      <div className='chartWrapper'>
        <ResponsiveContainer
          width={1050}
          height={200}
        >
          <LineChart
            data={this.props.city.data || []}
            syncId={ this.props.city.name}
            margin={{
              top: 10, right: 30, left: 0, bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis
              dataKey="hour"
              name='hour'
              tickFormatter={(tickItem) => tickItem < 12
                ? tickItem === 0
                  ? '12Am'
                  : `${tickItem}Am`
                : tickItem === 12
                  ? `${tickItem}Pm`
                  : `${tickItem - 12}Pm`}
            >
              <Label value={ this.props.city.name } offset={0} position="top"/>
            </XAxis>
            <YAxis/>
            <Tooltip/>
            <Line name="temperature" type="monotone" dataKey="temp" stroke="#8884d8" fill="#8884d8"/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

Chart.propTypes ={
  city:PropTypes.object.isRequired
};
Chart.defaultProps = {
  city:{}
};

export default Chart;