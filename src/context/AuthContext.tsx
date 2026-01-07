import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';
import api from '../services/api';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<User>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    // Check for stored user on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
            const { token, user } = response.data;

            const userData = { ...user, token };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return userData;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            await api.post(API_ENDPOINTS.AUTH.REGISTER, { name, email, password });
            // Auto login after register or redirect to login (Backend returns Id/Message).  
            // Let's assume user needs to login or we can auto-login if backend returned token. 
            // My AuthController returns { Id, Message }. So user must login.
            // But for seamless UX, maybe we should auto-login? 
            // For now, let's just allow the flow to proceed. 
            // The UI calls register then navigates to dashboard. 
            // If we don't set user, dashboard might redirect back to login? 
            // Let's actually auto-login immediately after register in the UI or ask user to login.
            // Or better, let's call login internally here.
            await login(email, password);
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
