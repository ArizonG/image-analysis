import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Button,
  Input,
  Paper,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

function App() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    // Check if the selected file is an image
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);

      // Display image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      // Reset file and preview if the selected file is not an image
      setFile(null);
      setPreviewUrl(null);
    }
  };

  const handleAnalyze = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://localhost:8080/api/file', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        setResult(response.data);
      } catch (error) {
        console.error('Error analyzing image:', error);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5">Image Analysis App</Typography>
        <Input type="file" accept="image/*" onChange={handleFileChange} style={{ margin: '16px 0' }} />
        {previewUrl && (
          <Card style={{ maxWidth: 300, margin: '16px 0' }}>
            <CardMedia component="img" alt="Preview" height="140" image={previewUrl} />
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                Image Preview
              </Typography>
            </CardContent>
          </Card>
        )}
        <Button variant="contained" color="primary" onClick={handleAnalyze} disabled={!file}>
          Analyze
        </Button>
        {result && (
          <div style={{ marginTop: 16 }}>
            <Typography variant="h6">Analysis Results</Typography>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </Paper>
    </Container>
  );
}

export default App;
