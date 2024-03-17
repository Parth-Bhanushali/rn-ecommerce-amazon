import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: []
    },
    reducers: {
        addToCart: (state, action) => {
            const presentItem = state.cart.find(item => item.id === action.payload.id);
            if (presentItem) {
                presentItem.quantity++;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            const removed = state.cart.filter(item => item.id !== action.payload.id);
            state.cart = removed;
        },
        incrementQuantity: (state, action) => {
            const presentItem = state.cart.find(item => item.id === action.payload.id);
            if (presentItem) {
                presentItem.quantity++;
            }
        },
        decrementQuantity: (state, action) => {
            const presentItem = state.cart.find(item => item.id === action.payload.id);
            if (presentItem) {
                if (presentItem.quantity === 1) {
                    presentItem.quantity = 0;
    
                    const removed = state.cart.filter(item => item.id !== action.payload.id);
                    state.cart = removed;
                } else {
                    presentItem.quantity--;
                }
            }
        },
        cleanCart: (state, action) => {
            state.cart = []
        }
    }
})

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, cleanCart } = CartSlice.actions;
export default CartSlice.reducer;
