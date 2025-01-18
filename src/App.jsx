import { Box, Button } from "@mui/material";
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
      <Login />
      <Confirm isOpen={isConfirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={handleDelete} />
      <JsonFileUploader />
      <br />
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Invoice57mm invoiceData={{ order_total: 200, subtotal: 170, discounts: 0, estimated_VAT: 30, products: [] }} />
      </Box>
      <SvgToBase64 />
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <InvoiceA4
          cart={{ order_total: 200, subtotal: 170, discounts: 0, estimated_VAT: 30, products: [] }}
          shop={{ logo: LOGO, name: { en: "Kingsmandev.IT", ar: "كينغزمان ديف" } }}
        />
      </Box>
    </Box>
  );
};

export default App;
