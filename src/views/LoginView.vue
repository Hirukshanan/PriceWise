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
  <div class="min-h-[calc(100vh-72px)] w-full flex bg-[#FDF8F4] dark:bg-gray-950 transition-colors duration-300">
    
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

        <div class="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-100 dark:border-gray-800 rounded-3xl p-8 sm:p-10 shadow-2xl animate-[fadeIn_0.5s_ease-out]">
          <div class="mb-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Sign In</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Don't have an account? <router-link to="/register" class="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Sign up for free</router-link></p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-6">
            <!-- Email Input -->
            <div class="space-y-2 relative group">
              <label for="email" class="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
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
                  class="block w-full pl-11 pr-4 py-3.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all sm:text-sm"
                />
              </div>
            </div>

            <!-- Password Input -->
            <div class="space-y-2 relative group">
              <div class="flex items-center justify-between">
                <label for="password" class="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <a href="#" class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors">Forgot password?</a>
              </div>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
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
                  class="block w-full pl-11 pr-4 py-3.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all sm:text-sm"
                />
              </div>
            </div>

            <!-- Remember Me -->
            <div class="flex items-center">
              <input
                v-model="rememberMe"
                id="remember"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-800 cursor-pointer"
              />
              <label for="remember" class="ml-2 block text-sm text-gray-700 dark:text-gray-300 cursor-pointer select-none">
                Remember me for 30 days
              </label>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 transform transition-all active:scale-[0.98] hover:shadow-blue-500/25"
            >
              Sign In
            </button>
          </form>

          <!-- Divider -->
          <div class="mt-8 relative hidden"> <!-- Hiding social since not requested explicitly except in plan, but adding it makes it premium -->
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">Or continue with</span>
            </div>
          </div>

          <div class="mt-8 relative">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-200 dark:border-gray-700"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">Or continue with</span>
            </div>
          </div>

          <!-- Social Buttons -->
          <div class="mt-6 grid grid-cols-2 gap-4">
            <button type="button" class="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 dark:border-gray-700 rounded-xl shadow-xs bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              <svg class="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span class="ml-2">Google</span>
            </button>
            <button type="button" class="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 dark:border-gray-700 rounded-xl shadow-xs bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              <svg class="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.15 2.95.93 3.78 2.04-3.26 2.15-2.69 6.07.66 7.39a10.9 10.9 0 01-3.09 3.58zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2 4.36-3.74 4.25z"/>
              </svg>
              <span class="ml-2">Apple</span>
            </button>
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
