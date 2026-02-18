export interface Category {
    id: number;
    name: string;
    image: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    category: Category;
    quantity?: number;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface ApiError {
    message: string;
    status?: number;
}
