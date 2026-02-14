<script setup lang="ts">
import NavBar from './components/NavBar.vue';
</script>

<template>
  <div class="w-full min-h-screen bg-[#FDF8F4] font-sans text-slate-900 overflow-x-hidden">
    <div class="max-w-[1600px] mx-auto">
      <NavBar />
    </div>

    <main>
      <router-view />
    </main>
  </div>
</template>