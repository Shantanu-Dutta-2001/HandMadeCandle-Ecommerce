export interface Address {
    id?: number;
    userId?: number;
    name: string;
    addressLine: string;
    city: string;
    zip: string;
    phone: string;
    isDefault: boolean;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    addresses?: Address[];
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    rating: number;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface OrderItem {
    id: number;
    orderId: number;
    productId: number;
    productName: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: number;
    userId: number;
    total: number;
    status: string;
    date: string;
    paymentMethod: string;
    shippingName: string;
    shippingAddress: string;
    shippingCity: string;
    shippingZip: string;
    shippingPhone: string;
    items: OrderItem[];
    feedback?: OrderFeedback;
    Feedback?: OrderFeedback;
}

export interface OrderFeedback {
    id: number;
    orderId: number;
    userId: number;
    rating: number;
    message: string;
    date: string;
    // PascalCase support
    Rating?: number;
    Message?: string;
    Date?: string;
}

export interface Message {
    id: number;
    name: string;
    email: string;
    subject: string;
    body: string;
    createdAt: string;
}

export interface DashboardStats {
    totalRevenue: number;
    totalOrders: number;
    statusBreakdown: { status: string; count: number }[];
}

export const _moduleType = 'types';
