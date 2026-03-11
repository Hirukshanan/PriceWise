<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../store';

const router = useRouter();
const email = ref('');
const password = ref('');
const rememberMe = ref(false);

const handleLogin = () => {
  // In a real app, you would validate and authenticate here.
  // For now, we simulate a successful login.
  if (email.value && password.value) {
    login();
    router.push('/');
  }
};
</script>

<template>
  <div class="min-h-screen w-full flex bg-[#FDF8F4] dark:bg-gray-950 transition-colors duration-300">
    
    <!-- Left Decorative Panel (Hidden on mobile) -->
    <div class="hidden lg:flex flex-1 relative overflow-hidden bg-blue-900 rounded-br-[100px] shadow-2xl items-center justify-center p-12">
      <!-- Background gradients & decorations -->
      <div class="absolute inset-0 bg-linear-to-br from-blue-600/80 to-purple-900/90 mix-blend-multiply z-10" />
      <div class="absolute top-0 left-0 w-full h-full opacity-30 z-0">
        <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover animate-[spin_60s_linear_infinite]">
          <path fill="#4f46e5" d="M38.1,-63.9C49.9,-53.4,60.1,-43.3,66.5,-30.5C72.9,-17.7,75.4,-2.2,73.5,13.1C71.6,28.4,65.3,43.5,54.8,53.8C44.3,64.1,29.6,69.5,13.7,73.7C-2.2,77.9,-19.3,80.9,-34.8,75.6C-50.3,70.3,-64.1,56.7,-72.1,40.9C-80.1,25.1,-82.3,7,-77.9,-9.5C-73.5,-26,-62.5,-40.9,-49.5,-51C-36.5,-61.1,-21.5,-66.4,-3.9,-61.7C13.7,-57,26.3,-74.4,38.1,-63.9Z" transform="translate(200 200) scale(1.1)" />
        </svg>
      </div>
      
      <div class="relative z-20 text-white max-w-lg text-center">
        <div class="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
          <svg class="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
        </div>
        <h1 class="text-5xl font-black mb-6 tracking-tight leading-tight text-transparent bg-clip-text bg-linear-to-r from-white to-blue-200">
          Welcome back to PriceWise
        </h1>
        <p class="text-xl text-blue-100/90 font-medium">
          Discover the best deals and track price drops across all your favorite products in one place.
        </p>
      </div>
    </div>

    <!-- Right Login Form Panel -->
    <div class="flex-1 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      <!-- Decorative ambient glows for dark mode -->
      <div class="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 dark:bg-blue-600/20 blur-[100px] pointer-events-none" />
      <div class="absolute bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 dark:bg-purple-600/20 blur-[100px] pointer-events-none" />

      <div class="w-full max-w-md relative z-10">
        <!-- Mobile Header (Visible only on small screens) -->
        <div class="lg:hidden text-center mb-10">
          <h2 class="text-3xl font-black text-gray-900 dark:text-white tracking-tight">PriceWise</h2>
          <p class="text-gray-500 dark:text-gray-400 mt-2">Welcome back! Please enter your details.</p>
        </div>

        <div class="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-100 dark:border-gray-800 rounded-3xl p-10 sm:p-14 shadow-2xl animate-[fadeIn_0.5s_ease-out]">
          <div class="mb-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Sign In</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Don't have an account? <router-link to="/register" class="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Sign up for free</router-link></p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-6">
            <!-- Email Input -->
            <div class="space-y-3 relative group">
              <label for="email" class="text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Email Address</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-hover:text-blue-500 group-focus-within:text-blue-600 transition-colors">
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><path d="m2 4 10 10 10-10"/>
                  </svg>
                </div>
                <input
                  v-model="email"
                  type="email"
                  id="email"
                  required
                  placeholder="you@example.com"
                  class="block w-full pl-12 pr-4 py-4 border-2 border-transparent ring-1 ring-gray-200 dark:ring-gray-700 rounded-2xl bg-gray-50/50 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent group-hover:ring-blue-300 dark:group-hover:ring-blue-600 transition-all text-base shadow-sm hover:shadow-md"
                />
              </div>
            </div>

            <!-- Password Input -->
            <div class="space-y-3 relative group">
              <div class="flex items-center justify-between">
                <label for="password" class="text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Password</label>
                
              </div>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-hover:text-blue-500 group-focus-within:text-blue-600 transition-colors">
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <input
                  v-model="password"
                  type="password"
                  id="password"
                  required
                  placeholder="••••••••"
                  class="block w-full pl-12 pr-4 py-4 border-2 border-transparent ring-1 ring-gray-200 dark:ring-gray-700 rounded-2xl bg-gray-50/50 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent group-hover:ring-blue-300 dark:group-hover:ring-blue-600 transition-all text-base shadow-sm hover:shadow-md"
                />
              </div>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between mt-6 mb-2">
              <div class="flex items-center">
                <input
                  v-model="rememberMe"
                  id="remember"
                  type="checkbox"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-800 cursor-pointer"
                />
                <label for="remember" class="ml-2 block text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer select-none">
                  Remember me
                </label>
              </div>
              <a href="#" class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-bold transition-colors">Forgot password?</a>
            </div>

            <!-- Submit Button -->
            <button
               type="submit"
               class="w-full relative group flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-lg shadow-blue-500/30 text-base font-black text-white bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-size-[200%_auto] hover:bg-position-[right_center] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 transform transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] active:translate-y-0"
             >
               Sign In
             </button>
          </form>

          <!-- Divider -->
          <div class="mt-8 relative hidden">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl text-gray-500 dark:text-gray-400 font-medium tracking-wide">Or continue with</span>
            </div>
          </div>

          <div class="mt-8 relative">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
