<script setup lang="ts" title="ProductCard.vue">
import type { Product } from '../types/product';

// Props definition with Strict Types 
defineProps<{
  product: Product
}>();
</script>


<template>
  <div class="bg-white p-7 md:p-10 rounded-2xl md:rounded-[2rem] border border-gray-100 shadow-sm flex flex-col h-full transition-all hover:shadow-lg hover:-translate-y-1 overflow-hidden group">
    
    <div class="h-60 md:h-72 flex items-center justify-center bg-gray-50 rounded-xl md:rounded-2xl mb-6 md:mb-8 p-6 relative group-hover:bg-blue-50/50 transition-colors">
      <img :src="product.thumbnail" :alt="product.title" loading="lazy" class="max-h-full max-w-full object-contain transform group-hover:scale-110 transition-transform duration-500" />
    </div>

    <div class="flex-grow">
      <h3 class="font-bold text-gray-800 leading-snug text-xl md:text-2xl line-clamp-2 mb-3 group-hover:text-blue-600 transition-colors">
        {{ product.title }}
      </h3>
      <p class="text-base md:text-lg text-gray-400 font-semibold uppercase tracking-wider truncate">
        {{ product.brand || 'Premium Brand' }}
      </p>
    </div>

    <div class="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-100 flex items-center justify-between">
      <span class="text-3xl md:text-4xl font-black text-blue-600">${{ product.price }}</span>
      <button class="bg-blue-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl text-base md:text-lg font-bold hover:bg-blue-700 transition-all active:scale-95 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300">
        Compare
      </button>
    </div>

  </div>
</template>