import React, { useState } from "react";
import { Box, Paper, Typography, Button, TextField } from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import Logo from "../components/Logo";
import 'react-toastify/dist/ReactToastify.css';

const ReportAnalyzePage = () => {
  const [paragraph, setParagraph] = useState("");
  const [apiData, setApiData] = useState([]);

  const handleParagraphChange = (event) => {
    setParagraph(event.target.value);
  };

  const handleUpload = async () => {
    try {
      const response = await axios.post("http://192.168.202.81:5000/process_data_paragraph", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ paragraph })
      });
      if (response.data.status === false) {
        toast.error(response.data.message || "An error occurred while uploading the paragraph.", { autoClose: 2000 });
      } else {
        setApiData(response.data.results);
        toast.success("Paragraph uploaded successfully!", { autoClose: 2000 });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred while making the request.", { autoClose: 2000 });
    }
  };

  return (
    <Box sx={{ minHeight: '100vh',padding: 4, backgroundColor: '#f0f0f0' }}>
      
      <header className="App-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', marginBottom: '20px',  padding: '10px' }}>
        <Logo />
      </header>
      <Typography variant="h4" mb={1} mt={3} align="center">
        Economic Text Analyze
      </Typography>
      <Typography variant="subtitle1" mb={2} align="center">
        Enter Economic Paragraph To Analyze
      </Typography>

      <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center', gap: 5, flexWrap: 'wrap' }}>
        <Paper elevation={3} sx={{ padding: 3, width: '45%', backgroundColor: '#fff', borderRadius: '20px' }}>
          <Typography variant="h6" mb={2}>
            Paragraph
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: 'grey.500', mb: 2 }} />
          <TextField
            multiline
            rows={21}
            fullWidth
            variant="outlined"
            value={paragraph}
            onChange={handleParagraphChange}
            placeholder="Type your paragraph here..."
          />
        </Paper>
        <Paper elevation={3} sx={{ padding: 3, width: '45%', backgroundColor: '#fff', borderRadius: '20px' }}>
          <Typography variant="h6" mb={2}>
            Classification & Sentiment
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: 'grey.500', mb: 2 }} />
          {apiData.map((item, index) => (
            <Box key={index} mb={2}>
              <Typography variant="body2" color="textSecondary">
                <strong>{index + 1}. {item.description}</strong>
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'left' }}>
                <span
                  style={{
                    backgroundColor: '#ffcc80',
                    color: '#000',
                    padding: '7px 15px',
                    borderRadius: '20px',
                    marginRight: '12px',
                    marginBottom: '10px',
                    marginTop: '3px',
                    fontSize: '0.875rem',
                  }}
                >
                  {item.factor}
                </span>
                <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>
                  Sentiment Score: {item.sentimentScore}
                </Typography>
              </Box>
              <Box sx={{ borderBottom: 1, borderColor: 'grey.500', mb: 2 }} />
            </Box>
          ))}
        </Paper>
      </Box>

      <Box sx={{ padding: 0, display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
        <Paper elevation={0} sx={{ padding: 0, width: '45%', backgroundColor: 'transparent', boxShadow: 'none' }}>
          <Box sx={{ display: 'flex', justifyContent: 'right', gap: 2, mt: 0, mb: 3 }}>
            <Button variant="contained" sx={{ backgroundColor: '#f5f5f5', color: 'black', border: '1px solid black' }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: 'black', color: 'white' }}
              onClick={handleUpload}
            >
              Submit
            </Button>
          </Box>
        </Paper>
        <Paper elevation={0} sx={{ padding: 3, width: '45%', backgroundColor: 'transparent', boxShadow: 'none' }}>
        </Paper>
      </Box>

      <ToastContainer position="top-right" />
    </Box>
  );
};

export default ReportAnalyzePage;
