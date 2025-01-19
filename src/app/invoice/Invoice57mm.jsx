import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { round } from "lodash";
import FatooraQR from "../../Modules/FatooraKSA";
import { BRAND_NAME, BRAND_VAT_NO } from "../../Config";
import QR from "qrcode";

const Invoice57mm = ({ reference, orderNo = 1, orderID = "F123ABC", shop = {}, cart = {}, QR_STRING }) => {
  const { products, order_total, estimated_VAT, subtotal, discounts } = cart;
  const date = `${String(new Date().getDate()).padStart(2, "0")}/${String(new Date().getMonth() + 1).padStart(2, "0")}/${new Date().getFullYear()}`;
  const time = `${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2, "0")}`;

  console.log(QR_STRING);

  const sampleData = {
    name: shop?.name?.en,
    vatNo: shop?.VATNo,
    time: new Date().toISOString(),
    totalAmount: order_total?.toFixed(2),
    vatAmount: estimated_VAT?.toFixed(2),
  };

  useEffect(() => {
    (async () => {
      document.getElementById("qrImg").setAttribute("src", await QR.toDataURL(QR_STRING));
    })();
  }, [cart]);

  const styles = {
    container: {
      width: "57mm",
      background: "#fff",
      padding: "3px",
      display: "flex",
      textAlign: "center",
      color: "#000",
      height: "max-content",
      py: "15px",
      gap: "20px",
      flexDirection: "column",
      alignItems: "center",
      position: "relative",

      "& *": {
        fontFamily: "monospace !important",
        fontSize: "10px",
        fontWeight: "100",
      },
    },

    header: {
      height: "240px",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    },
    header_title: { fontWeight: "900", fontSize: "18px !important" },
    header_subtitle: { fontFamily: "monospace" },
    header_items: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      fontSize: "13px",
      flexDirection: "column",
    },
    header_item: {
      display: "grid",
      gridTemplateColumns: "50px 5px 1fr 5px 50px ",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      fontSize: "12px",
      borderBottom: "1px dashed #00000015",
    },

    products: {
      display: "flex",
      flexDirection: "column",
      gap: "0px",
      width: "100%",
    },

    footer: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      alignItems: "flex-end",
    },

    thankYouNote: {
      width: "150px",
      height: "150px",
      mb: "30px",
    },
  };

  /*--------------------------------------------------------------------------------
  Invoice Header
---------------------------------------------------------------------------------*/
  const Header = () => (
    <Box sx={styles.header}>
      <Box>
        <img src={shop.logo} alt="logo" style={{ width: "40px", height: "40px", objectFit: "contain" }} />
      </Box>
      <Typography variant="h1" textTransform="uppercase" sx={styles.header_title}>
        {shop?.name?.en}
      </Typography>
      <Typography variant="p" sx={styles.header_subtitle}>
        Simplified Tax Invoice
      </Typography>
      <Line />

      <Box sx={styles.header_items}>
        {/* <HeaderItem name="TAX No : رقم الضريبي" value={shop?.VATNo} /> */}
        <HeaderItem data={`TAX No- ${shop?.VATNo} - رقم الضريبي`} />
        <HeaderItem data={`Date - ${date} - تاريخ`} />
        <HeaderItem data={`Time - ${time} -  وقت`} />
        <HeaderItem data={`Order ID - ${orderID} -  معرّف الطلب `} />
        <HeaderItem data={`Order No - ${orderNo} -  رقم الطلب `} />
        <HeaderItem data={`Employee - ${"Karem Ahmed"} -  موظف `} />
      </Box>
      <Line />
    </Box>
  );

  const HeaderItem = ({ data }) => {
    return (
      <Box sx={styles.header_item}>
        <div style={{ textAlign: "left" }}>{data.split("-")[0]}</div>:<div style={{ textAlign: "center" }}>{data.split("-")[1]}</div>:
        <div style={{ textAlign: "right" }}>{data.split("-")[2]}</div>
      </Box>
    );
  };
  /*--------------------------------------------------------------------------------
  Invoice Products
---------------------------------------------------------------------------------*/
  const Products = () => (
    <Box sx={styles.products}>
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
      {/* {cart && cart?.products.map((item) => <Item item={item} key={item.id} />)} */}
      <Line />
    </Box>
  );

  const Item = ({ item }) => (
    <Box sx={{ display: "grid", gridTemplateColumns: "15px 1fr 1fr 1fr 1fr 1fr", fontSize: "13px", gap: "10px" }}>
      <Typography>{item.id}</Typography>
      <Typography>{item.productName}</Typography>
      <Typography>{item.qty}</Typography>
      <Typography>{item.rate}</Typography>
      <Typography>{item.total}</Typography>
    </Box>
  );

  /*--------------------------------------------------------------------------------
  Invoice Footer
---------------------------------------------------------------------------------*/
  const Footer = () => (
    <Box sx={styles.footer}>
      <Box sx={{ width: "100%" }}>
        <FooterItem name="Total before VAT" value={round(cart.subtotal, 2).toFixed(2)} />
        <FooterItem name="Estimated VAT" value={round(cart.estimated_VAT, 2).toFixed(2)} />
        <FooterItem name="Discount" value={round(cart.discounts, 2).toFixed(2)} />
        <FooterItem name="Total With TAX" value={round(cart.order_total, 2).toFixed(2)} isTotal />
      </Box>
    </Box>
  );

  const ThankYouNote = () => (
    <Box sx={styles.thankYouNote}>
      <img src="" id="qrImg" alt="QR Code" width="130px" height="130px" style={{ objectFit: "contain" }} />
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

  const Line = () => <hr style={{ width: "100%", borderTop: "1px dashed #000", margin: "10px 0" }} />;

  /*--------------------------------------------------------------------------------
  Main Component Rendering
---------------------------------------------------------------------------------*/
  return (
    <Box ref={reference} sx={styles.container}>
      <Header />
      <Products />
      <Footer />
      <ThankYouNote />
    </Box>
  );
};

export default Invoice57mm;
