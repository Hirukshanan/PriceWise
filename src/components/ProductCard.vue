<script setup lang="ts" title="ProductCard.vue">
import type { Product } from '../types/product';

// Props definition with Strict Types 
defineProps<{
  product: Product
}>();
</script>


<template>
  <div class="bg-white p-3 md:p-5 rounded-2xl md:rounded-[2rem] border border-gray-100 shadow-sm flex flex-col h-full transition-all hover:shadow-md overflow-hidden group">
    
    <div class="h-32 md:h-44 flex items-center justify-center bg-gray-50 rounded-xl md:rounded-2xl mb-3 md:mb-4 p-2 relative group-hover:bg-blue-50/50 transition-colors">
      <img :src="product.thumbnail" :alt="product.title" loading="lazy" class="max-h-full max-w-full object-contain transform group-hover:scale-110 transition-transform duration-500" />
    </div>

    <div class="flex-grow">
      <h3 class="font-bold text-gray-800 leading-tight text-sm md:text-base line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
        {{ product.title }}
      </h3>
      <p class="text-[10px] md:text-[11px] text-gray-400 font-semibold uppercase tracking-wider truncate">
        {{ product.brand || 'Premium Brand' }}
      </p>
    </div>

    <div class="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-50 flex items-center justify-between">
      <span class="text-lg md:text-xl font-black text-blue-600">${{ product.price }}</span>
      <button class="bg-blue-600 text-white px-3 py-1.5 md:px-5 md:py-2 rounded-lg md:rounded-xl text-[10px] md:text-xs font-bold hover:bg-blue-700 transition-all active:scale-95 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300">
        Compare
      </button>
    </div>

  </div>
</template>