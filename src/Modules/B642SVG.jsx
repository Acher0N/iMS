import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const Base64ToImage = () => {
  const [base64, setBase64] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  const handleConvert = () => {
    setImageSrc(base64);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Base64 to SVG Converter
      </Typography>
      <TextField
        label="Base64 String"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={base64}
        onChange={(e) => setBase64(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleConvert} fullWidth>
        Convert
      </Button>
      {imageSrc && (
        <Box mt={4} textAlign="center">
          <Typography variant="h6" gutterBottom>
            Converted Image:
          </Typography>
          <img src={`${imageSrc}`} alt="Converted" style={{ maxWidth: "100%" }} />
        </Box>
      )}
    </Container>
  );
};

export default Base64ToImage;
