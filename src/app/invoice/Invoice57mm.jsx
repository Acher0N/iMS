import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { round } from "lodash";
import FatooraQR from "../../modules/Fatoora_KSA/Fatoora.KSA_2";
import { BRAND_NAME, BRAND_VAT_NO } from "../../Config";

const Invoice57mm = ({ invoiceData, reference, orderNo = 1 }) => {
  const date = `${String(new Date().getDate()).padStart(2, "0")}/${String(new Date().getMonth() + 1).padStart(2, "0")}/${new Date().getFullYear()}`;
  const time = `${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2, "0")}`;

  useEffect(() => {
    (async () => {
      document.getElementById("qrImg").setAttribute(
        "src",
        await FatooraQR({
          seller: BRAND_NAME,
          vatRegNumber: BRAND_VAT_NO,
          timeStamp: new Date().toISOString(),
          totalAmount: round(invoiceData.order_total, 2).toFixed(2),
          vatAmount: round(invoiceData.estimated_VAT, 2).toFixed(2),
        })
      );
    })();
  }, [invoiceData]);

  // Child Components

  const Header = () => (
    <Box>
      <Typography variant="h3" textTransform="uppercase" sx={{ fontWeight: "900", fontSize: "18px" }}>
        {BRAND_NAME}
      </Typography>
      <Typography variant="p" sx={{ fontFamily: "monospace" }}>
        Simplified Tax Invoice
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", fontSize: "13px" }}>
        <HeaderItem name="TAX No - (رقم الضريبي)" value={BRAND_VAT_NO} />
        <HeaderItem name="Date - (تاريخ)" value={date} />
        <HeaderItem name="Time - (وقت)" value={time} />
        <HeaderItem name="Order No - (رقم الطلب)" value={orderNo} />
        <HeaderItem name="Employee - (موظف)" value="Owner" />
      </Box>
      <Line />
    </Box>
  );

  const ProductList = () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "0px", width: "100%" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "15px 1fr 1fr 1fr 1fr 1fr",
          fontSize: "13px",
          p: "0px 0",
          gap: "10px",
        }}
      >
        <Typography variant="p" sx={{ fontFamily: "monospace" }}>
          Id
        </Typography>
        <Box sx={{ gridColumn: "span 2", display: "flex" }}>
          <Typography variant="p" sx={{ fontFamily: "monospace" }}>
            Product <br /> منتجات
          </Typography>
        </Box>
        <Typography variant="p" sx={{ fontFamily: "monospace" }}>
          Qty <br /> كمية
        </Typography>
        <Typography variant="p" sx={{ fontFamily: "monospace" }}>
          Rate <br /> سعر
        </Typography>
        <Typography variant="p" sx={{ fontFamily: "monospace" }} textAlign="right">
          Total <br /> المجموع
        </Typography>
      </Box>
      {invoiceData.products.map((item) => (
        <Item item={item} key={item.id} />
      ))}
    </Box>
  );

  const Footer = () => (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "flex-end" }}>
        <Box sx={{ width: "100%" }}>
          <FooterItem name="Total before VAT" value={round(invoiceData.subtotal, 2).toFixed(2)} />
          <FooterItem name="Estimated VAT" value={round(invoiceData.estimated_VAT, 2).toFixed(2)} />
          <FooterItem name="Discount" value={round(invoiceData.discounts, 2).toFixed(2)} />
          <FooterItem name="Total With TAX" value={round(invoiceData.order_total, 2).toFixed(2)} isTotal />
        </Box>
      </Box>
    </Box>
  );

  const ThankYouNote = () => (
    <Box sx={{ width: "150px", height: "150px", mb: "10px" }}>
      <img src="" id="qrImg" alt="QR Code" width="100%" height="100%" style={{ objectFit: "contain" }} />
      <Typography
        variant="h6"
        sx={{
          fontSize: "10px",
          fontFamily: "monospace",
          textAlign: "center",
          lineHeight: "1",
          mb: "15px",
        }}
      >
        Thank You For Shopping
        <br />
        powered by <span style={{ fontSize: "14px", fontWeight: "900" }}>NextGen</span>
      </Typography>
    </Box>
  );

  // Utility Components

  const HeaderItem = ({ name, value }) => (
    <Typography variant="p" sx={{ display: "flex", justifyContent: "space-between", width: "100%", fontSize: "12px" }}>
      {name}: {value}
    </Typography>
  );

  const FooterItem = ({ name, value, isTotal }) => (
    <Box sx={{ display: "flex", justifyContent: "space-between", mt: isTotal ? "15px" : "0" }}>
      <Typography variant="p" sx={{ fontFamily: "monospace", fontWeight: isTotal ? "700" : "400" }}>
        {name}
      </Typography>
      <Typography variant="p" sx={{ fontFamily: "monospace", fontWeight: isTotal ? "700" : "400" }}>
        {value}
      </Typography>
    </Box>
  );

  const Line = () => <hr style={{ width: "100%", borderTop: "1px dashed #000" }} />;

  const Item = ({ item }) => (
    <Box sx={{ display: "grid", gridTemplateColumns: "15px 1fr 1fr 1fr 1fr 1fr", fontSize: "13px", gap: "10px" }}>
      <Typography>{item.id}</Typography>
      <Typography>{item.productName}</Typography>
      <Typography>{item.qty}</Typography>
      <Typography>{item.rate}</Typography>
      <Typography>{item.total}</Typography>
    </Box>
  );

  // Main Component Rendering
  return (
    <Box
      ref={reference}
      sx={{
        width: "57mm",
        background: "#fff",
        padding: "3px",
        display: "flex",
        py: "30px",
        flexDirection: "column",
        alignItems: "center",
        "& *": {
          fontFamily: "monospace !important",
          fontSize: "11px",
          fontWeight: "100",
        },
      }}
    >
      <Header />
      <ProductList />
      <Footer />
      <ThankYouNote />
    </Box>
  );
};

export default Invoice57mm;
