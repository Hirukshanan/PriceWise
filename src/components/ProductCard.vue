<script setup lang="ts" title="ProductCard.vue">
import type { Product } from '../types/product';
import { toggleFavourite, isFavourite } from '../store';

// Props definition with Strict Types 
defineProps<{
  product: Product
}>();

const onFavouriteClick = (e: Event, id: number) => {
  e.stopPropagation();
  toggleFavourite(id);
};
</script>


<template>
  <div class="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col h-full transition-all hover:shadow-lg hover:-translate-y-1 overflow-hidden group relative">
    
    <div class="h-48 flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 rounded-xl mb-4 p-4 relative group-hover:bg-blue-100/50 dark:group-hover:bg-gray-700 transition-colors">
      <img :src="product.thumbnail" :alt="product.title" loading="lazy" class="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500" />
      
      <!-- Favourite Heart Button -->
      <button 
        @click="onFavouriteClick($event, product.id)"
        class="absolute top-2 right-2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110 active:scale-95"
        :title="isFavourite(product.id) ? 'Remove from favourites' : 'Add to favourites'"
      >
        <span class="text-sm transition-transform duration-300" :class="isFavourite(product.id) ? 'scale-110' : 'scale-100'">
          {{ isFavourite(product.id) ? '❤️' : '🤍' }}
        </span>
      </button>
    </div>

    <div class="grow flex flex-col justify-between">
      <div>
        <h3 class="font-semibold text-gray-800 dark:text-white text-sm line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
          {{ product.title }}
        </h3>
        <p class="text-[10px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider truncate mb-2">
          {{ product.brand || 'Premium Brand' }}
        </p>
      </div>
      
      <div class="mt-2 pt-2 flex items-center justify-between">
        <span class="text-lg font-bold text-blue-600">${{ product.price }}</span>
        <button class="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 transition-all active:scale-95 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 duration-300">
          Compare
        </button>
      </div>
    </div>

  </div>
</template>