// Stored alert entry — only IDs and user-set target price
export interface StoredAlert {
    productId: number;
    targetPrice: number;
}

// Full alert with product data fetched from API
export interface PriceAlert {
    productId: number;
    title: string;
    thumbnail: string;
    currentPrice: number;
    targetPrice: number;
    stock: number;
    status: 'monitoring' | 'dropped' | 'out-of-stock';
}
