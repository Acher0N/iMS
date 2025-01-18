import React from "react";

const InvoiceA4 = ({ shop = {}, cart = {}, qr }) => {
  const { products, order_total, estimated_VAT, subtotal, discounts } = cart;

  const sampleData = {
    name: shop?.name?.en,
    vatNo: shop?.VATNo,
    time: new Date().toISOString(),
    totalAmount: order_total?.toFixed(2),
    vatAmount: estimated_VAT?.toFixed(2),
  };

  const styles = {
    container: {
      padding: "20px",
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
      paddingBottom: "30px",
    },
    secondaryHeader: {
      display: "grid",
      gridTemplateColumns: "3fr 3fr 2fr 2fr",
      paddingBottom: "20px",
      borderBottom: "1px solid #ccc",
      gap: "20px",
    },
    itemsHeader: {
      display: "grid",
      gridTemplateColumns: "50px 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
      background: "#00000010",
      padding: "10px",
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
      gridTemplateColumns: "1fr 1fr 1fr",
      justifyContent: "space-between",
      gap: "20px",
      fontWeight: "bold",
    },
    signaturePad: {
      height: "70px",
      padding: "10px",
      display: "flex",
      alignItems: "flex-end",
      background: "#ddd",
      borderRadius: "5px",
    },
  };

  /*--------------------------------------------------------------------------------
    Invoice Header
---------------------------------------------------------------------------------*/
  const InvoiceHeader = () => (
    <div style={styles.header}>
      <div style={{ flexBasis: "40%" }}>
        <span style={{ fontSize: "22px", fontWeight: "900" }}>{shop?.name?.en}</span>
        <span style={{ display: "block", fontSize: "15px" }}>{shop?.address?.en}</span>
        <br />
        <div>VAT NO: {shop?.VATNo}</div>
        <div>C.R. NO: {shop?.CRNo}</div>
        <div>Phone: {shop?.phone}</div>
        <div>Email: {shop?.email}</div>
      </div>
      <div style={{ flexBasis: "20%", textAlign: "center" }}>
        <img width="120px" src={shop?.logo} alt="Shop Logo" />
      </div>
      <div style={{ flexBasis: "40%", textAlign: "right" }}>
        <span style={{ fontSize: "25px", fontWeight: "900" }}>{shop?.name?.ar}</span>
        <span style={{ display: "block", fontSize: "15px" }}>{shop?.address?.ar}</span>
        <br />
        <div>ضريبة: {shop?.VATNo}</div>
        <div>سجل تجاري: {shop?.CRNo}</div>
        <div>رقم التليفون: {shop?.phone}</div>
        <div>بريد إلكتروني: {shop?.email}</div>
      </div>
    </div>
  );

  /*--------------------------------------------------------------------------------
    Invoice Header 2nd
---------------------------------------------------------------------------------*/
  const InvoiceHeader2nd = () => (
    <div style={styles.secondaryHeader}>
      <div>
        <div>Seller: Mahamud</div>
        <div>Counter: 1</div>
      </div>
      <div>
        <div>Customer: Kareem Ahmed</div>
        <div>Phone: {shop.phone}</div>
      </div>
      <div>
        <div>Invoice ID: F123ABC</div>
        <div>Date: 2023-11-25</div>
        <div>Time: 12:00 PM</div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <img src={qr} width="130px" height="130px" alt="QR Code" />
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
      <div>
        <div>Total Amount: {subtotal?.toFixed(2)}</div>
        <div>Total VAT: {estimated_VAT?.toFixed(2)}</div>
        <div>Discounts: {discounts?.toFixed(2)}</div>
        <div>Grand Total: {order_total?.toFixed(2)}</div>
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
    <div
      style={{
        textAlign: "center",
        background: "#ccc",
        borderRadius: "3px",
        padding: "5px 10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
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
