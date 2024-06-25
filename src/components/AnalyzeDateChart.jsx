import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Button, CircularProgress, ButtonGroup } from '@mui/material';
import axios from 'axios';



const AnalyzeDateChart = () => {
  const [data, setData] = useState([]);
  const [selectedFactor, setSelectedFactor] = useState('all');
  const [loading, setLoading] = useState(false);

  const factors = [
    'Exchange Rates',
    'Fiscal Policy',
    'GDP Growth',
    'Inflation',
    'International Trade',
    'Monetary Policy',
    'Unemployment',
  ];

  useEffect(() => {
    fetchData(selectedFactor);
  }, [selectedFactor]);

  const fetchData = async (factor) => {
    setLoading(true);
    try {
      const response = await axios.post('http://192.168.8.134:5000/get_avg_sentiments_by_factor', { factor });
    
      if (factor === 'all') {
        // Transform the data from the server response format to the chart-compatible format
        const transformedData = Object.keys(response.data).map(year => ({
          year,
          ...Object.fromEntries(
            Object.entries(response.data[year]).map(([key, value]) => [key, value * 100])
          )
        }));
        setData(transformedData);
      } else {
        // Transform the data for a single factor
        const transformedData = response.data.map(item => ({
          year: item.year,
          [factor]: item.value * 100,
        }));
        setData(transformedData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const handleFactorChange = (factor) => {
    setSelectedFactor(factor);
  };

  const renderLines = () => {
    if (selectedFactor === 'all') {
      return factors.map((factor, index) => (
        <Line key={factor} type="monotone" dataKey={factor} stroke={getColor(index)} />
      ));
    }
    return <Line type="monotone" dataKey={selectedFactor} stroke="#8884d8" />;
  };

  const getColor = (index) => {
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#387908', '#00008b', '#8b0000'];
    return colors[index % colors.length];
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
        <ButtonGroup variant="outlined" aria-label="outlined button group" size="small">
          <Button
            key="all"
            onClick={() => handleFactorChange('all')}
            variant={selectedFactor === 'all' ? 'contained' : 'outlined'}
            sx={{ minWidth: 50, fontSize: '0.5rem' }}
          >
            All
          </Button>
          {factors.map((factor) => (
            <Button
              key={factor}
              onClick={() => handleFactorChange(factor)}
              variant={selectedFactor === factor ? 'contained' : 'outlined'}
              sx={{ minWidth: 60, fontSize: '0.5rem' }}
            >
              {factor}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
      {loading ? (
        <CircularProgress />
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            {renderLines()}
          </LineChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};

export default AnalyzeDateChart;
