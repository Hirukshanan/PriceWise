// Product interface based on DummyJSON structure
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  brand: string;
  category: string;
  thumbnail: string;
  stock: number;
}

// Simulated Seller logic
export interface SellerOption {
  siteName: string;
  basePrice: number;
  shippingCost: number;
  finalPrice: number;
  isBestDeal: boolean;
}