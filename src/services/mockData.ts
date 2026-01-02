export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    rating: number;
}

export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered';
    date: string;
    paymentMethod: 'COD';
}

export interface CartItem extends Product {
    quantity: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
}

export const PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Vanilla Dreams',
        description: 'Calming vanilla scent with hints of sweet cream. Perfect for relaxation.',
        price: 14.00,
        image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=600&auto=format&fit=crop', // Vanilla/White candle
        category: 'Relaxation',
        rating: 4.8
    },
    {
        id: '2',
        name: 'Lavender Peace',
        description: 'French lavender with chamomile to soothe your senses.',
        price: 18.00,
        image: 'https://images.unsplash.com/photo-1547796068-067f082e0d3c?q=80&w=600&auto=format&fit=crop', // Lavender/Purple element
        category: 'Relaxation',
        rating: 4.5
    },
    {
        id: '3',
        name: 'Citrus Sunrise',
        description: 'Energizing orange blossom and bergamot blend.',
        price: 16.00,
        image: 'https://images.unsplash.com/photo-1572016252981-d2f2cb6960ae?q=80&w=600&auto=format&fit=crop', // Citrus/Orange/Yellow
        category: 'Energy',
        rating: 4.9
    },
    {
        id: '4',
        name: 'Cozy Cabin',
        description: 'Warm sandalwood and amber notes for a rustic feel.',
        price: 20.00,
        image: 'https://images.unsplash.com/photo-1608181114410-db2bb411e527?q=80&w=600&auto=format&fit=crop', // Wood/Darker
        category: 'Luxury',
        rating: 4.7
    }
];

export const MOCK_USER: User = {
    id: 'u1',
    name: 'John Doe',
    email: 'john@example.com'
};

export const MOCK_ORDERS: Order[] = [
    {
        id: 'ord_001',
        userId: 'u1',
        items: [
            { ...PRODUCTS[0], quantity: 2 },
            { ...PRODUCTS[1], quantity: 1 }
        ],
        total: 46.00,
        status: 'delivered',
        date: '2025-11-15',
        paymentMethod: 'COD'
    },
    {
        id: 'ord_002',
        userId: 'u1',
        items: [
            { ...PRODUCTS[2], quantity: 1 }
        ],
        total: 16.00,
        status: 'processing',
        date: '2025-12-10',
        paymentMethod: 'COD'
    }
];
