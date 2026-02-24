import { Product, User, CartItem } from './domain';

// Redux State Interfaces

export interface ProductsState {
    products: Product[];
    selectedProduct: Product | null;
    loading: boolean;
    error: string | null;
}

export interface UserState {
    isAuthenticated: boolean;
    userInfo: User | null;
}

export interface CartState {
    cartItems: CartItem[];
    totalQuantity: number;
    subtotal: number;
    tax: number;
    shipping: number;
    totalPrice: number;
}
