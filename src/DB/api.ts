// api.ts
import db, { Item } from "./iDB";

// Create a new item
export const createItem = async (item: Item): Promise<Item> => {
  const id = await db.items.add(item);
  return { id, ...item };
};

// Read all items
export const readItems = async (): Promise<Item[]> => {
  return await db.items.toArray();
};

// Read a single item by ID
export const readItem = async (id: number): Promise<Item | undefined> => {
  return await db.items.get(id);
};

// Update an item
export const updateItem = async (id: number, updatedFields: Partial<Item>): Promise<Item | undefined> => {
  await db.items.update(id, updatedFields);
  return await readItem(id);
};

// Delete an item
export const deleteItem = async (id: number): Promise<number> => {
  await db.items.delete(id);
  return id;
};
