import { createSlice, PayloadAction, Middleware } from '@reduxjs/toolkit';
import { Product, CartItem, CartState, CartItemId } from '../../types';
import { loadFromStorage } from '../../utils/storage';
import { isCartState } from '../../utils/typeGuards';

// Helper to compute totals safely
const calculateTotals = (items: CartItem[]): Pick<CartState, 'totalQuantity' | 'subtotal' | 'tax' | 'shipping' | 'totalPrice'> => {
    const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // For this implementation, shipping is free and tax is included in price
    const taxRate = 0;
    const tax = subtotal * taxRate;
    const shipping = 0;

    // Ensure precision by rounding to 2 decimal places
    const totalPrice = Number((subtotal + tax + shipping).toFixed(2));

    return {
        totalQuantity,
        subtotal: Number(subtotal.toFixed(2)),
        tax: Number(tax.toFixed(2)),
        shipping,
        totalPrice
    };
};


// Helper to load cart from LocalStorage
const loadCartFromStorage = (): CartState | undefined => {
    return loadFromStorage<CartState>('cart', isCartState);
};

const initialState: CartState = loadCartFromStorage() || {
    cartItems: [],
    totalQuantity: 0,
    subtotal: 0,
    tax: 0,
    shipping: 0,
    totalPrice: 0,
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

            const totals = calculateTotals(state.cartItems);
            state.totalQuantity = totals.totalQuantity;
            state.subtotal = totals.subtotal;
            state.tax = totals.tax;
            state.shipping = totals.shipping;
            state.totalPrice = totals.totalPrice;
        },
        removeFromCart: (state, action: PayloadAction<CartItemId>) => {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
            const totals = calculateTotals(state.cartItems);
            state.totalQuantity = totals.totalQuantity;
            state.subtotal = totals.subtotal;
            state.tax = totals.tax;
            state.shipping = totals.shipping;
            state.totalPrice = totals.totalPrice;
        },
        increaseQuantity: (state, action: PayloadAction<CartItemId>) => {
            const item = state.cartItems.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
                const totals = calculateTotals(state.cartItems);
                state.totalQuantity = totals.totalQuantity;
                state.subtotal = totals.subtotal;
                state.tax = totals.tax;
                state.shipping = totals.shipping;
                state.totalPrice = totals.totalPrice;
            }
        },
        decreaseQuantity: (state, action: PayloadAction<CartItemId>) => {
            const item = state.cartItems.find(item => item.id === action.payload);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
                }
                const totals = calculateTotals(state.cartItems);
                state.totalQuantity = totals.totalQuantity;
                state.subtotal = totals.subtotal;
                state.tax = totals.tax;
                state.shipping = totals.shipping;
                state.totalPrice = totals.totalPrice;
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.totalQuantity = 0;
            state.subtotal = 0;
            state.tax = 0;
            state.shipping = 0;
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
export const cartMiddleware: Middleware<{}, { cart: CartState }> = (store) => next => action => {
    const result = next(action);
    if (typeof action === 'object' && action !== null && 'type' in action && (action as { type: string }).type.startsWith('cart/')) {
        const cartState = store.getState().cart;
        try {
            localStorage.setItem('cart', JSON.stringify(cartState));
        } catch (err) {
            console.warn("Failed to save cart to LocalStorage:", err);
        }
    }
    return result;
};

export default cartSlice.reducer;
