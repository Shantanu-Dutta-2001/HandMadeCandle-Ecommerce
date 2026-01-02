import api from './api';
import type { Product } from './mockData';

export const productService = {
    getAllProducts: async (): Promise<Product[]> => {
        try {
            const response = await api.get('/products');
            return response.data;
        } catch (error) {
            console.error("Error fetching products", error);
            throw error;
        }
    },

    getProductById: async (id: string): Promise<Product> => {
        try {
            const response = await api.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching product ${id}`, error);
            throw error;
        }
    }
};
