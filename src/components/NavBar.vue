<script setup lang="ts">
import { ref } from 'vue';
import { sharedData } from '../store'; // importing sharedData

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
    <div class="flex items-center justify-between w-full py-4 px-4 md:px-8">
      
      <!-- Logo + Hamburger -->
      <div class="flex items-center gap-4">
        <button @click="toggleMobileMenu" class="md:hidden text-gray-600 dark:text-gray-300 focus:outline-none">
          <span class="text-2xl">☰</span>
        </button>
        <router-link to="/" class="text-xl md:text-2xl font-black tracking-tighter text-blue-900 dark:text-blue-400">
          PriceWise 
        </router-link>
      </div>

      <!-- Desktop Search -->
      <div class="hidden md:flex flex-1 max-w-xl mx-10">
        <div class="relative group w-full">
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input 
            v-model="sharedData.searchQuery"
            type="text" 
            placeholder="Search products..." 
            class="text-gray-800 dark:text-white caret-gray-400 w-full bg-gray-100 dark:bg-gray-800 border-none rounded-full py-2.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all outline-none"
          />
        </div>
      </div>

      <!-- Desktop Actions -->
      <div class="hidden md:flex items-center gap-6 text-gray-600 dark:text-gray-300 font-medium text-sm">
        
        <button 
          @click="toggleDarkMode" 
          class="flex items-center gap-2 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <span class="text-lg">{{ isDarkMode ? '☀️' : '🌙' }}</span>
        </button>

        <a href="#" class="flex items-center gap-2 hover:text-blue-600 transition-colors">
          <span class="text-lg">🤍</span>
        </a>

        <a href="#" class="flex items-center gap-2 relative hover:text-blue-600 transition-colors">
          <div class="relative">
            <span class="text-xl">🛒</span>
            <span class="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white dark:border-gray-900">
              16
            </span>
          </div>
        </a>

        <div class="flex items-center ml-2">
          <button class="w-10 h-10 rounded-full border-2 border-gray-100 dark:border-gray-700 overflow-hidden hover:border-blue-300 transition-all">
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
        <a href="#" class="relative text-gray-600 dark:text-gray-300">
             <span class="text-xl">🛒</span>
             <span class="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white dark:border-gray-900">16</span>
        </a>
       </div>
    </div>

    <!-- Mobile Drawer / Menu -->
    <div v-if="isMobileMenuOpen" class="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-4 space-y-4">
      
      <!-- Mobile Search -->
      <div class="relative w-full">
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

       <a href="#" class="flex items-center gap-3 text-gray-600 dark:text-gray-300 font-medium py-2">
          <span class="text-lg">🤍</span> Wishlist
        </a>

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