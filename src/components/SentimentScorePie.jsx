import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/Forecast.css'; // Ensure the CSS file path is correct

const Forecast = () => {
  const [factors, setFactors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = process.env.REACT_APP_API_URL;
      
      console.log('API URL:', apiUrl);
      try {
        const response = await axios.get('http://192.168.8.134:5000/forecast'); // Replace with your API endpoint
        const data = response.data;
        const formattedFactors = Object.keys(data.forecasts).map(key => ({
          factor: key,
          value: (data.forecasts[key] * 100).toFixed(2), // Multiply by 100 and format to 2 decimal places
          percentage: data.changes[key].toFixed(2) // Format to 2 decimal places
        }));
        setFactors(formattedFactors);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="forecast-container-unique">
      <div className="cards-container-unique">
        {factors.map((item, index) => (
          <div className="card-unique" key={index}>
            <h2 className="factor-title-unique">{item.factor}</h2>
            <p className="value-unique">{item.value}%</p>
            <div className="percentage-and-comparison-unique">
              <div className="comparison-unique">
                <p className={`percentage-unique ${item.percentage < 0 ? 'negative-unique' : 'positive-unique'}`}>
                  {item.percentage < 0 ? '▼' : '▲'} {Math.abs(item.percentage)}%
                </p>
              </div>
              <div className="comparison-details-unique">
                <p className="compared-to-unique">In The</p>
                <p className="date-range-unique">Up Coming Year</p> {/* This can be adjusted if dynamic date range is provided */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
