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

  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';




function Verifier() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);

  const [verificationGrade, setVerificationGrade] = useState(null);
  const [image, setImage] = useState(null);

  const handleSimulateAnalysis = () => {
    //setResult(handleAnalyze());
    handleAnalyze();
  };

  function filterJSONObject(jsonObject) {
    const keysToRemove = ["Contrast", "Overall Quality", "Axial Nonuniformity", "Modulation", "Grid Nonuniformity", "Unused Error Correction", "Fixed Pattern Damage", "NA", "Aperture"];
    const filteredObject = {};
  
    for (let key in jsonObject) {
      if (keysToRemove.includes(key)) {
        filteredObject[key] = jsonObject[key];
      }
    }
  
    return filteredObject;
  }

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
        const d = JSON.parse(response?.data?.jsonData)
       
        setResult(filterJSONObject(d));
        setVerificationGrade(getOverallGrade(d));
      } catch (error) {
        const d = {
          result: "0"
        }
        setResult(d)
        setVerificationGrade(getOverallGrade(d));

        // console.error('Error analyzing image:', error);
      }
    }
  };

  function getOverallGrade(results) {
    var avg = 0;
    Object.entries(results).map(([key, value]) => {
      avg += ((key === "Contrast Uniformity" || key === "Aperture") ? (value * 100) : (value * 25))
    })
    avg = avg/Object.keys(results).length;

    return avg;
  }

  function getGrade(key, score) {
    score = (key === "Contrast Uniformity" || key === "Aperture") ? score : (key === "All") ? score = score/100 : score = score/4;
    if (score >= 1) return "A";
      else if (score >= 0.75) return "B";
      else if (score >= 0.5) return "C";
      else if (score >= 0.25) return "D";
      else return "F"
  }

  function getColor(key, score) {
    score = (key === "Contrast Uniformity" || key === "Aperture") ? score : (key === "All") ? score = score/100 : score = score/4;
    if (score >= 1) return "green"
    else if (score >= 0.75) return "blue";
    else if (score >= 0.5) return "orange";
    else if (score >= 0.25) return "red";
    else return "black"
  }


  const renderAnalysisResults = () => (
    <div style={{ marginTop: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Analysis Results
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Parameter</TableCell>
              <TableCell>Score</TableCell>
              <TableCell>%</TableCell>
              <TableCell>Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(result).map(([key, value]) => (
              <TableRow key={key} style={{background : key === "Overall Quality" ? "#afa" : null}}>
                <TableCell>{key}</TableCell>
                <TableCell>{(key === "Contrast Uniformity" || key === "Aperture") ? value.toFixed(2) : value}</TableCell>
                <TableCell >{(key === "Contrast Uniformity" || key === "Aperture") ? (value * 100).toFixed(2) : value * 25}</TableCell>

                <TableCell style={{ color: getColor(key, value) }}>
                  {getGrade(key, value)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* {(
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h5" gutterBottom>
            Verification Grade
          </Typography>
          <Typography variant="h4" style={{ color: getColor("All", verificationGrade) }}>
            {getGrade("All", verificationGrade)} : {(verificationGrade).toFixed(2)}
          </Typography>
        </div>
      )} */}
    </div>
  );


  return (
    <Container component="main" maxWidth="lg" mt={14}>
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
            {/* <Typography variant="h6">Analysis Results</Typography> */}
            {/* <pre>{JSON.stringify(result, null, 2)}</pre> */}
            {/* {renderAnalysisResults()} */}

          </div>
        )}
        {image && (
          <div style={{ marginTop: "20px" }}>
            <Typography variant="h5" gutterBottom>
              Image Preview
            </Typography>
            <img src={URL.createObjectURL(image)} alt="Uploaded" style={{ maxWidth: "100%" }} />
          </div>
        )}
        {file && result && Object.keys(result).length > 0 && renderAnalysisResults()}
      </Paper>
    </Container>
  );
}

export default Verifier;

// import React, { useState } from "react";
// import {
//   Button,
//   Container,
//   Paper,
//   Typography,
//   Table,
//   TableContainer,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@mui/material";


// function Verifier() {
//   const [results, setResults] = useState({});
//   const [verificationGrade, setVerificationGrade] = useState(null);
//   const [image, setImage] = useState(null);

//   const handleSimulateAnalysis = () => {
//     setResults(simulateAnalysis());
//     setVerificationGrade(getOverallGrade(results));
//   };

//   const handleFileChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const renderAnalysisResults = () => (
//     <div style={{ marginTop: "20px" }}>
//       <Typography variant="h5" gutterBottom>
//         Analysis Results
//       </Typography>
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Parameter</TableCell>
//               <TableCell>Score</TableCell>
//               <TableCell>Grade</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {Object.entries(results).map(([key, value]) => (
//               <TableRow key={key}>
//                 <TableCell>{key}</TableCell>
//                 <TableCell>{value}</TableCell>
//                 <TableCell style={{ color: getColor(value) }}>
//                   {getGrade(value)}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       {verificationGrade && (
//         <div style={{ marginTop: "20px" }}>
//           <Typography variant="h5" gutterBottom>
//             Verification Grade
//           </Typography>
//           <Typography variant="h4" style={{ color: getColor(verificationGrade) }}>
//             {getGrade(verificationGrade)}
//           </Typography>
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <Container component="main" maxWidth="md" style={{ textAlign: "center", marginTop: "50px" }}>
//       <Paper elevation={3} style={{ padding: "20px" }}>
//         <Typography variant="h4" gutterBottom>
//           2D Code Analyzer Report
//         </Typography>
//         <Typography variant="body1" paragraph>
//           Welcome to the 2D Code Analyzer! This report provides a detailed analysis of the 2D Data Matrix.
//         </Typography>
//         <input
//           type="file"
//           accept="image/*"
//           style={{ display: "none" }}
//           id="image-upload"
//           onChange={handleFileChange}
//         />
//         <label htmlFor="image-upload">
//           <Button variant="outlined" component="span" style={{ marginTop: "20px" }}>
//             Upload Image
//           </Button>
//         </label>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleSimulateAnalysis}
//           style={{ marginLeft: "10px", marginTop: "20px" }}
//         >
//           Analyze Image
//         </Button>
//         {image && (
//           <div style={{ marginTop: "20px" }}>
//             <Typography variant="h5" gutterBottom>
//               Image Preview
//             </Typography>
//             <img src={URL.createObjectURL(image)} alt="Uploaded" style={{ maxWidth: "100%" }} />
//           </div>
//         )}
//         {Object.keys(results).length > 0 && renderAnalysisResults()}
//       </Paper>
//     </Container>
//   );
// }

// function simulateAnalysis() {
//   return {
//     "Overall Quality": 4,
//     Contrast: 4,
//     Modulation: 4,
//     "Fixed Pattern Damage": 4,
//     Decode: 4,
//     "Axial Non-Uniformity": 4,
//     "Grid Non-Uniformity": 4,
//   };
// }

// function getOverallGrade(results) {
//   const averageScore = Object.values(results).reduce((sum, score) => sum + score, 0) / Object.keys(results).length;
//   return averageScore;
// }

// function getGrade(score) {
//   if (score >= 4) return "A";
//   if (score === 3) return "B";
//   if (score === 2) return "C";
//   if (score === 1) return "D";
//   return "F";
// }

// function getColor(score) {
//   if (score >= 4) return "green";
//   if (score === 3) return "blue";
//   if (score === 2) return "orange";
//   if (score === 1) return "red";
//   return "black";
// }

// export default Verifier;