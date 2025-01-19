import { useEffect } from "react";
import FatooraQR from "../../Modules/FatooraKSA";
import { BRAND_NAME, BRAND_VAT_NO } from "../../Config";
import { round } from "lodash";

import QR from "qrcode";

const InvoiceA4 = ({ shop = {}, cart = {}, QR_STRING }) => {
  const { products, order_total, estimated_VAT, subtotal, discounts } = cart;
  const date = `${String(new Date().getDate()).padStart(2, "0")}/${String(new Date().getMonth() + 1).padStart(2, "0")}/${new Date().getFullYear()}`;
  const time = `${new Date().getHours()}:${String(new Date().getMinutes()).padStart(2, "0")}`;

  const sampleData = {
    name: shop?.name?.en,
    vatNo: shop?.VATNo,
    time: new Date().toISOString(),
    totalAmount: order_total?.toFixed(2),
    vatAmount: estimated_VAT?.toFixed(2),
  };

  useEffect(() => {
    (async () => {
      document.getElementById("qrImgbig").setAttribute("src", await QR.toDataURL(QR_STRING));
    })();
  }, [cart]);

  /*--------------------------------------------------------------------------------
  Invoice Styles
---------------------------------------------------------------------------------*/
  const styles = {
    container: {
      margin: "0px",
      minWidth: "210mm",
      maxWidth: "210mm",
      minHeight: "297mm",
      display: "grid",
      gridTemplateRows: "auto auto 1fr auto auto",
      gap: "20px",
      fontSize: "14px",
      fontWeight: "100",
      background: "#fff",
      color: "#000",
      fontFamily: "sans-serif",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      borderBottom: "1px solid #ccc",
      padding: "20px",
      paddingBottom: "30px",
    },

    logo: {
      width: "120px",
      filter: "drop-shadow(0 12px 0.2rem #00000040)",
    },

    secondaryHeader: {
      display: "grid",
      margin: "0 20px",
      gridTemplateColumns: "4fr 4fr 2fr",
      paddingBottom: "20px",
      borderBottom: "1px solid #ccc",
    },
    itemsHeader: {
      display: "grid",
      gridTemplateColumns: "50px 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
      background: "#00000010",
      padding: "10px",
      margin: "0 20px",
      fontWeight: "bold",
    },
    itemStyle: {
      display: "grid",
      gridTemplateColumns: "50px 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
      padding: "10px",
      borderBottom: "1px solid #ddd",
    },
    footerStyle: {
      display: "grid",
      margin: "0 20px",
      gridTemplateColumns: "3fr 3fr 5fr",
      justifyContent: "space-between",
      alignItems: "flex-end",
      gap: "20px",
      fontWeight: "bold",
    },
    signaturePad: {
      height: "70px",
      padding: "10px",
      display: "flex",
      alignItems: "flex-end",
      // background: "#ddd",
      background: "#cccccc40",

      borderRadius: "5px",
    },
    policy: {
      textAlign: "center",
      background: "#cccccc40",
      borderRadius: "3px",
      padding: "10px 10px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  };

  /*--------------------------------------------------------------------------------
  Invoice Header
---------------------------------------------------------------------------------*/
  const InvoiceHeader = () => (
    <div style={styles.header} className="">
      <div style={{ flexBasis: "40%" }}>
        <span style={{ fontSize: "22px", fontWeight: "900" }}>{shop?.name?.en}</span>
        <span style={{ display: "block", fontSize: "15px" }}>{shop?.address?.en}</span>
        <br />
        <TextSpliter data={`VAT NO-${shop?.VATNo}`} />
        <TextSpliter data={`C.R. NO-${shop?.CRNo}`} />
        <TextSpliter data={`Phone-${shop?.phone}`} />
        <TextSpliter data={`Email-${shop?.email}`} />
      </div>
      <div style={{ flexBasis: "20%", textAlign: "center" }}>
        <img style={{ ...styles.logo }} src={shop?.logo} alt="Shop Logo" />
      </div>
      <div style={{ flexBasis: "40%", textAlign: "right" }}>
        <span style={{ fontSize: "25px", fontWeight: "900" }}>{shop?.name?.ar}</span>
        <span style={{ display: "block", fontSize: "15px" }}>{shop?.address?.ar}</span>
        <br />
        <TextSpliter data={`${shop?.VATNo}-ضريبة`} sx={{ marginLeft: "auto", gridTemplateColumns: "1fr 5px  60px", textAlign: "right" }} />
        <TextSpliter data={`${shop?.CRNo}-سجل تجاري`} sx={{ marginLeft: "auto", gridTemplateColumns: "1fr 5px  60px", textAlign: "right" }} />
        <TextSpliter data={`${shop?.phone}-رقم التليفون`} sx={{ marginLeft: "auto", gridTemplateColumns: "1fr 5px  60px", textAlign: "right" }} />
        <TextSpliter
          data={`${shop?.email}-بريد إلكتروني`}
          sx={{ marginLeft: "auto", gridTemplateColumns: "1fr 5px  65px", gap: "10px", textAlign: "right" }}
        />
      </div>
    </div>
  );

  const TextSpliter = ({ data, sx }) => (
    <div
      style={{
        display: "grid",
        width: "290px",
        gap: "15px",
        gridTemplateColumns: "60px 5px  1fr ",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "left",
        ...sx,
      }}
    >
      <div style={{}}>{data.split("-")[0]}</div>:<div style={{}}>{data.split("-")[1]}</div>
    </div>
  );

  const TextSpliterV2 = ({ data, sx }) => (
    <div
      style={{
        display: "grid",
        width: "100%",
        gap: "10px",
        gridTemplateColumns: "140px 5px  1fr ",
        justifyContent: "space-between",
        alignItems: "flex-start",
        textAlign: "left",
        ...sx,
      }}
    >
      <div style={{ display: "flex", gap: "10px", justifyContent: "space-between", flexWrap: "wrap" }}>
        <div style={{ textAlign: "left" }}>{data.split("-")[0]}</div>
        <div style={{ textAlign: "right" }}>{data.split("-")[1]}</div>
      </div>
      :<div style={{ textAlign: "left" }}>{data.split("-")[2]}</div>
    </div>
  );

  /*--------------------------------------------------------------------------------
  Invoice Header 2nd
---------------------------------------------------------------------------------*/
  const InvoiceHeader2nd = () => (
    <div style={styles.secondaryHeader}>
      <div style={{ borderRight: "1px solid #cccccc50", padding: "0 20px 0 0" }}>
        <TextSpliterV2 data={`seller - (البائع) - Mahamud`} />
        <TextSpliterV2 data={`Date - (التاريخ) - ${date}`} />
        <TextSpliterV2 data={`Invoice ID - (رقم الفاتورة) - F123ABC`} />
        <TextSpliterV2 data={`Time - (الوقت) - ${time}`} />
        <TextSpliterV2 data={`Counter - (العداد) - 1`} />
      </div>
      <div style={{ borderRight: "1px solid #cccccc50", padding: "0 20px" }}>
        <TextSpliterV2 data={`Customer - (العميل) - Kareem Ahmed`} sx={{ gridTemplateColumns: "130px 5px  1fr " }} />
        <TextSpliterV2 data={`Phone - (الهاتف) - ${shop.phone}`} sx={{ gridTemplateColumns: "130px 5px  1fr " }} />
        <TextSpliterV2 data={`VAT No - (رقم الضريبي) - 23143578390264`} sx={{ gridTemplateColumns: "130px 5px  1fr " }} />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <img id="qrImgbig" width="130px" height="130px" alt="QR Code" />
      </div>
    </div>
  );

  /*--------------------------------------------------------------------------------
  Invoice Items
---------------------------------------------------------------------------------*/
  const InvoiceItems = () => (
    <div>
      <div style={styles.itemsHeader}>
        <div>ID</div>
        <div style={{ gridColumn: "span 2" }}>Product Name</div>
        <div>Quantity</div>
        <div>Unit Price</div>
        <div>VAT(15%)</div>
        <div>Total VAT</div>
        <div style={{ textAlign: "right" }}>Total Amount</div>
      </div>
      {products?.map((product, index) => (
        <div key={index} style={styles.itemStyle}>
          <div>{index + 1}</div>
          <div style={{ gridColumn: "span 2" }}>
            {product?.name?.en}
            <br />
            {product?.name?.ar}
          </div>
          <div>{product?.quantity}</div>
          <div>{product?.price_without_VAT?.toFixed(2)}</div>
          <div>{product?.VAT?.toFixed(2)}</div>
          <div>{product?.total_VAT?.toFixed(2)}</div>
          <div style={{ textAlign: "right" }}>{product?.total_price?.toFixed(2)}</div>
        </div>
      ))}
    </div>
  );

  /*--------------------------------------------------------------------------------
  Invoice Footer
---------------------------------------------------------------------------------*/
  const InvoiceFooter = () => (
    <div style={styles.footerStyle}>
      <SignaturePad label="Seller Signature" />
      <SignaturePad label="Customer Signature" />
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <TextSpliterV2
          data={`Total Amount - (المبلغ الإجمالي) - ${round(subtotal, 2)?.toFixed(2)}`}
          sx={{ gridTemplateColumns: "180px 5px  1fr " }}
        />
        <TextSpliterV2
          data={`VAT Amount - (مبلغ الضريبة) - ${round(estimated_VAT, 2)?.toFixed(2)}`}
          sx={{ gridTemplateColumns: "180px 5px  1fr " }}
        />
        <TextSpliterV2 data={`Discounts - (الخصومات) - ${round(discounts, 2)?.toFixed(2)}`} sx={{ gridTemplateColumns: "180px 5px  1fr " }} />
        <TextSpliterV2
          data={`Grand Total - (المجموع الكلي) - ${round(order_total, 2)?.toFixed(2)}`}
          sx={{ gridTemplateColumns: "180px 5px  1fr " }}
        />
      </div>
    </div>
  );

  /*--------------------------------------------------------------------------------
  Signature Pad Component
---------------------------------------------------------------------------------*/
  const SignaturePad = ({ label }) => <div style={styles.signaturePad}>{label}</div>;

  /*--------------------------------------------------------------------------------
  Invoice Policy
---------------------------------------------------------------------------------*/
  const InvoicePolicy = () => (
    <div style={{ ...styles.policy }}>
      <span>Thank You For Shopping.</span>
      <span>
        powered by <span style={{ fontSize: "18px", fontWeight: "900", color: "#000" }}>NextGen</span>
      </span>
    </div>
  );

  return (
    <div style={styles.container}>
      <InvoiceHeader />
      <InvoiceHeader2nd />
      <InvoiceItems />
      <InvoiceFooter />
      <InvoicePolicy />
    </div>
  );
};

export default InvoiceA4;
