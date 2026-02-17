<script setup lang="ts" title="ProductCard.vue">
import type { Product } from '../types/product';

// Props definition with Strict Types 
defineProps<{
  product: Product
}>();
</script>


<template>
  <div class="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col h-full transition-all hover:shadow-md overflow-hidden">
    
    <div class="h-44 flex items-center justify-center bg-gray-50 rounded-2xl mb-4 p-2">
      <img :src="product.thumbnail" :alt="product.title" loading="lazy" class="max-h-full max-w-full object-contain" />
    </div>

    <div class="flex-grow">
      <h3 class="font-bold text-gray-800 leading-tight text-base line-clamp-2 mb-1">
        {{ product.title }}
      </h3>
      <p class="text-[11px] text-gray-400 font-semibold uppercase tracking-wider truncate">
        {{ product.brand || 'Premium Brand' }}
      </p>
    </div>

    <div class="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
      <span class="text-xl font-black text-blue-600">${{ product.price }}</span>
      <button class="bg-blue-600 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all active:scale-95">
        Compare
      </button>
    </div>

  </div>
</template>