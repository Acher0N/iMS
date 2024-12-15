import { Box, Button } from "@mui/material";
import { Titlebar, Confirm, Header } from "./components";
import { useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material";
import { Login } from "./pages/Login";

const App = () => {
  const theme = useTheme();
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  const handleDelete = () => {
    setConfirmOpen(false);
    toast("Item deleted successfully!");
  };

  return (
    <Box dir={theme.direction}>
      <Header />
      <Login />
    </Box>
  );
};

export default App;

/*

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
    <h1 style={{ textAlign: "center", fontSize: "5rem", margin: "0" }}>Preview</h1>
  </Confirm>
  <Button variant="contained" color="success" onClick={() => toast.info("Item added successfully!")}>
    Toast
  </Button>
</Box>
*/
