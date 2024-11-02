import { db } from "./iDB";
import { v4 as uuidv4 } from "uuid";

// Generic CRUD functions
export async function create<T>(table: Dexie.Table<T, string>, data: T): Promise<string> {
  const id = await table.add({ ...data, id: uuidv4() } as any);
  return id;
}

export async function read<T>(table: Dexie.Table<T, string>, id: string): Promise<T | undefined> {
  return await table.get(id);
}

export async function readAll<T>(table: Dexie.Table<T, string>): Promise<T[]> {
  return await table.toArray();
}

export async function update<T>(table: Dexie.Table<T, string>, id: string, updates: Partial<T>): Promise<number> {
  return await table.update(id, updates);
}

export async function remove<T>(table: Dexie.Table<T, string>, id: string): Promise<void> {
  // Optional: Add security checks before allowing deletion
  await table.delete(id);
}
