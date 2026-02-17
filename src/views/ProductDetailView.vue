<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useBestDeal } from '../composables/useBestDeal';
import type { Product } from '../types/product';

const route = useRoute();
const item = ref<Product | null>(null);

// Fetching a single product's data based on the URL ID [cite: 20]
onMounted(async () => {
  const productId = route.params.id;
  const res = await fetch(`https://dummyjson.com/products/${productId}`);
  item.value = await res.json();
});

// Using our custom composable to calculate the best price logic [cite: 27]
const getAnalysis = () => item.value ? useBestDeal(item.value) : null;
</script>

<template>
  <div v-if="item" class="max-w-6xl mx-auto py-20 px-10">
    <div class="bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row">
      <div class="md:w-1/2 p-10 bg-slate-50 flex items-center">
        <img :src="item.thumbnail" :alt="item.title" class="w-full rounded-3xl shadow-lg" />
      </div>

      <div class="md:w-1/2 p-12">
        <h2 class="text-4xl font-bold text-blue-950 mb-2">{{ item.title }}</h2>
        <p class="text-gray-500 mb-8">{{ item.description }}</p>

        <h4 class="font-bold text-sm uppercase tracking-widest text-black-400 mb-4">Price Comparison Analysis</h4>
        
        <div class="space-y-4">
          <div :class="['p-6 rounded-2xl border-2 transition', getAnalysis()?.bestSite.value === 'siteA' ? 'border-green-400 bg-green-50' : 'border-gray-100']">
            <div class="flex justify-between items-center">
              <span class="font-bold text-lg">Global Mart</span>
              <span v-if="getAnalysis()?.bestSite.value === 'siteA'" class="text-[10px] font-black bg-green-500 text-white px-3 py-1 rounded-full">BEST PRICE</span>
            </div>
            <p class="text-3xl font-bold mt-2">${{ getAnalysis()?.siteA.value.finalPrice }}</p>
          </div>

          <div :class="['p-6 rounded-2xl border-2 transition', getAnalysis()?.bestSite.value === 'siteB' ? 'border-green-400 bg-green-50' : 'border-gray-100']">
            <div class="flex justify-between items-center">
              <span class="font-bold text-lg">Local Express</span>
              <span v-if="getAnalysis()?.bestSite.value === 'siteB'" class="text-[10px] font-black bg-green-500 text-white px-3 py-1 rounded-full">BEST PRICE</span>
            </div>
            <p class="text-3xl font-bold mt-2">${{ getAnalysis()?.siteB.value.finalPrice }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>