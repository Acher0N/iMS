/**
 * Sign In Component
 * User authentication signin page
 */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Divider,
  CircularProgress,
  Container,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  LoginOutlined,
  PersonAdd,
  LockReset,
} from "@mui/icons-material";

// Redux actions
import {
  signIn,
  clearError,
  checkLockoutStatus,
} from "../../Redux/Features/Auth/auth.reducer";
import { APP_ROUTES } from "../../constants/routes";

// Validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignIn = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Redux state
  const { isLoading, error, isAuthenticated, isLocked, lockoutEndTime } =
    useSelector((state) => state.auth);

  // Local state
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Form handling
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(
          signIn({
            email: values.email,
            password: values.password,
            rememberMe,
          })
        ).unwrap();

        // Redirect to intended page or dashboard
        const from = location.state?.from?.pathname || APP_ROUTES.DASHBOARD;
        navigate(from, { replace: true });
      } catch (error) {
        // Error is handled by Redux
        console.error("Sign in failed:", error);
      }
    },
  });

  // Check lockout status on mount and periodically
  useEffect(() => {
    dispatch(checkLockoutStatus());

    const interval = setInterval(() => {
      dispatch(checkLockoutStatus());
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [dispatch]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || APP_ROUTES.DASHBOARD;
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Handle password visibility toggle
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Calculate remaining lockout time
  const getRemainingLockoutTime = () => {
    if (!isLocked || !lockoutEndTime) return null;

    const remaining = new Date(lockoutEndTime) - new Date();
    return remaining > 0 ? Math.ceil(remaining / 60000) : 0; // minutes
  };

  const remainingLockoutTime = getRemainingLockoutTime();
  const isCurrentlyLocked = isLocked && remainingLockoutTime > 0;

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: 4,
        }}
      >
        {/* App Logo/Title */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            textAlign: "center",
            backgroundColor: "transparent",
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: "bold",
              color: theme.palette.primary.main,
              mb: 1,
            }}
          >
            iMS
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
            Invoice Management System
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to continue to your account
          </Typography>
        </Paper>

        {/* Sign In Form */}
        <Card
          sx={{
            width: "100%",
            maxWidth: 400,
            boxShadow: theme.shadows[4],
            borderRadius: 2,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box component="form" onSubmit={formik.handleSubmit} noValidate>
              <Typography
                variant="h5"
                component="h2"
                sx={{ mb: 3, textAlign: "center", fontWeight: 500 }}
              >
                Sign In
              </Typography>

              {/* Error Alert */}
              {error && (
                <Alert
                  severity="error"
                  sx={{ mb: 3 }}
                  onClose={() => dispatch(clearError())}
                >
                  {error}
                </Alert>
              )}

              {/* Lockout Alert */}
              {isCurrentlyLocked && (
                <Alert severity="warning" sx={{ mb: 3 }}>
                  Account temporarily locked. Try again in{" "}
                  {remainingLockoutTime} minute(s).
                </Alert>
              )}

              {/* Email Field */}
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                disabled={isLoading || isCurrentlyLocked}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color={formik.errors.email ? "error" : "action"} />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />

              {/* Password Field */}
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                disabled={isLoading || isCurrentlyLocked}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock
                        color={formik.errors.password ? "error" : "action"}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                        disabled={isLoading || isCurrentlyLocked}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              {/* Remember Me & Forgot Password */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      disabled={isLoading || isCurrentlyLocked}
                      size="small"
                    />
                  }
                  label={
                    <Typography variant="body2" color="text.secondary">
                      Remember me
                    </Typography>
                  }
                />

                <Button
                  component={Link}
                  to={APP_ROUTES.RECOVER_ACCOUNT}
                  variant="text"
                  size="small"
                  disabled={isLoading || isCurrentlyLocked}
                  sx={{ textTransform: "none" }}
                >
                  Forgot password?
                </Button>
              </Box>

              {/* Sign In Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading || isCurrentlyLocked || !formik.isValid}
                startIcon={
                  isLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <LoginOutlined />
                  )
                }
                sx={{
                  py: 1.5,
                  mb: 3,
                  textTransform: "none",
                  fontSize: "1rem",
                  fontWeight: 500,
                }}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>

              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  or
                </Typography>
              </Divider>

              {/* Sign Up Link */}
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Don't have an account?
                </Typography>
                <Button
                  component={Link}
                  to={APP_ROUTES.SIGNUP}
                  variant="outlined"
                  fullWidth
                  startIcon={<PersonAdd />}
                  disabled={isLoading || isCurrentlyLocked}
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                  }}
                >
                  Create Account
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Footer */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="caption" color="text.secondary">
            © 2024 iMS - Invoice Management System
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
