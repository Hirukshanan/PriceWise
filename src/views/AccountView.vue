<script setup lang="ts">
import { useRouter } from 'vue-router';
import UserSidebar from '../components/UserSidebar.vue';

const router = useRouter();

const handleLogout = () => {
  // TODO: clear auth state, then redirect to home
  router.push('/');
};

const handleNavigate = (route: string) => {
  // Only push if route exists in the app, otherwise silently ignore
  const knownRoutes = ['/history', '/profile', '/notifications'];
  if (knownRoutes.includes(route)) {
    router.push(route);
  }
};
</script>

<template>
  <div class="flex min-h-[calc(100vh-72px)] bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
    <!-- Sidebar -->
    <UserSidebar
      @logout="handleLogout"
      @navigate="handleNavigate"
    />

    <!-- Main content area -->
    <main class="flex-1 flex items-center justify-center p-10">
      <div class="text-center space-y-3">
        <div class="w-20 h-20 mx-auto rounded-full bg-blue-50 dark:bg-slate-800 flex items-center justify-center">
          <svg class="w-9 h-9 text-blue-300 dark:text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <p class="text-lg font-semibold text-gray-400 dark:text-slate-500">Select an option from the sidebar</p>
        <p class="text-sm text-gray-300 dark:text-slate-600">Your account details will appear here.</p>
      </div>
    </main>
  </div>
</template>
