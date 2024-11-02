import Dexie, { Table } from "dexie";
import { v4 as uuidv4 } from "uuid";

// Define interfaces for each table
interface User {
  id: string;
  username: string;
  password: string;
  gmail?: string;
}

interface Product {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  price: {
    cost: number;
    sell: number;
  };
  VAT: {
    type: string;
    percentage: number;
  };
  quantity: {
    isCount: string;
    count: number;
  };
  category: string;
  description: string;
  lastModifiedDate: string;
  lastModified: number;
  uid: string;
}

interface Sale {
  id: string;
  productId: string;
  quantitySold: number;
  saleDate: string;
  total: number;
}

class iDBMS extends Dexie {
  users!: Table<User, string>;
  products!: Table<Product, string>;
  sales!: Table<Sale, string>;

  constructor() {
    super("iDBMS");
    this.version(1).stores({
      users: "id, username, password, gmail",
      products: "id, name.en, price, VAT, category, lastModified",
      sales: "id, productId, quantitySold, saleDate, total",
    });

    this.users.mapToClass(UserModel);
    this.products.mapToClass(ProductModel);
    this.sales.mapToClass(SaleModel);
  }
}

// Models with additional methods (optional)
class UserModel implements User {
  id = uuidv4();
  username = "";
  password = "";
  gmail? = "";
}

class ProductModel implements Product {
  id = uuidv4();
  name = { en: "", ar: "" };
  price = { cost: 0, sell: 0 };
  VAT = { type: "", percentage: 0 };
  quantity = { isCount: "", count: 0 };
  category = "";
  description = "";
  lastModifiedDate = new Date().toString();
  lastModified = Date.now();
  uid = uuidv4();
}

class SaleModel implements Sale {
  id = uuidv4();
  productId = "";
  quantitySold = 0;
  saleDate = new Date().toISOString();
  total = 0;
}

export const db = new iDBMS();
