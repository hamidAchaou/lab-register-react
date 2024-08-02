import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box sx={{ m: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Welcome to the Dashboard, {user.username}!
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        This is a protected page. You can only see this if you're logged in.
      </Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default Dashboard;
