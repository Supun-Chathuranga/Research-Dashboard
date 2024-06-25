import React from "react";
import { Box, Typography } from "@mui/material";
import Logo from "../components/Logo";
import AnalyzeDateChart from "../components/AnalyzeDateChart";
import Summary from "../components/Summary";
import SentimentScoreBar from "../components/SentimentScoreBar";
import SentimentScorePie from "../components/SentimentScorePie";

const DashboardPage = () => {
  return (
    <Box sx={{ height: '100vh', padding: 4, backgroundColor: '#f0f0f0' }}>
      <header className="App-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', marginBottom: '20px', padding: '10px' }}>
        <Logo />
      </header>

      <Box sx={{ 
          display: 'grid', 
          gridTemplateAreas: `"pie chart" "bar summary"`, 
          gridTemplateColumns: '2fr 2fr', 
          gridGap: '20px', 
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px'
        }}>
        <Box sx={{ gridArea: 'pie', border: '1px solid #ccc', borderRadius: '8px', padding: 2, backgroundColor: '#fff' }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>Forecasted Sentiment for the Economy in 2025</Typography>
          <Box sx={{ borderBottom: 1, borderColor: 'grey.500', mb: 2 }} />
          <SentimentScorePie />
        </Box>
        <Box sx={{ gridArea: 'chart', border: '1px solid #ccc', borderRadius: '8px', padding: 2, backgroundColor: '#fff' }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>Changes in Average Sentiment Scores Over Time</Typography>
          <Box sx={{ borderBottom: 1, borderColor: 'grey.500', mb: 2 }} />
          <AnalyzeDateChart />
        </Box>
        <Box sx={{ gridArea: 'bar', border: '1px solid #ccc', borderRadius: '8px', padding: 2, backgroundColor: '#fff' }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>Average Sentiment Across Macroeconomic Factors</Typography>
          <Box sx={{ borderBottom: 1, borderColor: 'grey.500', mb: 2 }} />
          <SentimentScoreBar />
        </Box>
        <Box sx={{ gridArea: 'summary', border: '1px solid #ccc', borderRadius: '8px', padding: 2, backgroundColor: '#fff' }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>Yearly and Factor-Based Economic Report Summary</Typography>
          <Box sx={{ borderBottom: 1, borderColor: 'grey.500', mb: 2 }} />
          <Summary />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;
