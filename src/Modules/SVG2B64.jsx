import React, { useState } from "react";
import { Button, TextField, Typography, Container, Box } from "@mui/material";

const SvgToBase64 = () => {
  const [base64, setBase64] = useState("");

  const convertSvgToBase64 = (svg) => {
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const reader = new FileReader();

    reader.onloadend = () => {
      setBase64(reader.result);
    };

    reader.readAsDataURL(svgBlob);
  };

  const handleSvgUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(e.target.result, "image/svg+xml");
      const svgElement = doc.querySelector("svg");

      if (svgElement) {
        convertSvgToBase64(svgElement);
      }
    };

    reader.readAsText(file);
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          SVG to Base64 Converter
        </Typography>
        <Button variant="contained" component="label">
          Upload SVG
          <input type="file" accept=".svg" hidden onChange={handleSvgUpload} />
        </Button>
        {base64 && (
          <Box mt={4}>
            <Typography variant="h6">Base64 String:</Typography>
            <TextField
              multiline
              rows={10}
              fullWidth
              variant="outlined"
              value={base64}
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default SvgToBase64;
