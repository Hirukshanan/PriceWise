<template>
  <section class="w-full py-12 md:py-20 lg:py-32 overflow-hidden">
    <div class="w-full mx-auto px-6 md:px-10 flex flex-col lg:flex-row items-center justify-between gap-10">
      
      <div class="lg:w-[60%] text-left">
        <h1 class="text-5xl md:text-7xl lg:text-9xl font-black text-[#1a2b56] dark:text-white leading-[1.1] mb-6 md:mb-8 tracking-tighter">
          For the <br/>
          <span class="italic text-blue-600 relative">
            smartest
            <svg class="absolute -bottom-2 left-0 w-full h-2 md:h-3 text-orange-200" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="5" fill="transparent" />
            </svg>
          </span> 
          deal.
        </h1>
        <p class="text-gray-500 dark:text-gray-400 text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 max-w-xl leading-relaxed">
          Don't just buy. Compare prices across top stores and save money instantly with PriceWise comparison engine.
        </p>
        
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
          <button class="bg-[#d4a373] text-white px-10 py-4 md:px-12 md:py-5 rounded-2xl font-bold text-lg md:text-xl hover:bg-[#bc8a5f] transition-all shadow-xl hover:scale-105 w-full sm:w-auto">
            Get Started
          </button>
          <a href="#" class="text-gray-800 dark:text-gray-300 font-bold text-lg md:text-xl flex items-center group">
            How it works <span class="ml-3 group-hover:translate-x-2 transition-transform">→</span>
          </a>
        </div>
      </div>

      <div class="lg:w-[40%] flex justify-center mt-10 lg:mt-0">
        <div class="w-64 h-64 md:w-80 md:h-80 bg-orange-100 rounded-full blur-[80px] md:blur-[100px] opacity-40"></div>
      </div>

    </div>
  </section>
</template>