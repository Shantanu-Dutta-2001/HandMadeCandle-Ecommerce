/**
 * Centralized API endpoint constants for the application.
 */
export const API_ENDPOINTS = {
    // Auth endpoints
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
    },
    // Product endpoints
    PRODUCTS: {
        BASE: '/products',
        GET_BY_ID: (id: string) => `/products/${id}`,
    },
    // Message/Contact endpoints
    MESSAGES: {
        SEND: '/messages',
    },
    // Review endpoints
    REVIEWS: {
        BASE: '/reviews',
    },
};

export const API_CONFIG = {
    // This will be used by Axios baseURL. 
    // In production (Vercel), it should be '/api' to use the proxy.
    // In development, it can be adjusted as needed.
    BASE_URL: '/api',
};
