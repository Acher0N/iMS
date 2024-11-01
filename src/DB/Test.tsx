// src/ItemManager.tsx
import React, { useEffect, useState } from "react";
import { createItem, readItems, updateItem, deleteItem, readItem } from "./api";
import { Item } from "./iDB";

const ItemManager: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Omit<Item, "id">>({ name: "", description: "" });
  const [editItemId, setEditItemId] = useState<number | null>(null);

  const fetchItems = async () => {
    const items = await readItems();
    setItems(items);
  };

  const handleCreate = async () => {
    if (newItem.name && newItem.description) {
      const createdItem = await createItem(newItem);
      setItems([...items, createdItem]);
      setNewItem({ name: "", description: "" });
    }
  };

  const handleUpdate = async () => {
    if (editItemId !== null) {
      const updatedItem = await updateItem(editItemId, newItem);
      if (updatedItem) {
        setItems(items.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
        setNewItem({ name: "", description: "" });
        setEditItemId(null);
      }
    }
  };

  const handleDelete = async (id: number) => {
    await deleteItem(id);
    setItems(items.filter((item) => item.id !== id));
  };

  const handleEdit = (item: Item) => {
    setNewItem({ name: item.name, description: item.description });
    setEditItemId(item.id || null);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h1>Item Manager</h1>
      <input type="text" placeholder="Name" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
      <input type="text" placeholder="Description" value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} />
      <button onClick={editItemId ? handleUpdate : handleCreate}>{editItemId ? "Update Item" : "Create Item"}</button>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong>: {item.description}
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id!)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemManager;
