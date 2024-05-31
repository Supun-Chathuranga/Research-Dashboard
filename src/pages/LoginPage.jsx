import React, { useState } from "react";
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, FormGroup, Stack, TextField, Typography, colors, CircularProgressClasses } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import AnalyzeDateChart from "../components/AnalyzeDateChart";
import Summary from "../components/Summary";
import SentimentScoreBar from "../components/SentimentScoreBar";
import SentimentScorePie from "../components/SentimentScorePie";

const DashboardPage = () => {
  return (
    <Box sx={{ height: '100vh', padding: 4, backgroundColor: '#f0f0f0' }}>
      <header className="App-header" style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <Logo />
      </header>
      <Box sx={{ 
          display: 'grid', 
          gridTemplateAreas: `"chart summary" "bar pie"`, 
          gridTemplateColumns: '2fr 2fr', 
          gridGap: '20px', 
          padding: '20px',
          backgroundColor: '#fff',
          borderRadius: '8px'
        }}>
        <Box sx={{ gridArea: 'chart', border: '1px solid #ccc', borderRadius: '8px', padding: 2, backgroundColor: '#fff' }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>Analyze date</Typography>
          <AnalyzeDateChart />
        </Box>
        <Box sx={{ gridArea: 'summary', border: '1px solid #ccc', borderRadius: '8px', padding: 2, backgroundColor: '#fff' }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>Summary</Typography>
          <Summary />
        </Box>
        <Box sx={{ gridArea: 'bar', border: '1px solid #ccc', borderRadius: '8px', padding: 2, backgroundColor: '#fff' }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>Sentiment score</Typography>
          <SentimentScoreBar />
        </Box>
        <Box sx={{ gridArea: 'pie', border: '1px solid #ccc', borderRadius: '8px', padding: 2, backgroundColor: '#fff' }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>Sentiment score</Typography>
          <SentimentScorePie />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;
