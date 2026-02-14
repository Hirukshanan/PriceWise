<template>
  <nav class="flex justify-between items-center w-full py-6 px-4 md:px-0 bg-transparent">
    
    <div class="flex items-center">
      <router-link to="/" class="text-3xl font-black tracking-tighter text-[#1a2b56]">
        PriceWise<span class="text-blue-600">+</span>
      </router-link>
    </div>

    <div class="hidden md:flex items-center gap-10 font-bold text-[#1a2b56]/70 uppercase text-xs tracking-widest">
      <router-link to="/" class="hover:text-blue-600 transition-colors border-b-2 border-orange-300">Home</router-link>
      <a href="#" class="hover:text-blue-600 transition-colors">Comparison</a>
      <a href="#" class="hover:text-blue-600 transition-colors">Trending</a>
      <a href="#" class="hover:text-blue-600 transition-colors">Contact</a>
    </div>

    <div class="flex items-center gap-6">
      <div class="relative hidden sm:block">
        <input 
          type="text" 
          placeholder="Search Price..." 
          class="bg-orange-50/50 border border-orange-100 rounded-full py-2 px-6 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-200 w-40 lg:w-56"
        />
        <span class="absolute right-4 top-2 text-gray-400">🔍</span>
      </div>

      <button class="font-bold text-[#1a2b56] hover:text-blue-600 transition-colors">
        Login
      </button>
    </div>

  </nav>
</template>