<script setup lang="ts">
import NavBar from './components/NavBar.vue';
</script>

<template>
 <div class="w-full min-h-screen bg-[#FDF8F4]">
    <NavBar />
    
    <router-view />
  </div>
</template>