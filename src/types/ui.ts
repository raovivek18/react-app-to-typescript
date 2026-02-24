// UI and Form related types

export interface CheckoutFormData {
    fullName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
}

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
    id: number;
    message: string;
    type: ToastType;
    closing?: boolean;
}

export type ProductParams = {
    id: string;
};
