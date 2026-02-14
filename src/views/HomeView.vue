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
    
    <div class="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pb-24">
      
      <div class="mb-16 flex justify-center -mt-10 relative z-20">
        <div class="w-[90%] md:w-full max-w-2xl bg-white p-2 rounded-3xl shadow-2xl flex items-center">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search products..." 
            class="w-full px-5 py-3 rounded-2xl bg-transparent focus:outline-none"
          />
        </div>
      </div>

      <div v-if="!isLoading" 
           class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
        <ProductCard 
          v-for="item in filteredProducts" 
          :key="item.id" 
          :product="item" 
        />
      </div>
    </div>
  </main>
</template>