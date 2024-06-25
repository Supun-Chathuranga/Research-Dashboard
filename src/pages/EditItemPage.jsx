import React, { useState, useEffect, useRef } from "react";
import { Box, Grid, Paper, Typography, Container } from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import Logo from "../components/Logo";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Step = ({ active }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 30,
      height: 30,
      borderRadius: '50%',
      backgroundColor: active ? '#1976d2' : '#e0e0e0',
      color: '#fff',
    }}
  >
    {active ? '✓' : ''}
  </Box>
);

const StepConnector = () => (
  <Box sx={{ flex: 1, height: 4, backgroundColor: '#1976d2' }} />
);

const ProgressBarContainer = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 10, marginLeft: 30, marginRight: 30, marginTop: 5 }}>
    <Step active={true} />
    <StepConnector />
    <Step active={true} />
    <StepConnector />
    <Step active={true} />
    <StepConnector />
    <Step active={true} />
    <StepConnector />
    <Step active={true} />
  </Box>
);

const CircularProgressWithLabel = ({ value, label }) => (
  <Box sx={{ width: 150, height: 250, margin: 'auto', textAlign: 'center', marginTop: 3 }}>
    <CircularProgressbar
      value={value}
      text={`${value}%`}
      styles={buildStyles({
        textColor: '#3f51b5',
        pathColor: '#1976d2',
        trailColor: '#d6d6d6',
      })}
    />
    <Typography variant="body2" align="center" sx={{ marginTop: 3 }}>
      {label}
    </Typography>
    <Typography variant="body2" align="center" sx={{ color: '#a0a0a0' }}>
      Secondary label
    </Typography>
  </Box>
);

const EditItemPage = () => {
  const [sentimentData, setSentimentData] = useState(null);
  const hasFetchedData = useRef(false);

  useEffect(() => {
    if (hasFetchedData.current) {
      return;
    }
    hasFetchedData.current = true;

    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.202.81:5000/get_single_doc_data");
        if (response.data.status === false) {
          console.error("An error occurred:", response.data);
          toast.error(
            response.data.message || "An error occurred while updating the item.",
            { autoClose: 2000 }
          );
        } else {
          console.log("Results Loaded Successfully!", response.data);
          toast.success("Results Loaded Successfully!", { autoClose: 2000 });
          setSentimentData(response.data.single_doc_data.data);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        toast.error("An error occurred while making the request.", { autoClose: 2000 });
      }
    };

    fetchData();
  }, []);

  const sentimentScores = sentimentData ? {
    "Exchange Rates": Math.round((sentimentData["Exchange Rates"]?.avg_sentiment || 0) * 100),
    "Fiscal Policy": Math.round((sentimentData["Fiscal Policy"]?.avg_sentiment || 0) * 100),
    "GDP Growth": Math.round((sentimentData["GDP Growth"]?.avg_sentiment || 0) * 100),
    "Inflation": Math.round((sentimentData["Inflation"]?.avg_sentiment || 0) * 100),
    "International Trade": Math.round((sentimentData["International Trade"]?.avg_sentiment || 0) * 100),
    "Monetary Policy": Math.round((sentimentData["Monetary Policy"]?.avg_sentiment || 0) * 100),
    "Unemployment": Math.round((sentimentData["Unemployment"]?.avg_sentiment || 0) * 100),
  } : {};

  return (
    <Box sx={{ height: '250vh', padding: 4, backgroundColor: '#f0f0f0' }}>
      <header className="App-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', marginBottom: '20px', padding: '10px' }}>
        <Logo />
      </header>
      
      <Paper elevation={3} sx={{ padding: 5, backgroundColor: '#f5f5f5' }}>
      <Typography variant="h4" mb={3} align="center">
        Report Analyse
      </Typography>
      <Typography variant="h6" mb={2} align="center">
        Description
      </Typography>
      <ProgressBarContainer />
        <Grid container spacing={10}>
          {sentimentData ? (
            <>
              <Grid item xs={3}>
                <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#e0e0e0' }}>
                  <CircularProgressWithLabel value={sentimentScores["Exchange Rates"]} label="Exchange Rates" />
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#e0e0e0' }}>
                  <CircularProgressWithLabel value={sentimentScores["Fiscal Policy"]} label="Fiscal Policy" />
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#e0e0e0' }}>
                  <CircularProgressWithLabel value={sentimentScores["GDP Growth"]} label="GDP Growth" />
                </Paper>
              </Grid>
              <Grid item xs={3}>
                <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#e0e0e0' }}>
                  <CircularProgressWithLabel value={sentimentScores["Inflation"]} label="Inflation" />
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#e0e0e0' }}>
                  <CircularProgressWithLabel value={sentimentScores["International Trade"]} label="International Trade" />
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#e0e0e0' }}>
                  <CircularProgressWithLabel value={sentimentScores["Monetary Policy"]} label="Monetary Policy" />
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#e0e0e0' }}>
                  <CircularProgressWithLabel value={sentimentScores["Unemployment"]} label="Unemployment" />
                </Paper>
              </Grid>
            </>
          ) : (
            <Typography variant="h6" align="center" sx={{ width: '100%' }}>
              Loading sentiment data...
            </Typography>
          )}
        </Grid>
        <ToastContainer position="top-right" />
      </Paper>
      </Box>
  );
};

export default EditItemPage;
