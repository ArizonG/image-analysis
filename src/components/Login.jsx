import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Simulate authentication
    if (email === 'admin@arizonsystems.com' && password === 'admin@123') {
      // Simulate user details
      const userDetails = {
        name: 'Admin Arizon',
        email: 'admin@arizonsystems.com',
      };

      // Store user details in local storage
      localStorage.setItem('@userDetails', JSON.stringify(userDetails));

      // Redirect to '/'
      window.location.href = '/';
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Container sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: 400 }}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Welcome, User!
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          size="small"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: 2 }}
          helperText="Your email should be in the format: example@example.com"
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          size="small"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: 2 }}
          helperText="Password should be at least 8 characters long"
        />
        <Typography variant="body2" color="error" sx={{ marginY: 1 }}>
          {error}
        </Typography>
        <Button fullWidth variant="contained" color="primary" onClick={handleLogin} sx={{ marginTop: 2 }}>
          Login
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
