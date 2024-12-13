import { Box, CssBaseline, Button } from "@mui/material";
import { Titlebar, Logo, Confirm, Header } from "./components";
import { useState } from "react";
import { toast } from "react-toastify";

const App = () => {
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  const handleDelete = () => {
    setConfirmOpen(false);
    toast("Item deleted successfully!");
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
          <h1 style={{ textAlign: "center", fontSize: "10.25rem", margin: "0" }}>Preview</h1>
        </Confirm>
        <Button variant="contained" color="success" onClick={() => toast.info("Item added successfully!")}>
          Toast
        </Button>
      </Box>
    </Box>
  );
};

export default App;
