<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ProductCard from './components/ProductCard.vue';
import { type Product } from './types/product';

const products = ref<Product[]>([]);
const loading = ref(true);

// Fetching data from DummyJSON [cite: 9, 20]
const fetchProducts = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    products.value = data.products;
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <header class="mb-8 text-center">
      <h1 class="text-4xl font-bold text-blue-900">PriceWise</h1>
      <p class="text-gray-600">Smart Price Comparison SPA</p>
    </header>

    <div v-if="loading" class="text-center">Loading products...</div>
    
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard 
        v-for="product in products" 
        :key="product.id" 
        :product="product" 
      />
    </div>
  </div>
</template>