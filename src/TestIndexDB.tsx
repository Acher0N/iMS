import React, { useState } from "react";

const EstimateIDBStorage: React.FC = () => {
  const [maxCapacity, setMaxCapacity] = useState<number | null>(null);
  const [currentCapacity, setCurrentCapacity] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const estimateStorage = async () => {
    try {
      const dbName = "storage-test-db";
      const dbVersion = 1;
      let db: IDBDatabase;

      // Open IndexedDB connection
      const request: IDBOpenDBRequest = window.indexedDB.open(
        dbName,
        dbVersion
      );

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        db = (event.target as IDBOpenDBRequest).result;
        // Create an object store if it doesn't exist
        if (!db.objectStoreNames.contains("storage")) {
          db.createObjectStore("storage", { autoIncrement: true });
        }
      };

      request.onsuccess = (event: Event) => {
        db = (event.target as IDBOpenDBRequest).result;

        // Define a large chunk of data to store (1 MB)
        const dataChunk = new Array(1024 * 1024).fill("x").join(""); // 1 MB chunk
        let totalSize = 0;

        // Function to store data in multiple transactions
        const storeData = () => {
          const transaction = db.transaction("storage", "readwrite");
          const store = transaction.objectStore("storage");

          // Attempt to store the data chunk in IndexedDB
          try {
            store.add(dataChunk);
            totalSize += dataChunk.length;

            // Update current capacity state
            setCurrentCapacity(totalSize);

            transaction.oncomplete = () => {
              // Call storeData recursively to continue adding data
              storeData();
            };

            transaction.onerror = (e) => {
              // If an error occurs during transaction
              setError(
                `Transaction error: ${(e.target as IDBRequest).error?.message}`
              );
              setMaxCapacity(totalSize);
              db.close();
            };
          } catch (e) {
            // If an error occurs outside of transaction handling
            setMaxCapacity(totalSize);
            console.error("Reached storage limit:", e);
            db.close();
          }
        };

        // Start the recursive storage operation
        storeData();
      };

      request.onerror = (event: Event) => {
        setError(
          `IndexedDB error: ${
            (event.target as IDBOpenDBRequest).error?.message
          }`
        );
      };
    } catch (err) {
      setError(`Storage estimation failed: ${(err as Error).message}`);
    }
  };

  return (
    <div>
      <button onClick={estimateStorage}>Estimate Storage</button>
      {currentCapacity !== 0 && (
        <p>
          Current IndexedDB Storage Capacity:{" "}
          {(currentCapacity / (1024 * 1024)).toFixed(2)} MB
        </p>
      )}
      {maxCapacity && (
        <p>
          Max IndexedDB Storage Capacity:{" "}
          {(maxCapacity / (1024 * 1024)).toFixed(2)} MB
        </p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default EstimateIDBStorage;
