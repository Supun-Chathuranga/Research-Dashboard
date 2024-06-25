// src/components/SentimentScoreBar.jsx
import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

class SentimentScoreBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      year: '2020', // Default year set to 2020
      series: [{
        data: []
      }],
      options: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            borderRadiusApplication: 'end',
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: [],
        }
      },
    };

    this.handleYearChange = this.handleYearChange.bind(this);
  }

  componentDidMount() {
    // Fetch data for the default year when the component mounts
    this.fetchData(this.state.year);
  }

  handleYearChange(event) {
    const selectedYear = event.target.value;
    this.setState({ year: selectedYear }, () => {
      this.fetchData(selectedYear);
    });
  }

  fetchData(year) {
    axios.post('http://192.168.8.134:5000/get_avg_sentiments_by_year', { year: year })
      .then(response => {
        const apiData = response.data;
        const categories = Object.keys(apiData);
        const data = Object.values(apiData).map(value => value * 100);

        this.setState({
          series: [{
            data: data
          }],
          options: {
            ...this.state.options,
            xaxis: {
              categories: categories
            }
          }
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  render() {
    return (
      <Box>
        <FormControl fullWidth variant="outlined" style={{ marginBottom: '20px' }}>
          <InputLabel id="year-label">Year</InputLabel>
          <Select
            labelId="year-label"
            value={this.state.year}
            onChange={this.handleYearChange}
            label="Year"
          >
            <MenuItem value={2018}>2018</MenuItem>
            <MenuItem value={2019}>2019</MenuItem>
            <MenuItem value={2020}>2020</MenuItem>
            <MenuItem value={2021}>2021</MenuItem>
            <MenuItem value={2022}>2022</MenuItem>
            <MenuItem value={2023}>2023</MenuItem>
            <MenuItem value={2024}>2024</MenuItem>
            {/* Add more years as needed */}
          </Select>
        </FormControl>
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={400} />
        </div>
        <div id="html-dist"></div>
      </Box>
    );
  }
}

export default SentimentScoreBar;
