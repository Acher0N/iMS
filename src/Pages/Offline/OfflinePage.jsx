/**
 * Offline Page Component
 * Displays when user tries to access uncached routes while offline
 */

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Button,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  WifiOff,
  Dashboard,
  Receipt,
  People,
  Inventory,
  Refresh,
  ArrowBack,
} from "@mui/icons-material";

const OfflinePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const intendedPath = location.state?.intendedPath;

  const handleRetry = () => {
    if (navigator.onLine && intendedPath) {
      navigate(intendedPath);
    } else {
      window.location.reload();
    }
  };

  const handleGoHome = () => {
    navigate("/dashboard");
  };

  // Available offline routes
  const offlineRoutes = [
    { path: "/dashboard", label: "Dashboard", icon: <Dashboard /> },
    { path: "/invoices", label: "Invoices", icon: <Receipt /> },
    { path: "/customers", label: "Customers", icon: <People /> },
    { path: "/products", label: "Products", icon: <Inventory /> },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 500,
          width: "100%",
          padding: 4,
          textAlign: "center",
        }}
      >
        {/* Offline Icon */}
        <WifiOff
          sx={{
            fontSize: 80,
            color: "#ff9800",
            marginBottom: 2,
          }}
        />

        {/* Title */}
        <Typography variant="h4" gutterBottom color="primary">
          You're Offline
        </Typography>

        {/* Description */}
        <Typography variant="body1" paragraph color="textSecondary">
          {intendedPath
            ? `The page "${intendedPath}" is not available offline. You can still access cached pages below.`
            : "You're currently offline, but iMS continues to work with your cached data."}
        </Typography>

        {/* Status Alert */}
        <Alert severity="info" sx={{ marginBottom: 3 }}>
          <strong>Offline Mode Active:</strong> Your data is being stored
          locally and will sync when you're back online.
        </Alert>

        {/* Available Offline Routes */}
        <Typography variant="h6" gutterBottom>
          Available Pages:
        </Typography>

        <List sx={{ marginBottom: 3 }}>
          {offlineRoutes.map((route) => (
            <ListItem
              key={route.path}
              button
              onClick={() => navigate(route.path)}
              sx={{
                borderRadius: 1,
                marginBottom: 1,
                backgroundColor: "#f9f9f9",
                "&:hover": {
                  backgroundColor: "#e3f2fd",
                },
              }}
            >
              <ListItemIcon sx={{ color: "primary.main" }}>
                {route.icon}
              </ListItemIcon>
              <ListItemText primary={route.label} />
            </ListItem>
          ))}
        </List>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          {intendedPath && (
            <Button
              variant="contained"
              startIcon={<Refresh />}
              onClick={handleRetry}
              disabled={!navigator.onLine}
            >
              {navigator.onLine ? "Retry" : "Still Offline"}
            </Button>
          )}

          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={handleGoHome}
          >
            Go to Dashboard
          </Button>
        </Box>

        {/* Connection Status */}
        <Typography
          variant="caption"
          display="block"
          sx={{ marginTop: 2, color: "textSecondary" }}
        >
          Connection Status: {navigator.onLine ? "🟢 Online" : "🔴 Offline"}
        </Typography>
      </Paper>
    </Box>
  );
};

export default OfflinePage;
