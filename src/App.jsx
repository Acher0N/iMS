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
import Product from "./app/Products/Product";
import Customer from "./app/customers/Customer";
import B642SVG from "./Modules/B642SVG";
import QRCodeGenerator from "./Modules/B642SVG";

const App = () => {
  const theme = useTheme();
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [invoice_paper, setInvoicePaper] = useState("token");

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
        <Box display={"flex"} flexWrap={"wrap"} gap={"10px"} p={"20px"}>
          <Typography variant="h5" component="h5">
            Printable Invoice Preview
          </Typography>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Button size="small" variant={invoice_paper === "token" ? "contained" : "text"} onClick={() => setInvoicePaper("token")}>
              Token
            </Button>
            <Button size="small" variant={invoice_paper === "A4" ? "contained" : "text"} onClick={() => setInvoicePaper("A4")}>
              A4
            </Button>
          </Box>
        </Box>
        <Invoice shop={shop} cart={{}} paper={invoice_paper} />
      </Box>
      <SvgToBase64 />

      <QRCodeGenerator />
      <br />
      <Product />
      <br />
      <Customer />
      <br />
    </Box>
  );
};

export default App;
