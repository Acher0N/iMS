/**
 * Cart Redux Slice
 * Manages shopping cart state and operations
 */

import { createSlice } from "@reduxjs/toolkit";
import { Decimal } from "decimal.js";

// Helper functions for cart calculations
const calculateItemTotal = (item) => {
  const quantity = new Decimal(item.quantity);
  const price = new Decimal(item.price);
  const discount = new Decimal(item.discount || 0);
  const tax = new Decimal(item.tax || 0);

  const subtotal = quantity.mul(price);
  const discountAmount = subtotal.mul(discount).div(100);
  const taxableAmount = subtotal.sub(discountAmount);
  const taxAmount = taxableAmount.mul(tax).div(100);

  return {
    subtotal: subtotal.toNumber(),
    discountAmount: discountAmount.toNumber(),
    taxAmount: taxAmount.toNumber(),
    total: taxableAmount.add(taxAmount).toNumber(),
  };
};

const calculateCartTotals = (items) => {
  let subtotal = new Decimal(0);
  let totalDiscount = new Decimal(0);
  let totalTax = new Decimal(0);
  let total = new Decimal(0);

  items.forEach((item) => {
    const itemCalc = calculateItemTotal(item);
    subtotal = subtotal.add(itemCalc.subtotal);
    totalDiscount = totalDiscount.add(itemCalc.discountAmount);
    totalTax = totalTax.add(itemCalc.taxAmount);
    total = total.add(itemCalc.total);
  });

  return {
    subtotal: subtotal.toNumber(),
    totalDiscount: totalDiscount.toNumber(),
    totalTax: totalTax.toNumber(),
    total: total.toNumber(),
    itemCount: items.length,
    totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
  };
};

// Initial state
const initialState = {
  items: [],
  customer: null,
  totals: {
    subtotal: 0,
    totalDiscount: 0,
    totalTax: 0,
    total: 0,
    itemCount: 0,
    totalQuantity: 0,
  },
  metadata: {
    createdAt: null,
    updatedAt: null,
    currency: "SAR",
    taxRate: 15, // Default VAT rate for Saudi Arabia
    discountType: "percentage", // 'percentage' | 'fixed'
    paymentMethod: null,
    notes: "",
  },
  status: {
    isLocked: false,
    isPending: false,
    isProcessing: false,
  },
  error: null,
};

// Cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Item management
    addItem: (state, action) => {
      const newItem = {
        id: action.payload.id || Date.now().toString(),
        productId: action.payload.productId,
        name: action.payload.name,
        price: action.payload.price,
        quantity: action.payload.quantity || 1,
        discount: action.payload.discount || 0,
        tax: action.payload.tax || state.metadata.taxRate,
        unit: action.payload.unit || "pcs",
        category: action.payload.category || "",
        description: action.payload.description || "",
        addedAt: new Date().toISOString(),
      };

      // Check if item already exists
      const existingItemIndex = state.items.findIndex(
        (item) => item.productId === newItem.productId
      );

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        state.items[existingItemIndex].quantity += newItem.quantity;
        state.items[existingItemIndex].updatedAt = new Date().toISOString();
      } else {
        // Add new item
        state.items.push(newItem);
      }

      // Recalculate totals
      state.totals = calculateCartTotals(state.items);
      state.metadata.updatedAt = new Date().toISOString();

      if (!state.metadata.createdAt) {
        state.metadata.createdAt = new Date().toISOString();
      }
    },

    removeItem: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      state.totals = calculateCartTotals(state.items);
      state.metadata.updatedAt = new Date().toISOString();
    },

    updateItemQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.items.find((item) => item.id === itemId);

      if (item && quantity > 0) {
        item.quantity = quantity;
        item.updatedAt = new Date().toISOString();
        state.totals = calculateCartTotals(state.items);
        state.metadata.updatedAt = new Date().toISOString();
      }
    },

    updateItemPrice: (state, action) => {
      const { itemId, price } = action.payload;
      const item = state.items.find((item) => item.id === itemId);

      if (item && price >= 0) {
        item.price = price;
        item.updatedAt = new Date().toISOString();
        state.totals = calculateCartTotals(state.items);
        state.metadata.updatedAt = new Date().toISOString();
      }
    },

    updateItemDiscount: (state, action) => {
      const { itemId, discount } = action.payload;
      const item = state.items.find((item) => item.id === itemId);

      if (item && discount >= 0) {
        item.discount = discount;
        item.updatedAt = new Date().toISOString();
        state.totals = calculateCartTotals(state.items);
        state.metadata.updatedAt = new Date().toISOString();
      }
    },

    // Customer management
    setCustomer: (state, action) => {
      state.customer = action.payload;
      state.metadata.updatedAt = new Date().toISOString();
    },

    removeCustomer: (state) => {
      state.customer = null;
      state.metadata.updatedAt = new Date().toISOString();
    },

    // Cart metadata
    updateMetadata: (state, action) => {
      state.metadata = { ...state.metadata, ...action.payload };
      state.metadata.updatedAt = new Date().toISOString();
    },

    setPaymentMethod: (state, action) => {
      state.metadata.paymentMethod = action.payload;
      state.metadata.updatedAt = new Date().toISOString();
    },

    setNotes: (state, action) => {
      state.metadata.notes = action.payload;
      state.metadata.updatedAt = new Date().toISOString();
    },

    // Cart operations
    clearCart: (state) => {
      state.items = [];
      state.customer = null;
      state.totals = initialState.totals;
      state.metadata = {
        ...initialState.metadata,
        currency: state.metadata.currency,
        taxRate: state.metadata.taxRate,
      };
      state.status = initialState.status;
      state.error = null;
    },

    lockCart: (state) => {
      state.status.isLocked = true;
    },

    unlockCart: (state) => {
      state.status.isLocked = false;
    },

    setPending: (state, action) => {
      state.status.isPending = action.payload;
    },

    setProcessing: (state, action) => {
      state.status.isProcessing = action.payload;
    },

    // Bulk operations
    bulkUpdateItems: (state, action) => {
      const updates = action.payload;
      updates.forEach((update) => {
        const item = state.items.find((item) => item.id === update.id);
        if (item) {
          Object.assign(item, update, { updatedAt: new Date().toISOString() });
        }
      });
      state.totals = calculateCartTotals(state.items);
      state.metadata.updatedAt = new Date().toISOString();
    },

    // Error handling
    setError: (state, action) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    // Recalculate totals (utility action)
    recalculateTotals: (state) => {
      state.totals = calculateCartTotals(state.items);
      state.metadata.updatedAt = new Date().toISOString();
    },
  },
});

export const {
  // Item management
  addItem,
  removeItem,
  updateItemQuantity,
  updateItemPrice,
  updateItemDiscount,

  // Customer management
  setCustomer,
  removeCustomer,

  // Cart metadata
  updateMetadata,
  setPaymentMethod,
  setNotes,

  // Cart operations
  clearCart,
  lockCart,
  unlockCart,
  setPending,
  setProcessing,

  // Bulk operations
  bulkUpdateItems,

  // Error handling
  setError,
  clearError,

  // Utility
  recalculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
