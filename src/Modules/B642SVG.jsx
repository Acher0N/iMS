import React, { useState } from "react";
import QRCode from "qrcode";
import { Container, TextField, Button, Typography, Box, Link, Grid, Paper } from "@mui/material";

const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const generateQRCode = async () => {
    try {
      const url = await QRCode.toDataURL(text);
      setQrCodeUrl(url);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Paper elevation={3} style={{ padding: "2rem" }}>
        <Typography variant="h4" gutterBottom align="center">
          Text to QR Code Generator
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField variant="outlined" fullWidth margin="normal" label="Enter text" value={text} onChange={(e) => setText(e.target.value)} />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Button variant="contained" color="primary" onClick={generateQRCode} style={{ marginTop: "1rem" }}>
              Generate QR Code
            </Button>
          </Grid>
          {qrCodeUrl && (
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Box mt={4}>
                <img src={qrCodeUrl} alt="Generated QR Code" style={{ maxWidth: "100%" }} />
                <Box mt={2}>
                  <Link href={qrCodeUrl} download="qrcode.png" underline="none">
                    <Button variant="contained" color="secondary">
                      Download QR Code
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Container>
  );
};

export default QRCodeGenerator;
