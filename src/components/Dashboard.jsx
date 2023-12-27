import React from 'react';
import { Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const Dashboard = () => {
  return (
    <Grid container spacing={3} mt={14}>
      {/* Metrics Cards Section */}
      <Grid item xs={12} sm={6} md={4}>
        <Paper sx={{ p: 2, textAlign: 'center'}}>
          <Typography variant="h6">Total Verifications</Typography>
          <Typography variant="h4">123</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h6">Total Failed Verifications</Typography>
          <Typography variant="h4">15</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h6">Total Reports Generated</Typography>
          <Typography variant="h4">50</Typography>
        </Paper>
      </Grid>

      {/* User Table and Recent Activities Section */}
      <Grid item xs={12}>
        <Grid container spacing={3}>
          {/* User Table */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">User Table</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* Example Row */}
                    <TableRow>
                      <TableCell>John Doe</TableCell>
                      <TableCell>john@example.com</TableCell>
                      <TableCell>Admin</TableCell>
                    </TableRow>
                    {/* Add more rows as needed */}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Recent Activities */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Recent Activities</Typography>
              <ul>
                {/* Example Activity */}
                <li>User John Doe completed a verification.</li>
                {/* Add more activities as needed */}
              </ul>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
