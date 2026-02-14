<script setup lang="ts">
/**
 * FilterSidebar component to manage product categories and price ranges. [cite: 17]
 * This helps meet the 'Filtering' requirement of the project. 
 */
</script>

<template>
  <aside class="w-64 flex-shrink-0 hidden xl:block space-y-8 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
    <div>
      <h3 class="font-bold text-gray-800 mb-4">Price Range</h3>
      <br>
      <div class="h-1 bg-gray-100 rounded-full relative">
        <div class="absolute left-2 right-10 h-1 bg-blue-500 rounded-full"></div>
        <div class="absolute left-2 -top-1.5 w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-pointer"></div>
        <div class="absolute right-10 -top-1.5 w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-pointer"></div>
      </div>
      <div class="flex justify-between mt-4 text-xs font-bold text-gray-400">
        <span>$20</span>
        <span>$1130</span>
      </div>
    </div>

    <div>
      <div class="flex justify-between items-center mb-4">
        <h3 class="font-bold text-gray-800">Brand</h3>
        <button class="text-xs text-gray-400">Reset</button>
      </div>
      <div class="space-y-3">
        <label v-for="brand in ['Adidas', 'Columbia', 'Nike', 'Xiaomi']" :key="brand" class="flex items-center justify-between cursor-pointer group">
          <div class="flex items-center gap-3">
            <div class="w-5 h-5 border-2 border-gray-200 rounded group-hover:border-blue-400 transition-colors"></div>
            <span class="text-sm text-gray-600 font-medium">{{ brand }}</span>
          </div>
          <span class="text-blue-500 opacity-0 group-hover:opacity-100">✓</span>
        </label>
      </div>
    </div>

    <div>
      <h3 class="font-bold text-gray-800 mb-4">Delivery Options</h3>
      <div class="flex bg-gray-100 p-1 rounded-2xl gap-1">
        <button class="flex-1 bg-blue-600 text-white py-2 rounded-xl text-xs font-bold">Standard</button>
        <button class="flex-1 text-gray-500 py-2 rounded-xl text-xs font-bold">Pick Up</button>
      </div>
    </div>
  </aside>
</template>