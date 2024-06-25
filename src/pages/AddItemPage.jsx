import React, { useState } from "react";
import { Button, Typography, Paper, Box, Snackbar, Alert } from "@mui/material";
import { styled } from "@mui/system";
import Logo from "../components/Logo";
import { toast, ToastContainer } from 'react-toastify';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

const Step = styled('div')(({ active }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 30,
  height: 30,
  borderRadius: '50%',
  backgroundColor: active ? '#1976d2' : '#e0e0e0',
  color: '#fff',
}));

const StepConnector = styled('div')(({ active }) => ({
  flex: 1,
  height: 4,
  backgroundColor: active ? '#1976d2' : '#e0e0e0',
}));

const ProgressBarContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 50,
  marginLeft: 300, // Add left margin
  marginRight: 300, // Add right margin
});

const FileUploadContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: '3px dashed #000000',
  backgroundColor: '#e0e0e0',
  padding: 20,
  marginLeft: 275,
  marginRight: 300,
  borderRadius: 10,
  width: 700,
  height: 200,
});

const AddItemPage = () => {
  const [activeStep, setActiveStep] = useState(2);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setIsFileSelected(true);
      setActiveStep(3);
    } else {
      setErrorMessage("Only PDF files are allowed.");
      setSelectedFile(null);
      setIsFileSelected(false);
      setActiveStep(2);
    }
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      // Implement file upload logic here
      console.log("File uploaded:", selectedFile.name);
      const formData = new FormData();
      formData.append('year', 2020);
      formData.append('file', selectedFile);

      axios
        .post("http://192.168.202.81:5000/store_data", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.data.status === false) {
            console.error("An error occurred:", response.data);
            toast.error(
              response.data.message || "An error occurred while updating the item.",
              { autoClose: 2000 }
            );
          } else {
            console.log("PDF Analyzed Successfully!", response.data);
            toast.success("PDF Analyzed Successfully!", { autoClose: 2000 });
            setTimeout(() => {
               window.location.href = "/result";
            }, 2000);
            // Reset file selection after successful upload
            setSelectedFile(null);
            setIsFileSelected(false);
            setActiveStep(2);
          }
        })
        .catch((error) => {
          console.error("An error occurred:", error);
          toast.error("An error occurred while making the request.", { autoClose: 2000 });
        });
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setIsFileSelected(false);
    setActiveStep(2);
  };

  const handleCloseSnackbar = () => {
    setErrorMessage("");
  };

  return (
    <Box sx={{ height: '100vh', padding: 4, backgroundColor: '#f0f0f0' }}>
      <header className="App-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', marginBottom: '20px', padding: '10px' }}>
        <Logo />
      </header>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" mb={3} align="center">
          Step Progress Bar
        </Typography>
        <Typography variant="h6" mb={3} align="center">
          description
        </Typography>
        <ProgressBarContainer>
          <Step active={true}>✓</Step>
          <StepConnector active={true}/>
          <Step active={true}>✓</Step>
          <StepConnector active={true} />
          <Step active={activeStep >= 3}>✓</Step>
          <StepConnector />
          <Step active={false} />
          <StepConnector />
          <Step active={false} />
        </ProgressBarContainer>
        
        <FileUploadContainer align="center">
          {!isFileSelected ? (
            <>
              <Typography variant="body1" mb={2}>
                Select a file or drag and drop here
              </Typography>
              <Button variant="contained" component="label">
                Select File
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
            </>
          ) : (
            <>
              <Typography variant="body1" mb={2}>
                File added
              </Typography>
              <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="body2" mr={2}>
                  {selectedFile.name}
                </Typography>
                <Typography variant="body2">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </Typography>
              </Box>
              <Button variant="contained" color="secondary" onClick={handleRemoveFile}>
                Remove File
              </Button>
            </>
          )}
        </FileUploadContainer>
        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button variant="outlined" color="secondary" style={{ marginRight: 8 }} onClick={handleRemoveFile} disabled={!isFileSelected}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleFileUpload} disabled={!isFileSelected}>
            Upload
          </Button>
        </Box>
      </Paper>
      <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      <ToastContainer position="top-right" />
    </Box>
  );
};

export default AddItemPage;
