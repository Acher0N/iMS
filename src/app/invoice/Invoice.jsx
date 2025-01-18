import { useEffect } from "react";
import Invoice57mm from "./Invoice57mm";
import InvoiceA4 from "./InvoiceA4";
import { getB64TLV } from "../../Modules/FatooraKSA";
const Invoice = ({ shop = {}, cart = {}, paper = "A4" }) => {
  const TLV_B64_STRING = getB64TLV({
    seller: shop?.name?.en,
    vatRegNumber: shop?.VATNo,
    timeStamp: new Date().toISOString(),
    totalAmount: cart?.order_total?.toFixed(2),
    vatAmount: cart?.estimated_VAT?.toFixed(2),
  });

  console.log(TLV_B64_STRING);
  return (
    <>
      {paper === "A4" ? (
        <InvoiceA4 cart={cart} shop={shop} QR_STRING={TLV_B64_STRING} />
      ) : paper === "token" ? (
        <Invoice57mm cart={cart} shop={shop} QR_STRING={TLV_B64_STRING} />
      ) : (
        "Invalid Paper Size"
      )}
    </>
  );
};

export default Invoice;
