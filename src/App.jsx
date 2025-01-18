import { Box, Button } from "@mui/material";
import { Titlebar, Confirm, Header } from "./components";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material";
import { Login } from "./pages/Login";
import JsonFileUploader from "./Modules/JSON_Upload";
import SvgToBase64 from "./Modules/SVG2B64";

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
      {/* <Titlebar /> */}
      <Button onClick={() => handleDelete()}>Delete Item</Button>
      <Confirm isOpen={isConfirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={handleDelete} />
      <JsonFileUploader />
      <SvgToBase64 />
      <Login />
    </Box>
  );
};

export default App;
