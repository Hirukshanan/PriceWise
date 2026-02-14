import { computed } from 'vue';
import type { Product, SellerOption } from '../types/product';

export function useBestDeal(product: Product) {
  const siteA = computed<SellerOption>(() => {
    const basePrice = product.price;
    const shipping = 0;
    return {
      siteName: "Global Mart",
      basePrice,
      shippingCost: shipping,
      finalPrice: basePrice + shipping,
      isBestDeal: false
    };
  });

  const siteB = computed<SellerOption>(() => {
    // Applying the discount for Site B logic
    const basePrice = product.price * (1 - product.discountPercentage / 100);
    const shipping = 5.99;
    return {
      siteName: "Local Express",
      basePrice: Number(basePrice.toFixed(2)),
      shippingCost: shipping,
      finalPrice: Number((basePrice + shipping).toFixed(2)),
      isBestDeal: false
    };
  });

  const bestSite = computed(() => 
    siteA.value.finalPrice < siteB.value.finalPrice ? 'siteA' : 'siteB'
  );

  return { siteA, siteB, bestSite };
}