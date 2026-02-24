<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import UserSidebar from './components/UserSidebar.vue';
import { sharedData } from './store';
import { useRouter } from 'vue-router';

const router = useRouter();

const closeSidebar = () => {
  sharedData.sidebarOpen = false;
};

const handleLogout = () => {
  closeSidebar();
  router.push('/');
};
</script>

<template>
  <div class="w-full min-h-screen bg-[#FDF8F4] dark:bg-gray-950 transition-colors duration-300">
    <NavBar />
    <router-view />

    <!-- ── Global User Sidebar Drawer ───────────────────────────── -->
    <Teleport to="body">
      <Transition name="sidebar-fade">
        <div
          v-if="sharedData.sidebarOpen"
          class="fixed inset-0 z-[200] flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="User account sidebar"
        >
          <!-- Backdrop -->
          <div
            class="absolute inset-0 bg-black/40 backdrop-blur-sm"
            @click="closeSidebar"
            aria-hidden="true"
          />

          <!-- Drawer panel (slides in from the right) -->
          <Transition name="sidebar-slide" appear>
            <div
              v-if="sharedData.sidebarOpen"
              class="relative z-10 h-full shadow-2xl"
            >
              <UserSidebar
                @logout="handleLogout"
                @navigate="closeSidebar"
              />
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style>
/* Backdrop fade */
.sidebar-fade-enter-active,
.sidebar-fade-leave-active {
  transition: opacity 0.3s ease;
}
.sidebar-fade-enter-from,
.sidebar-fade-leave-to {
  opacity: 0;
}

/* Panel slide from the right */
.sidebar-slide-enter-active,
.sidebar-slide-leave-active {
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.sidebar-slide-enter-from,
.sidebar-slide-leave-to {
  transform: translateX(100%);
}
</style>
