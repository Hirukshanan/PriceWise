<script setup lang="ts" title="ProductCard.vue">
import type { Product } from '../types/product';

// Props definition with Strict Types 
defineProps<{
  product: Product
}>();
</script>


<template>
  <div class="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white">
    <img :src="product.thumbnail" :alt="product.title" loading="lazy" class="w-full h-48 object-cover rounded-md mb-4" />
    
    <h3 class="font-bold text-lg truncate">{{ product.title }}</h3>
    <p class="text-gray-500 text-sm mb-2">{{ product.brand }}</p>
    <div class="flex justify-between items-center">
      <span class="text-xl font-bold text-blue-600">${{ product.price }}</span>
      <button class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
        Compare
      </button>
    </div>
  </div>
</template>