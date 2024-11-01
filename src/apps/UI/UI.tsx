import { Box, Button, Paper } from "@mui/material";
import LOGO from "../../assets/Logo";

const App: React.FC = () => {
  const commonStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    p: "0.8dvw",
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        p: "1.9rem",
      }}
    >
      <Paper sx={{ ...commonStyle }}>
        <Box sx={{ minWidth: "100px" }}>Text</Box>
        <Button variant="text" color="success">
          success
        </Button>
        <Button variant="text" color="info">
          info
        </Button>
        <Button variant="text" color="error">
          error
        </Button>
        <Button variant="text" color="warning">
          warn
        </Button>
      </Paper>
      <Paper sx={{ ...commonStyle }}>
        <Box sx={{ minWidth: "100px" }}>Text</Box>
        <Button variant="text" color="success" size="small">
          success
        </Button>
        <Button variant="text" color="info" size="small">
          info
        </Button>
        <Button variant="text" color="error" size="small">
          error
        </Button>
        <Button variant="text" color="warning" size="small">
          warn
        </Button>
      </Paper>

      <Paper sx={{ ...commonStyle }}>
        <Box sx={{ minWidth: "100px" }}>Outlined</Box>
        <Button variant="outlined" color="success">
          success
        </Button>
        <Button variant="outlined" color="info">
          info
        </Button>
        <Button variant="outlined" color="error">
          error
        </Button>
        <Button variant="outlined" color="warning">
          warn
        </Button>
      </Paper>
      <Paper sx={{ ...commonStyle }}>
        <Box sx={{ minWidth: "100px" }}>Outlined</Box>
        <Button variant="outlined" color="success" size="small">
          success
        </Button>
        <Button variant="outlined" color="info" size="small">
          info
        </Button>
        <Button variant="outlined" color="error" size="small">
          error
        </Button>
        <Button variant="outlined" color="warning" size="small">
          warn
        </Button>
      </Paper>

      <Paper sx={{ ...commonStyle }}>
        <Box sx={{ minWidth: "100px" }}>Contained</Box>
        <Button variant="contained" color="success">
          success
        </Button>
        <Button variant="contained" color="info">
          info
        </Button>
        <Button variant="contained" color="error">
          error
        </Button>
        <Button variant="contained" color="warning">
          warn
        </Button>
      </Paper>
      <Paper sx={{ ...commonStyle }}>
        <Box sx={{ minWidth: "100px" }}>Contained</Box>
        <Button variant="contained" color="success" size="small">
          success
        </Button>
        <Button variant="contained" color="info" size="small">
          info
        </Button>
        <Button variant="contained" color="error" size="small">
          error
        </Button>
        <Button variant="contained" color="warning" size="small">
          warn
        </Button>
      </Paper>
      <img src={LOGO} width={"60px"} />
    </Box>
  );
};

export default App;
