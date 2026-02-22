<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { sharedData } from '../store';

const route = useRoute();
const showSearch = computed(() => route.path !== '/favourites' && route.path !== '/price-watch');

const isDarkMode = ref(false);
const isMobileMenuOpen = ref(false);

// Function to toggle dark mode and apply the 'dark' class to the html element.
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>
<template>
  <nav class="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm transition-colors dark:bg-gray-900 dark:border-gray-800">
    <div class="w-full mx-auto flex items-center justify-between py-6 px-6 md:px-12">
      
      <!-- Logo + Hamburger -->
      <div class="flex items-center gap-4">
        <button @click="toggleMobileMenu" class="md:hidden text-gray-600 dark:text-gray-300 focus:outline-none">
          <span class="text-3xl">☰</span>
        </button>
        <router-link to="/" class="text-3xl md:text-4xl font-black tracking-tighter text-blue-900 dark:text-blue-400">
          PriceWise 
        </router-link>
      </div>

      <!-- Desktop Search -->
      <div v-if="showSearch" class="hidden md:flex flex-1 max-w-2xl mx-12">
        <div class="relative group w-full">
          <span class="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl">🔍</span>
          <input 
            v-model="sharedData.searchQuery"
            type="text" 
            placeholder="Search products..." 
            class="text-gray-800 dark:text-white caret-gray-400 w-full bg-gray-100 dark:bg-gray-800 border-none rounded-full py-4 pl-16 pr-8 text-lg focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all outline-none"
          />
        </div>
      </div>

      <!-- Desktop Actions -->
      <div class="hidden md:flex items-center gap-8 text-gray-600 dark:text-gray-300 font-medium text-lg">
        
        <button 
          @click="toggleDarkMode" 
          class="flex items-center gap-2 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <span class="text-2xl">{{ isDarkMode ? '☀️' : '🌙' }}</span>
        </button>

        <router-link to="/favourites" class="flex items-center gap-2 hover:text-blue-600 transition-colors relative">
          <span class="text-2xl">🤍</span>
          <span 
            v-if="sharedData.favourites.length > 0" 
            class="absolute -top-2 -right-3 bg-rose-500 text-white text-sm font-bold px-2.5 py-1 rounded-full border-2 border-white dark:border-gray-900"
          >
            {{ sharedData.favourites.length }}
          </span>
        </router-link>

        <router-link to="/price-watch" class="flex items-center gap-2 relative hover:text-blue-600 transition-colors">
          <div class="relative">
            <span class="text-3xl">🔔</span>
            <span 
              v-if="sharedData.alerts.length > 0"
              class="absolute -top-2 -right-3 bg-orange-500 text-white text-sm font-bold px-2.5 py-1 rounded-full border-2 border-white dark:border-gray-900">
              {{ sharedData.alerts.length }}
            </span>
          </div>
        </router-link>

        <div class="flex items-center ml-2">
          <button class="w-14 h-14 rounded-full border-2 border-gray-100 dark:border-gray-700 overflow-hidden hover:border-blue-300 transition-all">
            <img 
              src="https://i.pravatar.cc/150?u=niharsana" 
              alt="User Profile" 
              class="w-full h-full object-cover"
            />
          </button>
        </div>

      </div>

      <!-- Mobile Search Icon (optional, if you want search accessible without menu) -->
       <div class="md:hidden flex items-center gap-4">
        <router-link to="/price-watch" class="relative text-gray-600 dark:text-gray-300">
             <span class="text-xl">🔔</span>
             <span class="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white dark:border-gray-900">16</span>
        </router-link>
       </div>
    </div>

    <!-- Mobile Drawer / Menu -->
    <div v-if="isMobileMenuOpen" class="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-4 space-y-4">
      
      <!-- Mobile Search -->
      <div v-if="showSearch" class="relative w-full">
         <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input 
            v-model="sharedData.searchQuery"
            type="text" 
            placeholder="Search products..." 
            class="text-gray-800 dark:text-white caret-gray-400 w-full bg-gray-100 dark:bg-gray-800 border-none rounded-full py-2.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all outline-none"
          />
      </div>

       <div class="flex items-center justify-between text-gray-600 dark:text-gray-300">
          <span class="font-medium">Dark Mode</span>
          <button 
          @click="toggleDarkMode" 
          class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
        >
          <span class="text-lg">{{ isDarkMode ? '☀️' : '🌙' }}</span>
        </button>
       </div>

       <router-link to="/favourites" class="flex items-center gap-3 text-gray-600 dark:text-gray-300 font-medium py-2">
          <span class="text-lg">🤍</span> Favourites
          <span v-if="sharedData.favourites.length > 0" class="ml-auto bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{{ sharedData.favourites.length }}</span>
        </router-link>

        <div class="flex items-center gap-3 py-2 border-t border-gray-100 dark:border-gray-800 pt-4">
           <img 
              src="https://i.pravatar.cc/150?u=niharsana" 
              alt="User Profile" 
              class="w-8 h-8 rounded-full object-cover"
            />
        </div>
    </div>
  </nav>
</template>