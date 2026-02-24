<script setup lang="ts">
import { ref, computed } from 'vue';

// ─── Props ───────────────────────────────────────────────────────
interface Props {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}

const props = withDefaults(defineProps<Props>(), {
  userName: 'Hirukshanan L.',
  userEmail: 'hirukshanan@pricewise.com',
  userAvatar: 'https://i.pravatar.cc/150?u=hirukshanan',
});

// ─── Emits ───────────────────────────────────────────────────────
const emit = defineEmits<{
  logout: [];
  navigate: [route: string];
}>();

// ─── Dark Mode ───────────────────────────────────────────────────
const isDark = ref(document.documentElement.classList.contains('dark'));

const toggleAppearance = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// ─── Active item tracking ─────────────────────────────────────────
const activeItem = ref<string | null>(null);

const navigate = (key: string, route: string) => {
  activeItem.value = key;
  emit('navigate', route);
};

const isActive = (key: string) => computed(() => activeItem.value === key);
</script>

<template>
  <aside
    class="flex flex-col w-96 min-h-screen bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800 shadow-2xl transition-colors duration-300"
    aria-label="User account sidebar"
  >
    <!-- ── HEADER ────────────────────────────────────────────────── -->
    <header class="relative overflow-hidden px-8 py-10 flex-shrink-0">
      <!-- Gradient background -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-800 dark:via-slate-800/80 dark:to-slate-900"
        aria-hidden="true"
      />
      <!-- Wave decoration -->
      <svg
        class="absolute bottom-0 right-0 opacity-10 dark:opacity-5 text-indigo-400"
        viewBox="0 0 200 120" width="220" fill="currentColor" aria-hidden="true"
      >
        <path d="M0,60 C50,20 100,100 150,60 C180,40 200,70 200,70 L200,120 L0,120 Z" />
        <path d="M0,80 C60,50 120,110 170,75 C185,67 200,80 200,80 L200,120 L0,120 Z" opacity="0.6" />
      </svg>

      <!-- User Identity -->
      <div class="relative flex items-center gap-5">
        <!-- Avatar -->
        <div class="flex-shrink-0 w-24 h-24 rounded-full ring-4 ring-white dark:ring-slate-700 shadow-lg overflow-hidden">
          <img :src="props.userAvatar" :alt="`${props.userName} avatar`" class="w-full h-full object-cover" />
        </div>
        <!-- Name & Email -->
        <div class="min-w-0">
          <p class="text-2xl font-bold text-gray-900 dark:text-slate-50 leading-tight truncate">
            {{ props.userName }}
          </p>
          <p class="mt-1 text-base text-gray-500 dark:text-slate-400 truncate">
            {{ props.userEmail }}
          </p>
        </div>
      </div>
    </header>

    <!-- ── NAVIGATION ────────────────────────────────────────────── -->
    <nav
      class="flex-1 overflow-y-auto px-4 py-6 space-y-6"
      aria-label="Account navigation"
    >
      <!-- Group 1: Activity -->
      <section aria-labelledby="section-activity">
        <div class="flex items-center gap-2 px-4 pb-2 mb-1" id="section-activity">
          <svg class="w-5 h-5 text-gray-400 dark:text-slate-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <span class="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-slate-500 select-none">Activity</span>
        </div>

        <!-- Comparison History -->
        <button
          @click="navigate('comparison-history', '/history')"
          :class="[
            'w-full flex items-center gap-4 px-4 py-5 rounded-2xl text-left transition-all duration-200 group',
            isActive('comparison-history').value
              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
              : 'text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'
          ]"
          aria-label="Comparison History"
        >
          <span :class="[
            'flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0 transition-colors',
            isActive('comparison-history').value
              ? 'bg-blue-100 dark:bg-blue-800/50 text-blue-600 dark:text-blue-300'
              : 'bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-500'
          ]">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/><polyline points="12 7 12 12 15 15"/>
            </svg>
          </span>
          <span class="flex-1 text-base font-semibold">Comparison History</span>
          <svg class="w-5 h-5 text-gray-300 dark:text-slate-600 group-hover:text-blue-400 transition-colors flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </section>

      <div class="border-t border-gray-100 dark:border-slate-800 mx-2" role="separator" />

      <!-- Group 2: Settings -->
      <section aria-labelledby="section-settings">
        <div class="flex items-center gap-2 px-4 pb-2 mb-1" id="section-settings">
          <svg class="w-5 h-5 text-gray-400 dark:text-slate-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
          <span class="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-slate-500 select-none">Settings</span>
        </div>

        <div class="space-y-1">
          <!-- Update Profile -->
          <button
            @click="navigate('update-profile', '/profile')"
            :class="[
              'w-full flex items-center gap-4 px-4 py-5 rounded-2xl text-left transition-all duration-200 group',
              isActive('update-profile').value
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                : 'text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'
            ]"
            aria-label="Update Profile"
          >
            <span :class="[
              'flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0 transition-colors',
              isActive('update-profile').value
                ? 'bg-blue-100 dark:bg-blue-800/50 text-blue-600 dark:text-blue-300'
                : 'bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-500'
            ]">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L9 18l-4 1 1-4 12.5-12.5z"/>
              </svg>
            </span>
            <span class="flex-1 text-base font-semibold">Update Profile</span>
            <svg class="w-5 h-5 text-gray-300 dark:text-slate-600 group-hover:text-blue-400 transition-colors flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>

          <!-- Notification Settings -->
          <button
            @click="navigate('notifications', '/notifications')"
            :class="[
              'w-full flex items-center gap-4 px-4 py-5 rounded-2xl text-left transition-all duration-200 group',
              isActive('notifications').value
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                : 'text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'
            ]"
            aria-label="Notification Settings"
          >
            <span :class="[
              'flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0 transition-colors',
              isActive('notifications').value
                ? 'bg-blue-100 dark:bg-blue-800/50 text-blue-600 dark:text-blue-300'
                : 'bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:text-blue-500'
            ]">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </span>
            <span class="flex-1 text-base font-semibold">Notification Settings</span>
            <svg class="w-5 h-5 text-gray-300 dark:text-slate-600 group-hover:text-blue-400 transition-colors flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>

          <!-- Appearance (Toggle) -->
          <div class="w-full flex items-center gap-4 px-4 py-5 rounded-2xl text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all duration-200 group">
            <span class="flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0 bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-400 group-hover:bg-amber-50 dark:group-hover:bg-amber-900/20 group-hover:text-amber-500 transition-colors">
              <svg v-if="isDark" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
              <svg v-else class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            </span>
            <span class="flex-1 text-base font-semibold">Appearance</span>
            <!-- Toggle switch -->
            <button
              @click="toggleAppearance"
              :aria-checked="isDark"
              aria-label="Toggle dark mode"
              role="switch"
              class="relative inline-flex items-center flex-shrink-0 w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900"
              :class="isDark ? 'bg-indigo-600' : 'bg-gray-200'"
            >
              <span
                class="inline-block w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300"
                :class="isDark ? 'translate-x-8' : 'translate-x-1'"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </section>
    </nav>

    <!-- ── FOOTER ─────────────────────────────────────────────────── -->
    <footer class="flex-shrink-0 px-8 py-6 border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900">
      <button
        @click="emit('logout')"
        class="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-full border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold text-base hover:bg-emerald-50 dark:hover:bg-emerald-900/20 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        aria-label="Logout of your account"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
          <polyline points="16 17 21 12 16 7"/>
          <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
        Logout
      </button>
    </footer>
  </aside>
</template>
