import { Container, Typography, Button, Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";

const JsonFileUploader = () => {
  const [jsonObject, setJsonObject] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const parsedObject = JSON.parse(e.target.result);
        setJsonObject(parsedObject);
        console.log("Uploaded JSON Object:", parsedObject);
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };

    if (file) {
      reader.readAsText(file);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Button variant="contained" component="label" startIcon={<CloudUploadIcon />}>
          Upload JSON File
          <input type="file" accept=".json" hidden onChange={handleFileUpload} />
        </Button>
        {jsonObject && (
          <Box mt={4} width="100%">
            <Typography variant="h6">Uploaded JSON Object:</Typography>
            <pre style={{ backgroundColor: "#f4f4f4", padding: "10px" }}>{JSON.stringify(jsonObject, null, 2)}</pre>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default JsonFileUploader;
