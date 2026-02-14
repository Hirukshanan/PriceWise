<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import Hero from '../components/Hero.vue';
import { type Product } from '../types/product';

/** * Component State Management
 * products: Stores the full list from API [cite: 6]
 * isLoading: Tracks the asynchronous fetch status [cite: 9]
 * searchQuery: Bound to the search input for real-time filtering 
 */
const products = ref<Product[]>([]);
const isLoading = ref(true);
const searchQuery = ref('');

/** * API Interaction logic
 * Fetches product data from DummyJSON [cite: 20]
 */
const loadProducts = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    products.value = data.products;
  } catch (err) {
    console.error("Critical: API connection failed", err);
  } finally {
    isLoading.value = false;
  }
};

/** * Search logic
 * Dynamically filters products based on the user's input 
 */
const filteredProducts = computed(() => {
  return products.value.filter(p => 
    p.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(() => {
  loadProducts();
});
</script>

<template>
  <main class="w-full">
    <Hero />
    
    <div class="max-w-[1600px] mx-auto px-8 md:px-16 pb-32">
      
      <div class="mb-20 flex justify-center -mt-16 relative z-30">
        <div class="w-full max-w-4xl bg-white p-4 rounded-[2.5rem] shadow-2xl flex items-center border border-gray-50">
          <span class="pl-6 text-3xl">🔍</span>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search for any product..." 
            class="w-full px-6 py-4 text-xl bg-transparent focus:outline-none"
          />
          <button class="bg-blue-600 text-white px-12 py-5 rounded-[1.8rem] font-bold text-lg">
            Search
          </button>
        </div>
      </div>

      <div v-if="!isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-12">
        <ProductCard 
          v-for="item in filteredProducts" 
          :key="item.id" 
          :product="item" 
        />
      </div>
    </div>
  </main>
</template>