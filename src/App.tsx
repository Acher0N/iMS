import React from "react";
import ItemManager from "./DB/Test";
import SalesComponent from "./DB/TEST2";
import { Box } from "@mui/material";

const App: React.FC = () => {
  return (
    <Box sx={{ display: "flex", gap: "1.5rem", p: "1.9rem" }}>
      <ItemManager />
      <SalesComponent />
    </Box>
  );
};

export default App;
