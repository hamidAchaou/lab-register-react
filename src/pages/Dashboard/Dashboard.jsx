import React from "react";
import { Button, Typography, Box, Paper, Container } from "@mui/material";
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
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 600 }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{ mb: 2, fontWeight: "bold" }}
          >
            Welcome to the Dashboard
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Hello, {user.username}!
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            This is a protected page. You can only see this if you're logged in.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            sx={{ px: 4, py: 2, fontSize: "16px" }}
          >
            Logout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Dashboard;
