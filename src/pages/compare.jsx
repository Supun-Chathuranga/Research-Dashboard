import React from "react";
import { Box, Typography } from "@mui/material";
import Logo from "../components/Logo";
import SentimentScorePie from "../components/SentimentScoreCompare";
import SentimentScoreBar from "../components/SentimentScoreBarChart";

const DashboardPage = () => {
  return (
    <Box sx={{ height: '100vh', padding: 4, backgroundColor: '#f0f0f0' }}>
      <header className="App-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', marginBottom: '20px', padding: '10px' }}>
        <Logo />
      </header>

      <Box sx={{ 
          display: 'grid', 
          gridTemplateAreas: `"pie bar"`, 
          gridTemplateColumns: '2fr 2fr', 
          gridGap: '20px', 
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px'
        }}>
        <Box sx={{ gridArea: 'pie', border: '1px solid #ccc', borderRadius: '8px', padding: 2, backgroundColor: '#fff' }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>Forecasting</Typography>
          <Box sx={{ borderBottom: 1, borderColor: 'grey.500', mb: 2 }} />
          <SentimentScorePie />
        </Box>
        <Box sx={{ gridArea: 'bar', border: '1px solid #ccc', borderRadius: '8px', padding: 2, backgroundColor: '#fff' }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>Comparing Government Report and Public Data</Typography>
          <Box sx={{ borderBottom: 1, borderColor: 'grey.500', mb: 2 }} />
          <SentimentScoreBar />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;
