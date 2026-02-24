<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { sharedData } from '../store';

const toggleSidebar = () => {
  sharedData.sidebarOpen = !sharedData.sidebarOpen;
};

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
    <div class="w-full mx-auto flex items-center justify-between py-8 px-6 md:px-14">
      
      <!-- Logo + Hamburger -->
      <div class="flex items-center gap-4">
        <button @click="toggleMobileMenu" class="md:hidden text-gray-600 dark:text-gray-300 focus:outline-none">
          <span class="text-4xl">☰</span>
        </button>
        <router-link to="/" class="text-4xl md:text-5xl font-black tracking-tighter text-blue-900 dark:text-blue-400">
          PriceWise
        </router-link>
      </div>

      <!-- Desktop Search -->
      <div v-if="showSearch" class="hidden md:flex flex-1 max-w-2xl mx-12">
        <div class="relative group w-full">
          <span class="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-2xl">🔍</span>
          <input
            v-model="sharedData.searchQuery"
            type="text"
            placeholder="Search products..."
            class="text-gray-800 dark:text-white caret-gray-400 w-full bg-gray-100 dark:bg-gray-800 border-none rounded-full py-5 pl-16 pr-8 text-xl focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all outline-none"
          />
        </div>
      </div>

      <!-- Desktop Actions -->
      <div class="hidden md:flex items-center gap-10 text-gray-600 dark:text-gray-300 font-medium text-xl">

        <button
          @click="toggleDarkMode"
          class="flex items-center gap-2 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <span class="text-3xl">{{ isDarkMode ? '☀️' : '🌙' }}</span>
        </button>

        <router-link to="/favourites" class="flex items-center gap-2 hover:text-blue-600 transition-colors relative">
          <span class="text-3xl">🤍</span>
          <span
            v-if="sharedData.favourites.length > 0"
            class="absolute -top-2 -right-3 bg-rose-500 text-white text-base font-bold px-2.5 py-1 rounded-full border-2 border-white dark:border-gray-900"
          >
            {{ sharedData.favourites.length }}
          </span>
        </router-link>

        <router-link to="/price-watch" class="flex items-center gap-2 relative hover:text-blue-600 transition-colors">
          <div class="relative">
            <span class="text-4xl">🔔</span>
            <span
              v-if="sharedData.alerts.length > 0"
              class="absolute -top-2 -right-3 bg-orange-500 text-white text-base font-bold px-2.5 py-1 rounded-full border-2 border-white dark:border-gray-900">
              {{ sharedData.alerts.length }}
            </span>
          </div>
        </router-link>

        <div class="flex items-center ml-2">
          <button
            @click="toggleSidebar"
            class="w-16 h-16 rounded-full border-2 border-gray-100 dark:border-gray-700 overflow-hidden hover:border-blue-300 transition-all"
            aria-label="Open user account sidebar"
          >
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
          <span class="text-2xl">🔔</span>
          <span class="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full border-2 border-white dark:border-gray-900">{{ sharedData.alerts.length }}</span>
        </router-link>
      </div>
    </div>

    <!-- Mobile Drawer / Menu -->
    <div v-if="isMobileMenuOpen" class="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-5 py-5 space-y-5">

      <!-- Mobile Search -->
      <div v-if="showSearch" class="relative w-full">
        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
        <input
          v-model="sharedData.searchQuery"
          type="text"
          placeholder="Search products..."
          class="text-gray-800 dark:text-white caret-gray-400 w-full bg-gray-100 dark:bg-gray-800 border-none rounded-full py-3.5 pl-12 pr-4 text-base focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all outline-none"
        />
      </div>

      <div class="flex items-center justify-between text-gray-600 dark:text-gray-300">
        <span class="font-semibold text-base">Dark Mode</span>
        <button @click="toggleDarkMode" class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
          <span class="text-xl">{{ isDarkMode ? '☀️' : '🌙' }}</span>
        </button>
      </div>

      <router-link to="/favourites" class="flex items-center gap-3 text-gray-600 dark:text-gray-300 font-semibold text-base py-2">
        <span class="text-xl">🤍</span> Favourites
        <span v-if="sharedData.favourites.length > 0" class="ml-auto bg-rose-500 text-white text-sm font-bold px-2 py-0.5 rounded-full">{{ sharedData.favourites.length }}</span>
      </router-link>

      <button
        @click="() => { toggleSidebar(); isMobileMenuOpen = false; }"
        class="flex items-center gap-3 py-2 border-t border-gray-100 dark:border-gray-800 pt-4 text-gray-600 dark:text-gray-300 font-semibold text-base w-full"
      >
        <img
          src="https://i.pravatar.cc/150?u=niharsana"
          alt="User Profile"
          class="w-10 h-10 rounded-full object-cover"
        />
        <span>My Account</span>
      </button>
    </div>
  </nav>
</template>