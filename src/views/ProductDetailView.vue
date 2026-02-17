<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const product = ref<any>(null);
const isLoading = ref(true);

// 1. Generate 5 Dummy Stores with different data
const stores = ref([
  { name: 'Amazon', price: 0, rating: 4.8, shipping: 0, delivery: '2 Days' },
  { name: 'eBay', price: 0, rating: 4.2, shipping: 5.99, delivery: '5 Days' },
  { name: 'Walmart', price: 0, rating: 4.5, shipping: 2.50, delivery: '3 Days' },
  { name: 'Target', price: 0, rating: 4.6, shipping: 0, delivery: '4 Days' },
  { name: 'BestBuy', price: 0, rating: 4.7, shipping: 10.00, delivery: '1 Day' },
]);

onMounted(async () => {
  const res = await fetch(`https://dummyjson.com/products/${route.params.id}`);
  const data = await res.json();
  product.value = data;
  
  // Assigning prices based on the original product price
  stores.value = stores.value.map(s => ({
    ...s,
    price: +(data.price * (0.9 + Math.random() * 0.2)).toFixed(2) // Random price variation
  }));
  
  isLoading.value = false;
});

// 2. Logic to decide "Best Sites"
const bestSites = computed(() => {
  // Sorting to find best rating and lowest shipping
  const sortedByRating = [...stores.value].sort((a, b) => b.rating - a.rating);
  const sortedByShipping = [...stores.value].sort((a, b) => a.shipping - b.shipping);
  
  return [
    { ...sortedByRating[0], tag: 'Top Rated' },
    { ...sortedByShipping[0], tag: 'Best Shipping' }
  ];
});
</script>

<template>
  <div v-if="!isLoading" class="max-w-6xl mx-auto p-4 md:p-6 lg:p-12 space-y-8 md:space-y-12">
    
    <div class="flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-gray-100">
      <img :src="product.thumbnail" class="w-full md:w-1/3 rounded-2xl md:rounded-3xl object-contain bg-gray-50 p-4" />
      <div class="flex-1 space-y-3 md:space-y-4 text-center md:text-left">
        <h1 class="text-2xl md:text-4xl font-black text-gray-900 leading-tight">{{ product.title }}</h1>
        <p class="text-gray-500 text-base md:text-lg">{{ product.description }}</p>
        <div class="text-2xl md:text-3xl font-bold text-blue-600 my-2">${{ product.price }}</div>
      </div>
    </div>

    <div class="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-6 md:p-8 border-b border-gray-50 bg-gray-50/50">
        <h2 class="text-xl md:text-2xl font-bold text-gray-800">Marketplace Comparison</h2>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left min-w-[600px]">
          <thead class="bg-gray-50 text-gray-400 text-xs md:text-sm uppercase">
            <tr>
              <th class="px-4 md:px-8 py-3 md:py-4">Store Name</th>
              <th class="px-4 md:px-8 py-3 md:py-4">Price</th>
              <th class="px-4 md:px-8 py-3 md:py-4">Rating</th>
              <th class="px-4 md:px-8 py-3 md:py-4">Shipping</th>
              <th class="px-4 md:px-8 py-3 md:py-4">Delivery</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="s in stores" :key="s.name" class="hover:bg-blue-50/30 transition-colors">
              <td class="px-4 md:px-8 py-4 md:py-6 font-bold text-gray-800">{{ s.name }}</td>
              <td class="px-4 md:px-8 py-4 md:py-6 font-black text-blue-600">${{ s.price }}</td>
              <td class="px-4 md:px-8 py-4 md:py-6 text-orange-500 font-bold">⭐ {{ s.rating }}</td>
              <td class="px-4 md:px-8 py-4 md:py-6 text-gray-600">{{ s.shipping === 0 ? 'FREE' : '$' + s.shipping }}</td>
              <td class="px-4 md:px-8 py-4 md:py-6 text-gray-500">{{ s.delivery }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="space-y-6">
      <h2 class="text-xl md:text-2xl font-bold text-gray-800 px-2">Our Best Recommendations</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div v-for="site in bestSites" :key="site.name" 
             class="relative bg-blue-600 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] text-white shadow-xl shadow-blue-100 overflow-hidden">
          <span class="absolute top-6 right-6 md:right-8 bg-white/20 px-3 md:px-4 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest">
            {{ site.tag }}
          </span>
          <h3 class="text-2xl md:text-3xl font-black mb-2">{{ site.name }}</h3>
          <div class="space-y-1 opacity-90 mb-6 text-sm md:text-base">
            <p>Rating: {{ site.rating }} / 5.0</p>
            <p>Shipping: {{ site.shipping === 0 ? 'Free Shipping' : '$' + site.shipping }}</p>
            <p>Delivery: Within {{ site.delivery }}</p>
          </div>
          <div class="flex items-center justify-between pt-4 border-t border-white/10">
            <span class="text-2xl md:text-3xl font-bold">${{ site.price }}</span>
            <button class="bg-white text-blue-600 px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl font-bold hover:bg-gray-100 transition text-sm md:text-base">
              Go to Store
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>

  <div v-else class="h-screen flex items-center justify-center">
    <div class="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
  </div>
</template>