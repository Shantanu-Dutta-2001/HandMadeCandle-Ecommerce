import api from './api';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

export interface Review {
    id: number;
    userName: string;
    content: string;
    rating: number;
    date: string;
}

export const reviewService = {
    getReviews: async (): Promise<Review[]> => {
        try {
            const response = await api.get(API_ENDPOINTS.REVIEWS.BASE);
            return response.data;
        } catch (error) {
            console.error("Error fetching reviews", error);
            throw error;
        }
    }
};
