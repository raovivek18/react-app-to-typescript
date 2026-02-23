import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { Product, ApiError } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.escuelajs.co/api/v1';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError<ApiError>) => {
        const customError: ApiError = {
            message: error.response?.data?.message || error.message || 'An unknown error occurred',
            status: error.response?.status,
            statusCode: error.response?.status
        };
        return Promise.reject(customError);
    }
);

export const getAllProducts = async (): Promise<Product[]> => {
    try {
        const response = await apiClient.get<Product[]>('/products');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getProductById = async (id: string | number): Promise<Product> => {
    try {
        const response = await apiClient.get<Product>(`/products/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default apiClient;

