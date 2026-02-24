// Domain entities representing the core business models

export interface Category {
    id: number;
    name: string;
    image: string;
    creationAt?: string;
    updatedAt?: string;
}

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    category: Category;
    creationAt?: string;
    updatedAt?: string;
}

export type UserRole = 'admin' | 'customer';

export interface User {
    id: number;
    email: string;
    password?: string;
    name: string;
    role: UserRole;
    avatar: string;
    creationAt?: string;
    updatedAt?: string;
}

/**
 * Utility Type: CartItem
 * Using intersection to add quantity to Product
 */
export type CartItem = Product & {
    quantity: number;
};

export type CartItemId = Product['id'];
