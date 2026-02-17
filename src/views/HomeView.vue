<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import { type Product } from '../types/product';
import { sharedData } from '../store';
// State management
const products = ref<Product[]>([]);
const categories = ref<string[]>(['All Categories']); // Start with 'All'
const isLoading = ref(true);
const selectedCategory = ref('All Categories');

/**
 * Logic to fetch both products and their categories from the API.
 * This ensures our UI matches the data exactly.
 */
const loadDashboardData = async () => {
  try {
    const [prodRes, catRes] = await Promise.all([
      // ADD '?limit=0' to fetch all products for better filtering
      fetch('https://dummyjson.com/products?limit=0'), 
      fetch('https://dummyjson.com/products/category-list')
    ]);
    // ... rest of the logic remains the same

    const prodData = await prodRes.json();
    const catData = await catRes.json();

    products.value = prodData.products;
    
    // Capitalize category names for a better UI look
    const formattedCategories = catData.map((c: string) => 
      c.charAt(0).toUpperCase() + c.slice(1).replace('-', ' ')
    );
    
    categories.value = ['All Categories', ...formattedCategories];
  } catch (error) {
    console.error("Dashboard Load Error:", error);
  } finally {
    isLoading.value = false;
  }
};

/**
 * Filter Logic: This reacts whenever selectedCategory or searchQuery changes.
 * It handles the 'All Categories' case and specific matches.
 */
const filteredProducts = computed(() => { 
  return products.value.filter(item => {
    // 1. Search Match logic
    const matchesSearch = item.title.toLowerCase().includes(sharedData.searchQuery.toLowerCase()  );

    // 2. Category Match logic
    const normalizedSelected = selectedCategory.value.toLowerCase().replace(' ', '-');
    const matchesCategory = selectedCategory.value === 'All Categories' || 
                            item.category === normalizedSelected;

    return matchesSearch && matchesCategory;
  });
});

onMounted(loadDashboardData);
</script>

<template>
  <div class="max-w-[1600px] mx-auto p-4 md:p-6 lg:p-10">
    
    <div class="flex-1 overflow-hidden">
      
      <div class="flex items-center gap-3 md:gap-4 mb-6 md:mb-10 overflow-x-auto pb-4 no-scrollbar">
        <button 
          v-for="cat in categories" 
          :key="cat"
          @click="selectedCategory = cat"
          :class="[
            'px-4 py-2 md:px-6 md:py-2.5 rounded-full text-sm font-bold transition-all flex-shrink-0 border whitespace-nowrap', 
            selectedCategory === cat 
              ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100' 
              : 'bg-white text-gray-500 border-gray-100 hover:border-blue-200'
          ]"
        >
          {{ cat }}
        </button>
      </div>

      <div v-if="!isLoading">
        <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
          <ProductCard 
            v-for="item in filteredProducts" 
            :key="item.id" 
            :product="item" 
            @click="$router.push(`/product/${item.id}`)"
            class="cursor-pointer"
          />
        </div>
        
        <div v-else class="flex flex-col items-center justify-center py-24 text-gray-400">
          <span class="text-6xl mb-6">🔍</span>
          <p class="text-xl font-medium">No results found for "{{ selectedCategory }}"</p>
          <button @click="selectedCategory = 'All Categories'" class="mt-4 text-blue-600 font-bold underline">
            Clear Filters
          </button>
        </div>
      </div>

      <div v-else class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-4 border-gray-100 border-t-blue-600"></div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Chrome, Safari and Opera - scrollbar hiding */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* IE, Edge and Firefox- scrollbar hiding */
.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>