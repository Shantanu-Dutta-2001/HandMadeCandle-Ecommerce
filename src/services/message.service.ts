import api from './api';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

export interface MessageData {
    name: string;
    email: string;
    subject: string;
    body: string;
}

export const messageService = {
    sendMessage: async (data: MessageData) => {
        try {
            await api.post(API_ENDPOINTS.MESSAGES.SEND, data);
        } catch (error) {
            console.error("Error sending message", error);
            throw error;
        }
    }
};
