import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../types";

export const clamp = (q: number, stock: number) => Math.max(1, Math.min(q, stock));

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Omit<CartItem, "quantity">>) {
      const found = state.items.find((i) => i.bookId === action.payload.bookId);
      if (found) {
        found.quantity = clamp(found.quantity + 1, found.stock);
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.bookId !== action.payload);
    },
    setQuantity(state, action: PayloadAction<{ bookId: number; quantity: number }>) {
      const found = state.items.find((i) => i.bookId === action.payload.bookId);
      if (found) {
        found.quantity = clamp(action.payload.quantity, found.stock);
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, setQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

