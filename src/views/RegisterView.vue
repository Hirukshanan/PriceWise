<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../store';

const router = useRouter();
const fullName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const agreeTerms = ref(false);

const handleRegister = () => {
  // In a real app, you would validate passwords match and create the account.
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match");
    return;
  }
  
  if (fullName.value && email.value && password.value && agreeTerms.value) {
    // Simulate successful registration and login automatically
    login();
    router.push('/');
  }
};
</script>

<template>
  <div class="min-h-[calc(100vh-72px)] w-full flex bg-[#FDF8F4] dark:bg-gray-950 transition-colors duration-300">
    
    <!-- Left Decorative Panel (Hidden on mobile) -->
    <div class="hidden lg:flex flex-1 relative overflow-hidden bg-purple-900 rounded-br-[100px] shadow-2xl items-center justify-center p-12">
      <!-- Background gradients & decorations -->
      <div class="absolute inset-0 bg-linear-to-br from-indigo-600/80 to-purple-900/90 mix-blend-multiply z-10" />
      <div class="absolute top-0 right-0 w-full h-full opacity-30 z-0">
        <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" class="w-full h-full object-cover animate-[spin_60s_linear_infinite_reverse]">
          <path fill="#a855f7" d="M38.1,-63.9C49.9,-53.4,60.1,-43.3,66.5,-30.5C72.9,-17.7,75.4,-2.2,73.5,13.1C71.6,28.4,65.3,43.5,54.8,53.8C44.3,64.1,29.6,69.5,13.7,73.7C-2.2,77.9,-19.3,80.9,-34.8,75.6C-50.3,70.3,-64.1,56.7,-72.1,40.9C-80.1,25.1,-82.3,7,-77.9,-9.5C-73.5,-26,-62.5,-40.9,-49.5,-51C-36.5,-61.1,-21.5,-66.4,-3.9,-61.7C13.7,-57,26.3,-74.4,38.1,-63.9Z" transform="translate(200 200) scale(1.1)" />
        </svg>
      </div>
      
      <div class="relative z-20 text-white max-w-lg text-center">
        <div class="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
          <svg class="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
            <path d="M19 8v6M22 11h-6"/>
          </svg>
        </div>
        <h1 class="text-5xl font-black mb-6 tracking-tight leading-tight text-transparent bg-clip-text bg-linear-to-r from-white to-purple-200">
          Join PriceWise Today
        </h1>
        <p class="text-xl text-purple-100/90 font-medium">
          Create an account to start saving products, setting up price alerts, and getting the best value for your money.
        </p>
      </div>
    </div>

    <!-- Right Register Form Panel -->
    <div class="flex-1 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      <!-- Decorative ambient glows for dark mode -->
      <div class="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 dark:bg-purple-600/20 blur-[100px] pointer-events-none" />
      <div class="absolute bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 dark:bg-blue-600/20 blur-[100px] pointer-events-none" />

      <div class="w-full max-w-md relative z-10">
        <!-- Mobile Header (Visible only on small screens) -->
        <div class="lg:hidden text-center mb-10">
          <h2 class="text-3xl font-black text-gray-900 dark:text-white tracking-tight">PriceWise</h2>
          <p class="text-gray-500 dark:text-gray-400 mt-2">Create a new account</p>
        </div>

        <div class="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-100 dark:border-gray-800 rounded-3xl p-8 sm:p-10 shadow-2xl animate-[fadeIn_0.5s_ease-out]">
          <div class="mb-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Sign Up</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Already have an account? <router-link to="/login" class="text-purple-600 dark:text-purple-400 font-semibold hover:underline">Sign in</router-link></p>
          </div>

          <form @submit.prevent="handleRegister" class="space-y-5">
            <!-- Full Name Input -->
            <div class="space-y-1.5 relative group">
              <label for="fullName" class="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-500 transition-colors">
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <input
                  v-model="fullName"
                  type="text"
                  id="fullName"
                  required
                  placeholder="John Doe"
                  class="block w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all sm:text-sm"
                />
              </div>
            </div>

            <!-- Email Input -->
            <div class="space-y-1.5 relative group">
              <label for="email" class="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-500 transition-colors">
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
                  class="block w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all sm:text-sm"
                />
              </div>
            </div>

            <!-- Password Input -->
            <div class="space-y-1.5 relative group">
              <label for="password" class="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-500 transition-colors">
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
                  class="block w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all sm:text-sm"
                />
              </div>
            </div>

            <!-- Confirm Password Input -->
            <div class="space-y-1.5 relative group">
              <label for="confirmPassword" class="text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-500 transition-colors">
                  <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
                  </svg>
                </div>
                <input
                  v-model="confirmPassword"
                  type="password"
                  id="confirmPassword"
                  required
                  placeholder="••••••••"
                  class="block w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all sm:text-sm"
                />
              </div>
            </div>

            <!-- Terms -->
            <div class="flex items-start mt-4">
              <div class="flex items-center h-5">
                <input
                  v-model="agreeTerms"
                  id="terms"
                  type="checkbox"
                  required
                  class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-800 cursor-pointer"
                />
              </div>
              <div class="ml-2 text-sm">
                <label for="terms" class="text-gray-600 dark:text-gray-400 cursor-pointer select-none">
                  I agree to the <a href="#" class="text-purple-600 dark:text-purple-400 hover:underline">Terms of Service</a> and <a href="#" class="text-purple-600 dark:text-purple-400 hover:underline">Privacy Policy</a>.
                </label>
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full flex justify-center py-3.5 px-4 mt-2 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-gray-900 transform transition-all active:scale-[0.98] hover:shadow-purple-500/25"
            >
              Create Account
            </button>
          </form>
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
