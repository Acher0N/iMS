/**
 * Sign Up Component
 * User registration page
 */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
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
  LinearProgress,
  Tooltip,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  PersonAdd,
  LoginOutlined,
  CheckCircle,
  Error,
} from "@mui/icons-material";

// Redux actions
import { signUp, clearError } from "../../Redux/Features/Auth/auth.reducer";
import { APP_ROUTES } from "../../constants/routes";
import { VALIDATION } from "../../constants/app";

// Password strength calculation
const calculatePasswordStrength = (password) => {
  let score = 0;
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&]/.test(password),
  };

  Object.values(checks).forEach((check) => {
    if (check) score += 20;
  });

  return { score, checks };
};

// Validation schema
const validationSchema = Yup.object({
  displayName: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(
      VALIDATION.PASSWORD_MIN_LENGTH,
      `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`
    )
    .matches(
      VALIDATION.PASSWORD_PATTERN,
      "Password must contain uppercase, lowercase, number and special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  acceptTerms: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
});

const SignUp = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const { isLoading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  // Local state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    checks: {},
  });

  // Form handling
  const formik = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(
          signUp({
            email: values.email,
            password: values.password,
            displayName: values.displayName,
          })
        ).unwrap();

        // Redirect to verification page
        navigate(APP_ROUTES.VERIFY_ACCOUNT, {
          replace: true,
          state: { email: values.email },
        });
      } catch (error) {
        // Error is handled by Redux
        console.error("Sign up failed:", error);
      }
    },
  });

  // Update password strength on password change
  useEffect(() => {
    if (formik.values.password) {
      setPasswordStrength(calculatePasswordStrength(formik.values.password));
    } else {
      setPasswordStrength({ score: 0, checks: {} });
    }
  }, [formik.values.password]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(APP_ROUTES.DASHBOARD, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Handle password visibility toggles
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Get password strength color and label
  const getPasswordStrengthColor = (score) => {
    if (score < 40) return "error";
    if (score < 60) return "warning";
    if (score < 80) return "info";
    return "success";
  };

  const getPasswordStrengthLabel = (score) => {
    if (score < 40) return "Weak";
    if (score < 60) return "Fair";
    if (score < 80) return "Good";
    return "Strong";
  };

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
            Create your account to get started
          </Typography>
        </Paper>

        {/* Sign Up Form */}
        <Card
          sx={{
            width: "100%",
            maxWidth: 450,
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
                Create Account
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

              {/* Full Name Field */}
              <TextField
                fullWidth
                id="displayName"
                name="displayName"
                label="Full Name"
                value={formik.values.displayName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.displayName &&
                  Boolean(formik.errors.displayName)
                }
                helperText={
                  formik.touched.displayName && formik.errors.displayName
                }
                disabled={isLoading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person
                        color={formik.errors.displayName ? "error" : "action"}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />

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
                disabled={isLoading}
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
                disabled={isLoading}
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
                        disabled={isLoading}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              {/* Password Strength Indicator */}
              {formik.values.password && (
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mr: 1 }}
                    >
                      Password strength:
                    </Typography>
                    <Typography
                      variant="caption"
                      color={`${getPasswordStrengthColor(
                        passwordStrength.score
                      )}.main`}
                      sx={{ fontWeight: 500 }}
                    >
                      {getPasswordStrengthLabel(passwordStrength.score)}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={passwordStrength.score}
                    color={getPasswordStrengthColor(passwordStrength.score)}
                    sx={{ height: 4, borderRadius: 2, mb: 1 }}
                  />
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {Object.entries({
                      "At least 8 characters": passwordStrength.checks.length,
                      "Lowercase letter": passwordStrength.checks.lowercase,
                      "Uppercase letter": passwordStrength.checks.uppercase,
                      Number: passwordStrength.checks.number,
                      "Special character": passwordStrength.checks.special,
                    }).map(([label, passed]) => (
                      <Tooltip key={label} title={label}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          {passed ? (
                            <CheckCircle
                              sx={{ fontSize: 16, color: "success.main" }}
                            />
                          ) : (
                            <Error sx={{ fontSize: 16, color: "error.main" }} />
                          )}
                        </Box>
                      </Tooltip>
                    ))}
                  </Box>
                </Box>
              )}

              {/* Confirm Password Field */}
              <TextField
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                disabled={isLoading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock
                        color={
                          formik.errors.confirmPassword ? "error" : "action"
                        }
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleToggleConfirmPasswordVisibility}
                        edge="end"
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />

              {/* Terms and Conditions */}
              <FormControlLabel
                control={
                  <Checkbox
                    id="acceptTerms"
                    name="acceptTerms"
                    checked={formik.values.acceptTerms}
                    onChange={formik.handleChange}
                    disabled={isLoading}
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2" color="text.secondary">
                    I agree to the{" "}
                    <Button
                      variant="text"
                      size="small"
                      sx={{
                        p: 0,
                        minWidth: "auto",
                        textTransform: "none",
                        textDecoration: "underline",
                      }}
                    >
                      Terms and Conditions
                    </Button>{" "}
                    and{" "}
                    <Button
                      variant="text"
                      size="small"
                      sx={{
                        p: 0,
                        minWidth: "auto",
                        textTransform: "none",
                        textDecoration: "underline",
                      }}
                    >
                      Privacy Policy
                    </Button>
                  </Typography>
                }
                sx={{ mb: 3, alignItems: "flex-start" }}
              />

              {/* Error for terms acceptance */}
              {formik.touched.acceptTerms && formik.errors.acceptTerms && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ display: "block", mb: 2 }}
                >
                  {formik.errors.acceptTerms}
                </Typography>
              )}

              {/* Sign Up Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={
                  isLoading || !formik.isValid || !formik.values.acceptTerms
                }
                startIcon={
                  isLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <PersonAdd />
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
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>

              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  or
                </Typography>
              </Divider>

              {/* Sign In Link */}
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Already have an account?
                </Typography>
                <Button
                  component={Link}
                  to={APP_ROUTES.SIGNIN}
                  variant="outlined"
                  fullWidth
                  startIcon={<LoginOutlined />}
                  disabled={isLoading}
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                  }}
                >
                  Sign In
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

export default SignUp;
