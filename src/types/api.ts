export interface ApiError {
    message: string;
    error?: string;
    statusCode?: number;
    status?: number; // Added for backward compatibility
}

export type ApiResponse<T> = T;
