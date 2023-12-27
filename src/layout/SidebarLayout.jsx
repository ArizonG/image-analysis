import React, { useState } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Typography,
} from '@mui/material';
import { Menu, ChevronLeft, Home, Briefcase, CheckSquare, LogOut } from 'react-feather';

const SidebarLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    // Clear user details from local storage on logout
    localStorage.removeItem('@userDetails');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex' }}>
      <AppBar position="fixed" style={{ zIndex: 1201 }} color='inherit'>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleDrawerOpen} sx={{ marginRight: 2 }}>
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
        Arizon-Verifier
          </Typography>
          <Avatar sx={{ marginLeft: 'auto' }} />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </Toolbar>
        <List>
          <ListItem button component={Link} to="/" selected={location.pathname === '/'}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/projects" selected={location.pathname === '/projects'}>
            <ListItemIcon>
              <Briefcase />
            </ListItemIcon>
            <ListItemText primary="Projects" />
          </ListItem>
          <ListItem button component={Link} to="/verifier" selected={location.pathname === '/verifier'}>
            <ListItemIcon>
              <CheckSquare />
            </ListItemIcon>
            <ListItemText primary="Verifier" />
          </ListItem>
        </List>
        <List style={{ marginTop: 'auto' }}>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <LogOut />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      <div style={{ flexGrow: 1, padding: '16px' }}>
        <div style={{ minHeight: '100vh' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;
