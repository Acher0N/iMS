export default function UniqueID(lastID) {
  const baseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const base = baseCharacters.length;

  // Function to convert a number to a base-n string
  function numberToBase(num) {
    let result = "";
    while (num > 0) {
      result = baseCharacters[num % base] + result;
      num = Math.floor(num / base);
    }
    return result || "A"; // Return 'A' for 0
  }

  // Function to convert the ID to a unique number
  function idToNumber(id) {
    let num = 0;
    for (let i = 0; i < id.length; i++) {
      num *= base;
      num += baseCharacters.indexOf(id[i]);
    }
    return num;
  }

  // Convert lastID to a number
  const lastNum = idToNumber(lastID);
  const nextNum = lastNum + 1; // Increment by 1
  const nextID = numberToBase(nextNum); // Convert back to base-n

  // Pad with zeros to ensure a fixed length (you can adjust this length as needed)
  return nextID.padStart(lastID.length, "A"); // Ensure at least the same length
}
