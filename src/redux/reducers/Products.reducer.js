import { createSlice } from "@reduxjs/toolkit";
import { round } from "lodash";
const VAT_PERCENTAGE = 0.15;

/*----------------------------------------
Auxiliary Functions
----------------------------------------*/

function calculateCartTotals(cart) {
  const total = round(
    cart.products.reduce((acc, item) => acc + item.total_price, 0),
    2
  );
  const estimatedVAT = round(total * VAT_PERCENTAGE, 2);
  return {
    subtotal: total - estimatedVAT,
    estimated_VAT: estimatedVAT,
    order_total: total,
  };
}

function finalCalc(cart) {
  const totals = calculateCartTotals(cart);
  cart.subtotal = totals.subtotal;
  cart.estimated_VAT = totals.estimated_VAT;
  cart.order_total = totals.order_total;
}

function resetCart(cart) {
  cart.products = [];
  cart.itemsInCart = 0;
  cart.subtotal = 0;
  cart.estimated_VAT = 0;
  cart.order_total = 0;
}

/*----------------------------------------
Main Reducer
----------------------------------------*/
export const ProductsSlice = createSlice({
  name: "Products",
  initialState: {
    products: [],
    categories: [],
    cart: {
      itemsInCart: 0,
      products: [],
      subtotal: 0,
      estimated_VAT: 0,
      discounts: 0,
      order_total: 0,
    },
    ui: {
      preview: false,
      edit: false,
      add: false,
    },
  },
  reducers: {
    /*-------------------------------------
      Product Actions
    --------------------------------------*/
    Product_Add_To_DB: (state, action) => {
      state.products.push(action.payload);
      // Only update categories when necessary
      state.categories = Array.from(new Set(state.products.map((item) => item.category)));
      if (!state.categories.includes("all")) state.categories.unshift("all");
    },

    Products_Import: (state, action) => {
      state.products.push(...action.payload);
      // Cache categories calculation
      state.categories = Array.from(new Set(state.products.map((item) => item.category)));
      if (!state.categories.includes("all")) state.categories.unshift("all");
    },

    Product_Update: (state, action) => {
      const product = state.products.find((item) => item.uid === action.payload.uid);
      if (product) {
        Object.assign(product, action.payload);
      }
    },

    Product_Delete: (state, action) => {
      state.products = state.products.filter((item) => item.uid !== action.payload);
    },

    /*--------------------------------------
         Cart Actions
    --------------------------------------*/
    Cart_Add_product: (state, action) => {
      const product = state.products.find((item) => item.uid === action.payload);
      if (!product || (product.quantity.isCount === "Count" && product.quantity.count === 0)) return;

      if (product.quantity.isCount === "Count") {
        product.quantity.count -= 1;
      }

      const cartItem = state.cart.products.find((item) => item.uid === action.payload);
      if (cartItem) {
        cartItem.quantity += 1;
        cartItem.total_price = round(cartItem.price * cartItem.quantity, 2);
        cartItem.total_VAT = round(cartItem.total_price * VAT_PERCENTAGE, 2);
      } else {
        state.cart.products.push({
          uid: product.uid,
          id: state.cart.products.length + 1,
          name: product.name,
          quantity: 1,
          price: round(product.price.sell, 2),
          price_without_VAT: round(product.price.sell - product.price.sell * VAT_PERCENTAGE, 2),
          total_price: round(product.price.sell, 2),
          VAT: round(product.price.sell * VAT_PERCENTAGE, 2),
          total_VAT: round(product.price.sell * VAT_PERCENTAGE, 2),
        });
      }

      finalCalc(state.cart);
    },

    Cart_Remove_Product: (state, action) => {
      const product = state.products.find((item) => item.uid === action.payload);
      const cartItem = state.cart.products.find((item) => item.uid === action.payload);

      if (!cartItem) return;

      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
        cartItem.total_price = round(cartItem.price * cartItem.quantity, 2);
        cartItem.total_VAT = round(cartItem.total_price * VAT_PERCENTAGE, 2);
      } else {
        state.cart.products = state.cart.products.filter((item) => item.uid !== action.payload);
      }

      if (product?.quantity.isCount === "Count") {
        product.quantity.count += 1;
      }

      finalCalc(state.cart);
    },

    Cart_Clear: (state) => {
      state.cart.products.forEach((cartItem) => {
        const product = state.products.find((p) => p.uid === cartItem.uid);
        if (product?.quantity.isCount === "Count") {
          product.quantity.count += cartItem.quantity;
        }
      });

      // Reset cart state
      resetCart(state.cart);
    },

    Cart_Checkout: (state) => {
      // Clear the cart and reset totals
      resetCart(state.cart);
    },
  },
});

export const {
  Product_Add_To_DB,
  Products_Import,
  Product_Update,
  Product_Delete,
  Cart_Add_product,
  Cart_Remove_Product,
  Cart_Clear,
  Cart_Checkout,
} = ProductsSlice.actions;
export default ProductsSlice.reducer;
