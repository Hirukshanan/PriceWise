<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import { type Product } from '../types/product';
import { sharedData } from '../store';

const favouriteProducts = ref<Product[]>([]);
const isLoading = ref(true);

const loadFavourites = async () => {
  try {
    const ids = sharedData.favourites;

    // No favourites? Skip the network entirely.
    if (ids.length === 0) {
      favouriteProducts.value = [];
      return;
    }

    // Fetch only the products the user has favourited, in parallel.
    const results = await Promise.all(
      ids.map(id => fetch(`https://dummyjson.com/products/${id}`).then(r => r.json()))
    );

    favouriteProducts.value = results;
  } catch (error) {
    console.error('Failed to load favourites:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(loadFavourites);
</script>

<template>
  <div class="w-full mx-auto p-4 md:p-6 lg:p-8">

    <!-- Header -->
    <div class="mb-6 md:mb-8" style="padding-bottom: 1.5rem;">
      <h1 class="text-2xl md:text-2xl font-black text-gray-900 dark:text-white mb-2">
        My Favourites
      </h1>
      <p class="text-base md:text-lg text-gray-400 dark:text-gray-500" v-if="!isLoading">
        {{ favouriteProducts.length }} {{ favouriteProducts.length === 1 ? 'item' : 'items' }} saved
      </p>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="flex justify-center items-center h-48">
      <div class="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-blue-500"></div>
    </div>

    <!-- Favourited Products Grid -->
    <div v-else-if="favouriteProducts.length > 0" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-5">
      <ProductCard 
        v-for="item in favouriteProducts" 
        :key="item.id" 
        :product="item" 
        @click="$router.push(`/product/${item.id}`)"
        class="cursor-pointer"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="flex flex-col items-center justify-center py-20 text-gray-400 dark:text-gray-500 ">
      <span class="text-5xl mb-4">🤍</span>
      <p class="text-xl font-bold text-gray-600 dark:text-gray-300 mb-2">No favourites yet</p>
      <p class="text-base text-gray-400 dark:text-gray-500 mb-6">Start adding products you love!</p>
      <router-link 
        to="/" 
        class="bg-blue-600 text-white px-6 py-3 rounded-xl text-base font-bold hover:bg-blue-700 transition-all active:scale-95"
      >
        Browse Products
      </router-link>
    </div>

  </div>
</template>

<style scoped>
</style>
