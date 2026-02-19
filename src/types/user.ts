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
