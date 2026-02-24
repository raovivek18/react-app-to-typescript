import { Product, Category, CartItem, CartState, ProductParams } from '../types';

export const isCategory = (data: any): data is Category => {
    return (
        typeof data === 'object' &&
        data !== null &&
        typeof data.id === 'number' &&
        typeof data.name === 'string' &&
        typeof data.image === 'string'
    );
};

export const isProduct = (data: any): data is Product => {
    return (
        typeof data === 'object' &&
        data !== null &&
        typeof data.id === 'number' &&
        typeof data.title === 'string' &&
        typeof data.price === 'number' &&
        typeof data.description === 'string' &&
        Array.isArray(data.images) &&
        data.images.every((img: any) => typeof img === 'string') &&
        isCategory(data.category)
    );
};

export const isCartItem = (data: any): data is CartItem => {
    return (
        isProduct(data) &&
        typeof (data as any).quantity === 'number' &&
        (data as any).quantity > 0
    );
};

export const isCartState = (data: any): data is CartState => {
    return (
        typeof data === 'object' &&
        data !== null &&
        Array.isArray(data.cartItems) &&
        data.cartItems.every(isCartItem) &&
        typeof data.totalQuantity === 'number' &&
        typeof data.subtotal === 'number' &&
        typeof data.tax === 'number' &&
        typeof data.shipping === 'number' &&
        typeof data.totalPrice === 'number'
    );
};

export const isValidProductParams = (params: any): params is ProductParams => {
    if (!params || typeof params.id !== 'string') return false;
    const num = parseInt(params.id);
    return !isNaN(num) && num > 0;
};

export const isTheme = (data: any): data is 'light' | 'dark' => {
    return data === 'light' || data === 'dark';
};
