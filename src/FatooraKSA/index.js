import QR from "qrcode";

// Single TextEncoder instance to be reused
const encoder = new TextEncoder();

/**
 * Convert TLV string (in hex) to Base64
 * @param {string} tlvString - TLV string in hexadecimal format
 * @returns {string} - Base64 encoded string
 */
const TLV_2_B64_STRING = (tlvString) => {
  const binaryData =
    tlvString
      .match(/.{2}/g)
      ?.map((byte) => String.fromCharCode(parseInt(byte, 16)))
      .join("") || "";
  return btoa(binaryData);
};

/**
 * Generate TLV (Tag-Length-Value) encoded string from data
 * @param {Object} data - Key-value pairs to encode
 * @returns {string} - TLV encoded string
 */
const generateTLV = (data) => {
  return Object.entries(data)
    .map(([_, value], index) => {
      const tag = (index + 1).toString(16).padStart(2, "0");
      const encodedValue = encoder.encode(value);
      const length = encodedValue.length.toString(16).padStart(2, "0");
      const valueHex = Array.from(encodedValue)
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
      return tag + length + valueHex;
    })
    .join("");
};

/**
 * Generate Base64 TLV for Phase 1
 * @param {Object} params - Phase 1 data
 * @returns {string} - Base64 encoded TLV string
 */
const GET_B64_TLV = ({
  seller,
  vatRegNumber,
  timeStamp,
  totalAmount,
  vatAmount,
}) => {
  return TLV_2_B64_STRING(
    generateTLV({ seller, vatRegNumber, timeStamp, totalAmount, vatAmount })
  );
};

/**
 * Generate Base64 TLV for Phase 2
 * @param {Object} params - Phase 2 data
 * @returns {string} - Base64 encoded TLV string
 */
const GET_B64_TLV2 = ({
  seller,
  vatRegNumber,
  timeStamp,
  totalAmount,
  vatAmount,
  invoiceHash,
  cryptographicStamp,
  publicKey,
}) => {
  return TLV_2_B64_STRING(
    generateTLV({
      seller,
      vatRegNumber,
      timeStamp,
      totalAmount,
      vatAmount,
      invoiceHash,
      cryptographicStamp,
      publicKey,
    })
  );
};

/**
 * Generate QR Code for Phase 1
 * @param {Object} params - Phase 1 data
 * @returns {Promise<string>} - QR code as a data URL
 */
const FatooraQR1 = async ({
  seller,
  vatRegNumber,
  timeStamp,
  totalAmount,
  vatAmount,
}) => {
  try {
    const base64TLV = Get_B64_TLV({
      seller,
      vatRegNumber,
      timeStamp,
      totalAmount,
      vatAmount,
    });
    return await QR.toDataURL(base64TLV);
  } catch (error) {
    console.error("Error generating QR code for Phase 1:", error);
    throw new Error("QR code generation for Phase 1 failed.");
  }
};

/**
 * Generate QR Code for Phase 2
 * @param {Object} params - Phase 2 data
 * @returns {Promise<string>} - QR code as a data URL
 */
const FatooraQR2 = async ({
  seller,
  vatRegNumber,
  timeStamp,
  totalAmount,
  vatAmount,
  invoiceHash,
  cryptographicStamp,
  publicKey,
}) => {
  try {
    const base64TLV = GET_B64_TLV2({
      seller,
      vatRegNumber,
      timeStamp,
      totalAmount,
      vatAmount,
      invoiceHash,
      cryptographicStamp,
      publicKey,
    });
    return await QR.toDataURL(base64TLV);
  } catch (error) {
    console.error("Error generating QR code for Phase 2:", error);
    throw new Error("QR code generation for Phase 2 failed.");
  }
};

export {
  generateTLV,
  TLV_2_B64_STRING,
  GET_B64_TLV,
  GET_B64_TLV2,
  FatooraQR1,
  FatooraQR2,
};
