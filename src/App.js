import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import Login from './components/Login';
import Verifier from './components/Verifier';
import SidebarLayout from './layout/SidebarLayout';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <SidebarLayout>
              <Outlet />
            </SidebarLayout>
          }
        >
          <Route index element={<Dashboard />} />
          {/* <Route path="projects" element={<ProjectsComponent />} /> */}
          <Route path="verifier" element={<Verifier />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
