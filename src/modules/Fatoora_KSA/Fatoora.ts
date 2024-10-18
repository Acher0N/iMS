import QR from "qrcode";

// Define the interface for the function's parameters
interface FatooraQRProps {
  seller: string;
  vatRegNumber: string;
  timeStamp: string;
  totalAmount: string;
  vatAmount: string;
}

// Single TextEncoder instance to be reused
const encoder = new TextEncoder();

/*
// Convert text to hexadecimal (optimized for any UTF-8 text, including Arabic)
function textToHex(text: string): string {
  return Array.from(encoder.encode(text)) // Converts text to Uint8Array
    .map((byte) => byte.toString(16).padStart(2, "0")) // Convert each byte to hex
    .join(""); // Join hex values into a single string
}
*/

// Convert TLV string (in hex) to Base64 (more concise and efficient)
function tlvToBase64(tlvString: string): string {
  const binaryData =
    tlvString
      .match(/.{2}/g)
      ?.map((byte) => String.fromCharCode(parseInt(byte, 16)))
      .join("") || "";
  return btoa(binaryData); // Encode to base64
}

// Generate TLV (Tag-Length-Value) encoded string from data
const generateTLV = (data: FatooraQRProps): string => {
  return Object.keys(data)
    .map((key, index) => {
      const value = data[key as keyof FatooraQRProps]; // Use keyof to ensure type safety
      const tag = (index + 1).toString(16).padStart(2, "0"); // 2-digit tag based on index
      const encodedValue = encoder.encode(value); // Encode text once
      const length = encodedValue.length.toString(16).padStart(2, "0"); // Length based on byte size
      const valueHex = Array.from(encodedValue) // Convert encoded bytes to hex in one step
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
      return tag + length + valueHex; // Concatenate tag, length, and value
    })
    .join("");
};

// QR Code generator function
export default async function FatooraQR({
  seller,
  vatRegNumber,
  timeStamp,
  totalAmount,
  vatAmount,
}: FatooraQRProps): Promise<string> {
  try {
    // Generate TLV data and convert to Base64
    const tlvData = generateTLV({
      seller,
      vatRegNumber,
      timeStamp,
      totalAmount,
      vatAmount,
    });
    const base64TLV = tlvToBase64(tlvData);

    // Generate and return the QR code as a data URL
    return await QR.toDataURL(base64TLV);
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw new Error("QR code generation failed.");
  }
}
