<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { addAlert, removeAlert, hasAlert, sharedData, addToHistory } from '../store';

const route = useRoute();
const product = ref<any>(null);
const isLoading = ref(true);

// Price alert state
const showAlertInput = ref(false);
const alertTargetPrice = ref(0);

const productId = computed(() => Number(route.params.id));
const isAlertSet = computed(() => hasAlert(productId.value));

const toggleAlertInput = () => {
  if (isAlertSet.value) {
    removeAlert(productId.value);
  } else {
    alertTargetPrice.value = product.value ? Math.floor(product.value.price * 0.85) : 0;
    showAlertInput.value = true;
  }
};

const confirmAlert = () => {
  if (alertTargetPrice.value > 0) {
    addAlert(productId.value, alertTargetPrice.value);
    showAlertInput.value = false;
  }
};

const cancelAlertInput = () => {
  showAlertInput.value = false;
};

// 1. Generate 5 Dummy Stores with different data
const stores = ref([
  { name: 'Amazon', price: 0, rating: 4.8, shipping: 0, delivery: '2 Days' },
  { name: 'eBay', price: 0, rating: 4.2, shipping: 5.99, delivery: '5 Days' },
  { name: 'Walmart', price: 0, rating: 4.5, shipping: 2.50, delivery: '3 Days' },
  { name: 'Target', price: 0, rating: 4.6, shipping: 0, delivery: '4 Days' },
  { name: 'BestBuy', price: 0, rating: 4.7, shipping: 10.00, delivery: '1 Day' },
]);

const loadProductData = async () => {
  isLoading.value = true;
  const res = await fetch(`https://dummyjson.com/products/${route.params.id}`);
  const data = await res.json();
  product.value = data;
  
  // Assigning prices based on the original product price
  stores.value = stores.value.map(s => ({
    ...s,
    price: +(data.price * (0.9 + Math.random() * 0.2)).toFixed(2) // Random price variation
  }));
  
  // Record this visit in the history
  addToHistory(data);
  
  isLoading.value = false;
};

onMounted(loadProductData);

// Watch for route ID changes to reload data when navigating between products
watch(() => route.params.id, (newId) => {
  if (newId) loadProductData();
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
  <div v-if="!isLoading" class="w-full mx-auto p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
    
    <div class="flex flex-col md:flex-row items-center gap-6 md:gap-8 bg-white dark:bg-gray-800 p-6 rounded-2xl md:rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700">
      <img :src="product.thumbnail" class="w-full md:w-1/4 rounded-xl md:rounded-2xl object-contain bg-gray-50 dark:bg-gray-700 p-4" />
      <div class="flex-1 space-y-2 md:space-y-3 text-center md:text-left">
        <h1 class="text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-tight">{{ product.title }}</h1>
        <p class="text-gray-500 dark:text-gray-400 text-sm md:text-base">{{ product.description }}</p>
        <div class="text-2xl md:text-3xl font-bold text-blue-600 my-1">${{ product.price }}</div>
        
        <!-- Price Alert Button -->
        <div class="pt-2">
          <button
            v-if="!showAlertInput"
            @click="toggleAlertInput"
            :class="[
              'inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl text-sm md:text-base font-bold transition-all active:scale-95',
              isAlertSet
                ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 hover:bg-red-50 hover:text-red-500 hover:border-red-200 dark:hover:bg-red-900/30 dark:hover:text-red-400 dark:hover:border-red-800'
                : 'bg-orange-500 hover:bg-orange-600 text-white shadow-sm shadow-orange-200 dark:shadow-orange-900/30'
            ]"
          >
            <span class="text-lg">{{ isAlertSet ? '✅' : '🔔' }}</span>
            {{ isAlertSet ? 'Alert Set — Click to Remove' : 'Set Price Alert' }}
          </button>

          <!-- Inline target price input -->
          <div v-if="showAlertInput" class="flex flex-col sm:flex-row items-center gap-2 md:gap-3 bg-orange-50 dark:bg-orange-900/20 p-3 md:p-4 rounded-xl border border-orange-200 dark:border-orange-800 mt-2">
            <label class="text-sm md:text-base font-bold text-gray-700 dark:text-gray-200 whitespace-nowrap">Target price: $</label>
            <input
              v-model.number="alertTargetPrice"
              type="number"
              min="1"
              step="1"
              class="w-full sm:w-32 bg-white dark:bg-gray-800 border-2 border-orange-200 dark:border-orange-700 focus:border-orange-400 rounded-lg py-2 px-3 text-lg md:text-xl font-bold text-gray-800 dark:text-white outline-none transition-all text-center"
            />
            <div class="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
              <button
                @click="confirmAlert"
                class="flex-1 sm:flex-none bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all active:scale-95"
              >
                Confirm
              </button>
              <button
                @click="cancelAlertInput"
                class="flex-1 sm:flex-none bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg text-sm font-bold transition-all active:scale-95"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="space-y-4 md:space-y-6 mt-8 md:mt-10">
      <div class="p-5 md:p-6 ">
      </div>
    </div>
    <div class="bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mt-6 md:mt-8">
      
      <div class="p-5 md:p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
        <h2 class="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">Marketplace Comparison</h2>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left min-w-150">
          <thead class="bg-gray-50 dark:bg-gray-700/80 text-gray-500 dark:text-gray-400 text-xs md:text-sm uppercase tracking-wider">
            <tr>
              <th class="px-5 py-3 md:py-4 font-semibold">Store Name</th>
              <th class="px-5 py-3 md:py-4 font-semibold">Price</th>
              <th class="px-5 py-3 md:py-4 font-semibold">Rating</th>
              <th class="px-5 py-3 md:py-4 font-semibold">Shipping</th>
              <th class="px-5 py-3 md:py-4 font-semibold">Delivery</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
            <tr v-for="s in stores" :key="s.name" class="hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors">
              <td class="px-5 py-4 text-sm md:text-base font-bold text-gray-800 dark:text-white">{{ s.name }}</td>
              <td class="px-5 py-4 text-sm md:text-base font-black text-blue-600">${{ s.price }}</td>
              <td class="px-5 py-4 text-sm md:text-base text-orange-500 font-bold">⭐ {{ s.rating }}</td>
              <td class="px-5 py-4 text-sm md:text-base text-gray-600 dark:text-gray-300">{{ s.shipping === 0 ? 'FREE' : '$' + s.shipping }}</td>
              <td class="px-5 py-4 text-sm md:text-base text-gray-500 dark:text-gray-400">{{ s.delivery }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <div class="space-y-4 md:space-y-6 mt-8 md:mt-10">
      <div class="p-5 md:p-6 ">
        <h2 class="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">Our Best Recommendations</h2>
      </div>
    
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div v-for="site in bestSites" :key="site.name" 
             class="relative bg-blue-600 p-5 md:p-6 rounded-2xl md:rounded-3xl text-white shadow-lg shadow-blue-100 dark:shadow-none overflow-hidden hover:-translate-y-1 transition-transform">
          <span class="absolute top-4 right-4 md:right-5 bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
            {{ site.tag }}
          </span>
          <h3 class="text-2xl md:text-3xl font-black mb-2">{{ site.name }}</h3>
          <div class="space-y-1 opacity-90 mb-4 text-sm md:text-base">
            <p>Rating: {{ site.rating }} / 5.0</p>
            <p>Shipping: {{ site.shipping === 0 ? 'Free Shipping' : '$' + site.shipping }}</p>
            <p>Delivery: Within {{ site.delivery }}</p>
          </div>
          <div class="flex items-center justify-between pt-3 border-t border-white/20">
            <span class="text-2xl md:text-3xl font-bold">${{ site.price }}</span>
            <button class="bg-white text-blue-600 px-4 py-2 md:px-5 md:py-2.5 rounded-lg md:rounded-xl font-bold hover:bg-gray-50 transition text-sm md:text-base active:scale-95 shadow-sm">
              Go to Store
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>

  <div v-else class="min-h-[60vh] flex items-center justify-center">
    <div class="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
  </div>
</template>