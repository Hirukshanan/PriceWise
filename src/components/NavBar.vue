<template>
  <nav class="flex items-center justify-between px-10 py-6 bg-transparent">
    <div class="text-2xl font-bold text-blue-900">PriceWise<span class="text-blue-400">+</span></div>
    
    <div class="hidden md:flex space-x-8 font-medium text-gray-700">
      <a href="#" class="hover:text-blue-600 border-b-2 border-orange-400">Home</a>
      <a href="#" class="hover:text-blue-600">Comparison</a>
      <a href="#" class="hover:text-blue-600">Trending</a>
      <a href="#" class="hover:text-blue-600">Contact</a>
    </div>

    <div class="flex items-center space-x-4">
      <div class="relative">
        <input type="text" placeholder="Search Price..." class="bg-orange-100 rounded-full py-2 px-6 text-sm focus:outline-none w-48" />
        <span class="absolute right-3 top-2">🔍</span>
      </div>
      <button class="font-bold text-gray-800">Login</button>
    </div>
  </nav>
</template>