import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAllProducts, getProductById } from '../../services/api';
import { Product } from '../../types';
import type { RootState } from '../../app/store';

export const fetchProducts = createAsyncThunk<Product[], void, { state: RootState; rejectValue: string }>(
    'products/fetchProducts',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { products } = getState().products;

            if (products.length > 0) {
                return products;
            }

            const data = await getAllProducts();
            return data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
        }
    }
);

export const fetchProductById = createAsyncThunk<Product, string | number, { state: RootState; rejectValue: string }>(
    'products/fetchProductById',
    async (id, { getState, rejectWithValue }) => {
        try {
            const { products } = getState().products;

            const existingProduct = products.find((p: Product) => p.id === (typeof id === 'string' ? parseInt(id) : id));
            if (existingProduct) {
                return existingProduct;
            }

            const data = await getProductById(id);
            return data;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
        }
    }
);

export interface ProductsState {
    products: Product[];
    selectedProduct: Product | null;
    loading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    products: [],
    selectedProduct: null,
    loading: false,
    error: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearSelectedProduct: (state) => {
            state.selectedProduct = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message || 'Failed to fetch products';
            })
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message || 'Failed to fetch product details';
            });
    },
});

export const { clearSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;

