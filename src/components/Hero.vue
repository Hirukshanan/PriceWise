<template>
  <section class="w-full relative py-20 lg:py-32">
    <div class="max-w-[1600px] mx-auto px-8 md:px-16 flex flex-col lg:flex-row items-center justify-between gap-12">
      
      <div class="lg:w-1/2 z-10">
        <h1 class="text-6xl md:text-8xl xl:text-9xl font-black text-[#1a2b56] leading-[1.1] mb-8 tracking-tighter">
          For the <br/>
          <span class="relative inline-block italic text-blue-600">
            smartest
            <svg class="absolute -bottom-2 left-0 w-full h-3 text-orange-300" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="4" fill="transparent" />
            </svg>
          </span> 
          deal.
        </h1>
        <p class="text-gray-500 text-xl md:text-2xl mb-12 max-w-xl leading-relaxed">
          Don't just buy. Compare prices across top stores and save money instantly with PriceWise.
        </p>
        
        <div class="flex flex-wrap items-center gap-8">
          <button class="bg-[#d4a373] text-white px-12 py-5 rounded-2xl font-bold text-xl hover:bg-[#bc8a5f] transition-all shadow-lg hover:scale-105">
            Get Started
          </button>
          <a href="#" class="text-gray-800 font-bold text-xl flex items-center group">
            How it works <span class="ml-3 group-hover:translate-x-2 transition-transform">→</span>
          </a>
        </div>
      </div>

      <div class="lg:w-1/2 relative flex justify-center">
        <div class="absolute inset-0 bg-orange-200 blur-[120px] rounded-full opacity-30 transform scale-150"></div>
        <img 
          src="https://cdn.dummyjson.com/product-images/1/thumbnail.jpg" 
          alt="Smart Product Comparison"
          class="relative z-10 w-full max-w-[600px] drop-shadow-[0_50px_50px_rgba(0,0,0,0.12)] rounded-[3rem]"
        />
      </div>

    </div>
  </section>
</template>