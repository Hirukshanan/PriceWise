<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import { type Product } from '../types/product';
import { sharedData } from '../store';

const allProducts = ref<Product[]>([]);
const isLoading = ref(true);

const loadProducts = async () => {
  try {
    const res = await fetch('https://dummyjson.com/products?limit=0');
    const data = await res.json();
    allProducts.value = data.products;
  } catch (error) {
    console.error('Failed to load products:', error);
  } finally {
    isLoading.value = false;
  }
};

const favouriteProducts = computed(() => {
  return allProducts.value.filter(p => sharedData.favourites.includes(p.id));
});

onMounted(loadProducts);
</script>

<template>
  <div class="w-full mx-auto p-6 md:p-10 lg:p-14">

    <!-- Header -->
    <div class="mb-8 md:mb-12">
      <h1 class="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-2">
        My Favourites
      </h1>
      <p class="text-lg md:text-xl text-gray-400 dark:text-gray-500" v-if="!isLoading">
        {{ favouriteProducts.length }} {{ favouriteProducts.length === 1 ? 'item' : 'items' }} saved
      </p>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-gray-100 border-t-blue-600"></div>
    </div>

    <!-- Favourited Products Grid -->
    <div v-else-if="favouriteProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
      <ProductCard 
        v-for="item in favouriteProducts" 
        :key="item.id" 
        :product="item" 
        @click="$router.push(`/product/${item.id}`)"
        class="cursor-pointer"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="flex flex-col items-center justify-center py-24 text-gray-400 dark:text-gray-500">
      <span class="text-7xl mb-6">🤍</span>
      <p class="text-2xl font-bold text-gray-600 dark:text-gray-300 mb-2">No favourites yet</p>
      <p class="text-lg text-gray-400 dark:text-gray-500 mb-6">Start adding products you love!</p>
      <router-link 
        to="/" 
        class="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-blue-700 transition-all active:scale-95"
      >
        Browse Products
      </router-link>
    </div>

  </div>
</template>
