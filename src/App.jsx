import { Box, CssBaseline, Button } from "@mui/material";
import { Titlebar, Logo, Confirm, Header } from "./components";

const App = () => {
  return (
    <Box>
      <CssBaseline />
      <Header />
      <Titlebar title={"Inventory Management System"} />
    </Box>
  );
};

export default App;
