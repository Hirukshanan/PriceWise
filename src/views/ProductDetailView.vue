<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { addAlert, removeAlert, hasAlert, sharedData } from '../store';

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
  <div v-if="!isLoading" class="w-full mx-auto p-4 md:p-6 lg:p-12 space-y-8 md:space-y-12">
    
    <div class="flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-white dark:bg-gray-800 p-6 md:p-8 rounded-4xl md:rounded-[2.5rem] shadow-sm border border-gray-300 dark:border-gray-700">
      <img :src="product.thumbnail" class="w-full md:w-1/3 rounded-2xl md:rounded-3xl object-contain bg-gray-50 dark:bg-gray-700 p-4" />
      <div class="flex-1 space-y-3 md:space-y-4 text-center md:text-left">
        <h1 class="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">{{ product.title }}</h1>
        <p class="text-gray-500 dark:text-gray-400 text-lg md:text-xl">{{ product.description }}</p>
        <div class="text-3xl md:text-4xl font-bold text-blue-600 my-2">${{ product.price }}</div>
        
        <!-- Price Alert Button -->
        <div class="pt-2">
          <button
            v-if="!showAlertInput"
            @click="toggleAlertInput"
            :class="[
              'inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl text-base md:text-lg font-bold transition-all active:scale-95',
              isAlertSet
                ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-2 border-emerald-200 dark:border-emerald-800 hover:bg-red-50 hover:text-red-500 hover:border-red-200 dark:hover:bg-red-900/30 dark:hover:text-red-400 dark:hover:border-red-800'
                : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-200 dark:shadow-orange-900/30'
            ]"
          >
            <span class="text-xl">{{ isAlertSet ? '✅' : '🔔' }}</span>
            {{ isAlertSet ? 'Alert Set — Click to Remove' : 'Set Price Alert' }}
          </button>

          <!-- Inline target price input -->
          <div v-if="showAlertInput" class="flex flex-col sm:flex-row items-center gap-3 bg-orange-50 dark:bg-orange-900/20 p-4 md:p-5 rounded-2xl border-2 border-orange-200 dark:border-orange-800">
            <label class="text-base md:text-lg font-bold text-gray-700 dark:text-gray-200 whitespace-nowrap">Target price: $</label>
            <input
              v-model.number="alertTargetPrice"
              type="number"
              min="1"
              step="1"
              class="w-full sm:w-40 bg-white dark:bg-gray-800 border-2 border-orange-200 dark:border-orange-700 focus:border-orange-400 rounded-xl py-3 px-4 text-xl md:text-2xl font-bold text-gray-800 dark:text-white outline-none transition-all text-center"
            />
            <div class="flex gap-2">
              <button
                @click="confirmAlert"
                class="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl text-base font-bold transition-all active:scale-95"
              >
                Confirm
              </button>
              <button
                @click="cancelAlertInput"
                class="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 px-5 py-3 rounded-xl text-base font-bold transition-all active:scale-95"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br>
    <div class="bg-white dark:bg-gray-800 rounded-4xl md:rounded-[2.5rem] shadow-sm border border-gray-300 dark:border-gray-700 overflow-hidden">
      <div class="p-6 md:p-8 border-b border-gray-50 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Marketplace Comparison</h2>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left min-w-150">
          <thead class="bg-gray-50 dark:bg-gray-700 text-gray-400 dark:text-gray-300 text-base md:text-lg uppercase">
            <tr>
              <th class="px-4 md:px-8 py-3 md:py-4">Store Name</th>
              <th class="px-4 md:px-8 py-3 md:py-4">Price</th>
              <th class="px-4 md:px-8 py-3 md:py-4">Rating</th>
              <th class="px-4 md:px-8 py-3 md:py-4">Shipping</th>
              <th class="px-4 md:px-8 py-3 md:py-4">Delivery</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 dark:divide-gray-700">
            <tr v-for="s in stores" :key="s.name" class="hover:bg-blue-50/30 dark:hover:bg-blue-900/20 transition-colors">
              <td class="px-4 md:px-8 py-5 md:py-7 font-bold text-gray-800 dark:text-white text-lg md:text-xl">{{ s.name }}</td>
              <td class="px-4 md:px-8 py-5 md:py-7 font-black text-blue-600 text-lg md:text-xl">${{ s.price }}</td>
              <td class="px-4 md:px-8 py-5 md:py-7 text-orange-500 font-bold text-lg md:text-xl">⭐ {{ s.rating }}</td>
              <td class="px-4 md:px-8 py-5 md:py-7 text-gray-600 dark:text-gray-300 text-lg md:text-xl">{{ s.shipping === 0 ? 'FREE' : '$' + s.shipping }}</td>
              <td class="px-4 md:px-8 py-5 md:py-7 text-gray-500 dark:text-gray-400 text-lg md:text-xl">{{ s.delivery }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="space-y-6">
      <br>
      <h2 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white px-2">Our Best Recommendations</h2>
      <br>
      <br>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div v-for="site in bestSites" :key="site.name" 
             class="relative bg-blue-600 p-6 md:p-8 rounded-4xl md:rounded-[2.5rem] text-white shadow-xl shadow-blue-100 overflow-hidden">
          <span class="absolute top-6 right-6 md:right-8 bg-white/20 px-4 md:px-5 py-1.5 rounded-full text-sm md:text-base font-bold uppercase tracking-widest">
            {{ site.tag }}
          </span>
          <h3 class="text-3xl md:text-4xl font-black mb-3">{{ site.name }}</h3>
          <div class="space-y-2 opacity-90 mb-6 text-base md:text-lg">
            <p>Rating: {{ site.rating }} / 5.0</p>
            <p>Shipping: {{ site.shipping === 0 ? 'Free Shipping' : '$' + site.shipping }}</p>
            <p>Delivery: Within {{ site.delivery }}</p>
          </div>
          <div class="flex items-center justify-between pt-4 border-t border-white/10">
            <span class="text-3xl md:text-4xl font-bold">${{ site.price }}</span>
            <button class="bg-white text-blue-600 px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-bold hover:bg-gray-100 transition text-base md:text-lg">
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