import React, { useState } from "react";
import { TextField, Button, Link, Grid, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom"; // Add useLocation here
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Layout from "../../components/Layout";
import AlertMessage from "../../components/AlertMessage";
import { useAuth } from "../../context/AuthContext";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Define useLocation here
  const { login } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [alert, setAlert] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ ...alert, open: false });
  };

  const onSubmit = async (data) => {
    const result = await login(data);
    if (result.success) {
      setAlert({
        open: true,
        severity: "success",
        message: "Login successful!",
      });
      setTimeout(() => {
        const from = location.state?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
      }, 2000);
    } else {
      setAlert({ open: true, severity: "error", message: result.message });
    }
  };

  return (
    <Layout title="Login">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        <Controller
          name="username"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              autoComplete="username"
              autoFocus
              error={!!errors.username}
              helperText={errors.username?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item>
            <Link href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
      <AlertMessage
        open={alert.open}
        handleClose={handleCloseAlert}
        severity={alert.severity}
        message={alert.message}
      />
    </Layout>
  );
};

export default Login;
