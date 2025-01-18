import { Box, Button, Typography } from "@mui/material";
import { Titlebar, Confirm, Header } from "./components";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material";
import { Login } from "./pages/Login";
import JsonFileUploader from "./Modules/JSON_Upload";
import SvgToBase64 from "./Modules/SVG2B64";
import Invoice57mm from "./app/invoice/Invoice57mm";
import InvoiceA4 from "./app/invoice/InvoiceA4";
import { LOGO } from "./Assets";
import { Invoice } from "./app/invoice";

const App = () => {
  const theme = useTheme();
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [invoice_paper, setInvoicePaper] = useState("A4");

  const handleDelete = () => {
    setConfirmOpen(false);
    toast("Item deleted successfully!");
  };

  const shop = {
    logo: LOGO,
    name: { en: "Kingsmandev.IT", ar: "كينغزمان ديف" },
    VATNo: "1234567890",
    CRNo: "1234567890",
    phone: "+1234567890",
    email: "kingsmandev.it@gmail.com",
  };

  return (
    <Box dir={theme.direction}>
      <Header />
      {/* <Titlebar /> */}
      <Button onClick={() => handleDelete()}>Delete Item</Button>
      <Login />
      <Confirm isOpen={isConfirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={handleDelete} />
      <JsonFileUploader />
      <br />
      <Box display={"flex"} flexDirection={"column"} gap={"30px"} justifyContent={"center"} alignItems={"center"}>
        <Box display={"flex"} gap={"10px"}>
          <Button variant={invoice_paper === "A4" ? "contained" : "text"} onClick={() => setInvoicePaper("A4")}>
            A4
          </Button>
          <Button variant={invoice_paper === "token" ? "contained" : "text"} onClick={() => setInvoicePaper("token")}>
            Token
          </Button>
        </Box>
        <Invoice shop={shop} cart={{}} paper={invoice_paper} />
        <Typography variant="h4" component="h1" gutterBottom>
          Invoice Preview
        </Typography>
      </Box>
      <SvgToBase64 />
    </Box>
  );
};

export default App;
