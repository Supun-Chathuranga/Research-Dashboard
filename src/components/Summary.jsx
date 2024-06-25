import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, FormControl } from '@mui/material';

const Summary = () => {
  const [year, setYear] = useState('2023'); // Default year set to 2024
  const [factor, setFactor] = useState('Inflation');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false); // New state for loading

  useEffect(() => {
    if (year && factor) {
      // Clear the summary and set loading to true
      setSummary('');
      setLoading(true);

      // Prepare the data to be sent in the POST request
      const requestData = { year, factor };

      // Function to fetch summary
      const fetchSummary = async () => {
        try {
          const response = await fetch('REACT_APP_API_URL:5000/get_summary_by_factor_year', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
          });

          const result = await response.json();
          setSummary(result.summary);
        } catch (error) {
          console.error('Error:', error);
          setSummary('Error fetching summary.');
        } finally {
          // Set loading to false after fetching is done
          setLoading(false);
        }
      };

      fetchSummary();
    }
  }, [year, factor]); // Trigger the effect when either year or factor changes

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleFactorChange = (e) => {
    setFactor(e.target.value);
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <FormControl variant="outlined" style={{ width: '200px' }} disabled={loading}>
          <InputLabel id="year-label">Year</InputLabel>
          <Select
            labelId="year-label"
            value={year}
            onChange={handleYearChange}
            label="Year"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={2018}>2018</MenuItem>
            <MenuItem value={2019}>2019</MenuItem>
            <MenuItem value={2020}>2020</MenuItem>
            <MenuItem value={2021}>2021</MenuItem>
            <MenuItem value={2022}>2022</MenuItem>
            <MenuItem value={2023}>2023</MenuItem>
            <MenuItem value={2024}>2024</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" style={{ width: '200px' }} disabled={loading}>
          <InputLabel id="factor-label">Factor</InputLabel>
          <Select
            labelId="factor-label"
            value={factor}
            onChange={handleFactorChange}
            label="Factor"
          >
            <MenuItem value="Exchange Rates">Exchange Rates</MenuItem>
            <MenuItem value="Fiscal Policy">Fiscal Policy</MenuItem>
            <MenuItem value="GDP Growth">GDP Growth</MenuItem>
            <MenuItem value="Inflation">Inflation</MenuItem>
            <MenuItem value="International Trade">International Trade</MenuItem>
            <MenuItem value="Monetary Policy">Monetary Policy</MenuItem>
            {/* Add more factors as needed */}
          </Select>
        </FormControl>
      </div>
      <p>{loading ? 'Loading...' : summary}</p>
    </div>
  );
};

export default Summary;
