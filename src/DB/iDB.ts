// db.ts
import Dexie, { Table } from "dexie";
import { v4 as uuidv4 } from "uuid"; // Import the UUID library

// Define the Item interface
export interface Item {
  id?: number; // Optional because it will be auto-incremented
  name: string;
  description: string;
}
export interface Item1 {
  id?: number; // Optional because it will be auto-incremented
  name: string;
  description: string;
}

// Create the database class extending Dexie
class IMSDatabase extends Dexie {
  items!: Table<Item>; // Define a table for items
  items1!: Table<Item1>; // Define a table for items

  constructor() {
    super("iDB");
    this.version(1).stores({
      items: "id,name,description", // Use 'id' as primary key
    });
  }
}

// Export the database instance
const db = new IMSDatabase();

// Override the add method to automatically generate a UUID for new items
db.items.hook("creating", (primKey, obj) => {
  obj.id = uuidv4(); // Generate a UUID
});

export default db;
