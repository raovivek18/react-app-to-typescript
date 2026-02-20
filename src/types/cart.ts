import { Product } from './product';

export interface CartItem extends Product {
    quantity: number;
}

export type CartItemId = number;

export interface CartState {
    cartItems: CartItem[];
    totalQuantity: number;
    subtotal: number;
    tax: number;
    shipping: number;
    totalPrice: number;
}
