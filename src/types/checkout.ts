export interface CheckoutFormData {
    fullName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
    // Keeping payment fields for complete functionality
    cardNumber: string;
    expiryDate: string;
    cvv: string;
}
