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
      fetch('https://dummyjson.com/products?limit=0'), 
      fetch('https://dummyjson.com/products/category-list')
    ]);

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
  const query = sharedData.searchQuery.toLowerCase();
  const normalizedSelected = selectedCategory.value.toLowerCase().replace(' ', '-');
  const isAllCategories = selectedCategory.value === 'All Categories';

  return products.value.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(query);
    const matchesCategory = isAllCategories || item.category === normalizedSelected;
    return matchesSearch && matchesCategory;
  });
});

onMounted(loadDashboardData);
</script>

<template>
  <div class="w-full mx-auto p-2 sm:p-4 md:p-6 lg:p-8">

    <div class="flex-1 overflow-hidden pb-16">

      <div class="flex items-center gap-1.5 sm:gap-2 md:gap-3 mb-4 sm:mb-6 md:mb-8 overflow-x-auto pb-2 no-scrollbar">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          :class="[
            'px-3 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all shrink-0 border whitespace-nowrap',
            selectedCategory === cat
              ? 'bg-blue-500 text-white border-blue-500 shadow-sm shadow-blue-500/30'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800'
          ]"
        >
          {{ cat }}
        </button>
      </div>

      <div v-if="!isLoading">
        <div v-if="filteredProducts.length > 0" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-4 md:gap-5">
          <ProductCard 
            v-for="item in filteredProducts" 
            :key="item.id" 
            :product="item" 
            @click="$router.push(sharedData.isLoggedIn ? `/product/${item.id}` : '/login')"
            class="cursor-pointer"
          />
        </div>
        
        <div v-else class="flex flex-col items-center justify-center py-20 text-gray-400 dark:text-gray-500">
          <span class="text-4xl mb-4">🔍</span>
          <p class="text-lg font-medium">No results found for "{{ selectedCategory }}"</p>
          <button @click="selectedCategory = 'All Categories'" class="mt-3 text-blue-500 font-medium underline">
            Clear Filters
          </button>
        </div>
      </div>

      <div v-else class="flex justify-center items-center h-48">
        <div class="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-blue-500"></div>
      </div>

    </div>

    <!-- Footer -->
    <footer class="mt-16 sm:mt-32 border-t-4 border-blue-500 bg-white dark:bg-gray-900 pt-8 sm:pt-12 pb-6 sm:pb-8 px-4 md:px-8 lg:px-12">
      <div class="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
        
        <!-- Brand Column -->
        <div>
          <h3 class="text-xl font-extrabold text-blue-600 dark:text-blue-400 mb-3">PriceWise</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5">
            The world's most trusted comparison shopping engine. Save time and money on every purchase.
          </p>
          <div class="flex items-center gap-3">
            <!-- Twitter/X icon -->
            <a href="#" class="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.38 8.59 8.59 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.32 3.91A12.16 12.16 0 0 1 3 4.79a4.28 4.28 0 0 0 1.32 5.72 4.24 4.24 0 0 1-1.94-.54v.05a4.28 4.28 0 0 0 3.43 4.2 4.27 4.27 0 0 1-1.93.07 4.29 4.29 0 0 0 4 2.97A8.59 8.59 0 0 1 2 19.54a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.37-.01-.56A8.72 8.72 0 0 0 23 6.29a8.49 8.49 0 0 1-2.54.7z"/></svg>
            </a>
            <!-- LinkedIn/Square icon -->
            <a href="#" class="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3" ry="3"/></svg>
            </a>
          </div>
        </div>

        <!-- Company Column -->
        <div>
          <h4 class="text-sm font-bold text-gray-900 dark:text-white mb-4 tracking-wide">Company</h4>
          <ul class="space-y-2.5">
            <li><a href="#" class="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">About Us</a></li>
            <li><a href="#" class="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Careers</a></li>
            <li><a href="#" class="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Press</a></li>
            <li><a href="#" class="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Contact</a></li>
          </ul>
        </div>

        <!-- Resources Column -->
        <div>
          <h4 class="text-sm font-bold text-gray-900 dark:text-white mb-4 tracking-wide">Resources</h4>
          <ul class="space-y-2.5">
            <li><a href="#" class="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Blog</a></li>
            <li><a href="#" class="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Help Center</a></li>
            <li><a href="#" class="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Seller Guide</a></li>
            <li><a href="#" class="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Comparison API</a></li>
          </ul>
        </div>

        <!-- Legal Column -->
        <div>
          <h4 class="text-sm font-bold text-gray-900 dark:text-white mb-4 tracking-wide">Legal</h4>
          <ul class="space-y-2.5">
            <li><a href="#" class="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" class="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Terms of Service</a></li>
            <li><a href="#" class="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Cookie Policy</a></li>
            <li><a href="#" class="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Copyright Info</a></li>
          </ul>
        </div>

      </div>
    </footer>

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