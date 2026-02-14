<script setup lang="ts">
import NavBar from './components/NavBar.vue';
</script>

<template>
  <div class="w-full min-h-screen bg-[#FDF8F4] font-sans antialiased text-slate-900">
    
    <header class="w-full border-b border-orange-100/30">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <NavBar />
      </div>
    </header>

    <main class="w-full">
      <router-view />
    </main>
    
  </div>
</template>