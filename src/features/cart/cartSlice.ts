import { createSlice, PayloadAction, Middleware } from '@reduxjs/toolkit';
import { Product, CartItem } from '../../types';
import { RootState } from '../../app/store';

export interface CartState {
    cartItems: CartItem[];
    totalQuantity: number;
    totalPrice: number;
}

// Helper to load cart from LocalStorage
const loadCartFromStorage = (): CartState | undefined => {
    try {
        const serializedState = localStorage.getItem('cart');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.warn("Failed to load cart from LocalStorage:", err);
        return undefined;
    }
};

const initialState: CartState = loadCartFromStorage() || {
    cartItems: [],
    totalQuantity: 0,
    totalPrice: 0,
};

const updateTotals = (state: CartState) => {
    state.totalQuantity = state.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    state.totalPrice = state.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingItem = state.cartItems.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
            updateTotals(state);
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
            updateTotals(state);
        },
        increaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.cartItems.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
                updateTotals(state);
            }
        },
        decreaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.cartItems.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else {
                state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
            }
            updateTotals(state);
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart
} = cartSlice.actions;

// Middleware to sync cart state to LocalStorage
export const cartMiddleware: Middleware = (store) => next => action => {
    const result = next(action);
    if (typeof action === 'object' && action !== null && 'type' in action && (action as { type: string }).type.startsWith('cart/')) {
        const cartState = (store.getState() as { cart: CartState }).cart;
        try {
            localStorage.setItem('cart', JSON.stringify(cartState));
        } catch (err) {
            console.warn("Failed to save cart to LocalStorage:", err);
        }
    }
    return result;
};

export default cartSlice.reducer;
