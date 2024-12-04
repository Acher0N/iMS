import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Confirm = ({
  isOpen,
  title,
  children,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  showCancel = true,
  fullscreen = false, // Prop to control fullscreen mode
}) => {
  const theme = useTheme();
  const colors = theme.palette;
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      fullScreen={fullscreen || isMobile} // Enable fullscreen for mobile or when fullscreen is true
      maxWidth="sm" // Default maxWidth
      fullWidth={!fullscreen} // Ensure width is restricted when not fullscreen
      sx={{
        "& .MuiDialog-paper": {
          margin: fullscreen ? "16px" : "auto", // Add margin on all sides for fullscreen
          padding: fullscreen ? "16px" : "0", // Add padding when fullscreen
          width: fullscreen ? "auto" : "100%", // Adjust width for fullscreen mode
          maxWidth: fullscreen ? "none" : "100%", // Remove maxWidth restriction in fullscreen
          height: fullscreen ? "auto" : "auto", // Allow for auto height in fullscreen mode
          backgroundImage: "none",
          borderRadius: "5px",
        },
      }}
      aria-labelledby="confirm-dialog-title"
    >
      <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
      <DialogContent
        sx={{
          maxHeight: fullscreen ? "80vh" : "auto", // Set maxHeight to allow scrolling when in fullscreen
          overflow: "auto", // Enable scrolling
          // backgroundColor: colors.background.default, // Ensures content background is transparent and inherits default theme background
        }}
      >
        {children}
      </DialogContent>
      <DialogActions sx={{ pb: "20px", display: "flex", justifyContent: "space-between", width: "350px", m: "0 auto" }}>
        {showCancel && (
          <Button onClick={onCancel} color="info" variant="outlined">
            {cancelText}
          </Button>
        )}
        <Button onClick={onConfirm} color="success" variant="contained">
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirm;
