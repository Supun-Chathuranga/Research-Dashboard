import React, { Component } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class SentimentScoreBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    axios.get('http://192.168.8.134:5000/get_current_comparative_data')
      .then(response => {
        const apiData = response.data;
        const chartData = Object.keys(apiData).map(key => ({
          name: key,
          report_score: apiData[key].report_score * 100,
          survey_score: apiData[key].survey_score * 100
        }));

        this.setState({ data: chartData });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  renderCustomLegend = (props) => {
    const { payload } = props;
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
          <Box sx={{ width: '12px', height: '12px', backgroundColor: payload[0].color, marginRight: '5px' }}></Box>
          <Typography variant="body2">{payload[0].value}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '12px', height: '12px', backgroundColor: payload[1].color, marginRight: '5px' }}></Box>
          <Typography variant="body2">{payload[1].value}</Typography>
        </Box>
      </Box>
    );
  };

  render() {
    return (
      <Box>
        <BarChart
          width={500}
          height={400}
          data={this.state.data}
          margin={{
            top: 10, right: 0, left: 0, bottom: 2,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, dx: -5, dy: 5 }}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis />
          <Tooltip />
          <Legend content={this.renderCustomLegend} />
          <Bar dataKey="report_score" fill="#8884d8" name="Report Score" />
          <Bar dataKey="survey_score" fill="#82ca9d" name="Survey Score" />
        </BarChart>
        <div id="html-dist"></div>
      </Box>
    );
  }
}

export default SentimentScoreBar;
