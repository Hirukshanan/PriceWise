<script setup lang="ts">
import NavBar from './components/NavBar.vue';
</script>

<template>
  <div class="w-full min-h-screen font-sans antialiased text-gray-900 bg-[#F8F9FB]">
    
    <NavBar />

    <main class="w-full">
      <router-view />
    </main>
    
  </div>
</template>