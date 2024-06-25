import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/Compare.css'; // Ensure the CSS file path is correct
import ArrowUpwardIcon from '@mui/icons-material/TrendingUp';
import ArrowDownwardIcon from '@mui/icons-material/TrendingDown';

const Forecast = () => {
  const [factors, setFactors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.8.134:5000/get_future_comparative_data'); // Replace with your API endpoint
        const data = response.data;

        const formattedFactors = Object.keys(data).map(key => ({
          factor: key,
          value: (data[key].report_score * 100).toFixed(2), // Multiply by 100 and format to 2 decimal places
          percentage: data[key].report_change.toFixed(2), // Format to 2 decimal places
          publicValue: data[key].survey_score.toFixed(2), // Format to 2 decimal places
          publicPercentage: data[key].survey_change.toFixed(2) // Format to 2 decimal places
        }));
        
        setFactors(formattedFactors);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="forecast-container">
      <div className="cards-container">
        {factors.map((item, index) => (
          <div className="card" key={index}>
            <h2 className="factor-title">{item.factor}</h2>
            <div className="card-content">
              <div className="value-section">
                <div className="percentage-and-comparison">
                  <div className="comparison">
                    <p className="public-perception-value3">{item.value}%</p>
                  </div>
                  <div className="comparison-details">
                    <p className="compared-to1">Reports</p>
                    <p className="date-range1">Score</p> {/* This can be adjusted if dynamic date range is provided */}
                  </div>
                </div>
                <div className="percentage-and-comparison">
                  <div className="comparison">
                    <p className={`percentage ${item.percentage < 0 ? 'negative' : 'positive'}`}>
                       {Math.abs(item.percentage)}%
                    </p>
                  </div>
                  <div className="comparison-details">
                    <p className="compared-to">compared to </p>
                    <p className="date-range">2019 jan - 2024 jan</p> {/* This can be adjusted if dynamic date range is provided */}
                  </div>
                </div>
              </div>
              <div className="separator"></div>
              <div className="public-perception-section">
                <div className="percentage-and-comparison">
                  <div className="comparison">
                    <p className="public-perception-value">{Math.abs(item.publicValue * 100)}%</p>
                  </div>
                  <div className="comparison-details">
                    <p className="compared-to1">Public</p>
                    <p className="date-range1">Perception</p> {/* This can be adjusted if dynamic date range is provided */}
                  </div>
                </div>
                <div className="percentage-and-comparison">
                  <div className="comparison">
                    <p className={`public-perception-value1 ${item.publicPercentage < 0 ? 'negative1' : 'positive1'}`}>
                      <span className='eee'>{Math.abs(item.publicPercentage)}%</span>
                      {item.publicPercentage < 0 ? (
                        <ArrowDownwardIcon className="icon negative-icon" />
                      ) : (
                        <ArrowUpwardIcon className="icon positive-icon" />
                      )}
                    </p>
                  </div>
                  <div className="comparison-details">
                    <p className="compared-to">Upcoming Year</p>
                   {/* This can be adjusted if dynamic date range is provided */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
