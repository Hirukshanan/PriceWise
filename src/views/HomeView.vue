<script setup lang="ts">
import { ref, onMounted } from 'vue';
import FilterSidebar from '../components/FilterSidebar.vue';
import ProductCard from '../components/ProductCard.vue';
import { type Product } from '../types/product';

const products = ref<Product[]>([]);
const isLoading = ref(true);

const loadData = async () => {
  try {
    const res = await fetch('https://dummyjson.com/products');
    const data = await res.json();
    products.value = data.products;
  } finally {
    isLoading.value = false;
  }
};

onMounted(loadData);
</script>

<template>
  <div class="max-w-[1600px] mx-auto flex flex-row gap-8 p-6 lg:p-10">
    
    <FilterSidebar class="hidden xl:block" />

    <div class="flex-1 overflow-hidden">
      
      <div class="flex items-center gap-4 mb-10 overflow-x-auto pb-2">
        <button v-for="cat in ['All Categories', 'Deals', 'Crypto', 'Sport']" :key="cat"
          class="px-6 py-2 bg-white rounded-full border border-gray-100 text-sm font-bold text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition">
          {{ cat }}
        </button>
      </div>

      <div v-if="!isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProductCard 
          v-for="item in products" 
          :key="item.id" 
          :product="item" 
        />
      </div>

      <div v-else class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>

    </div>
  </div>
</template>