import api from './api';
import type { Product } from './mockData';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

export const productService = {
    getAllProducts: async (): Promise<Product[]> => {
        try {
            const response = await api.get(API_ENDPOINTS.PRODUCTS.BASE);
            return response.data;
        } catch (error) {
            console.error("Error fetching products", error);
            throw error;
        }
    },

    getProductById: async (id: string): Promise<Product> => {
        try {
            const response = await api.get(API_ENDPOINTS.PRODUCTS.GET_BY_ID(id));
            return response.data;
        } catch (error) {
            console.error(`Error fetching product ${id}`, error);
            throw error;
        }
    }
};
