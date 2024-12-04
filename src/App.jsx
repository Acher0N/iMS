import { Box, CssBaseline, Button } from "@mui/material";
import { Titlebar, Logo, Confirm, Header } from "./components";
import { useState } from "react";

const App = () => {
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  const handleDelete = () => {
    setConfirmOpen(false);
  };

  return (
    <Box>
      <CssBaseline />
      <Header />
      <Titlebar title={"Inventory Management System"} />
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Button variant="contained" color="error" onClick={() => setConfirmOpen(true)}>
          Delete Item
        </Button>

        <Confirm
          isOpen={isConfirmOpen}
          title="Are you sure you want to delete this item?"
          onConfirm={handleDelete}
          onCancel={() => setConfirmOpen(false)}
          fullscreen={false} // Use fullscreen only when needed
        >
          <h1 style={{ textAlign: "center", fontSize: "5rem" }}>Preview</h1>
        </Confirm>
      </Box>
    </Box>
  );
};

export default App;
