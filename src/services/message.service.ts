import api from './api';

export interface MessageData {
    name: string;
    email: string;
    subject: string;
    body: string;
}

export const messageService = {
    sendMessage: async (data: MessageData) => {
        try {
            await api.post('/messages', data);
        } catch (error) {
            console.error("Error sending message", error);
            throw error;
        }
    }
};
