<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { sharedData, clearHistory } from '../store';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const router = useRouter();

// Use real history from the reactive store
const historyItems = computed(() => sharedData.history);

const handleClearHistory = () => {
  clearHistory();
};

const viewProduct = (productId: number) => {
  emit('close');
  router.push(`/product/${productId}`);
};

const handleBackdropClick = (e: MouseEvent) => {
  // Only close if clicking exactly on the backdrop
  if ((e.target as HTMLElement).classList.contains('backdrop')) {
    emit('close');
  }
};
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div 
        v-if="isOpen"
        class="backdrop fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6"
        @click="handleBackdropClick"
        aria-modal="true"
        role="dialog"
      >
        <Transition name="scale" appear>
          <div 
            v-if="isOpen"
            class="relative w-full max-w-3xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <!-- Header -->
            <div class="px-6 py-5 border-b border-gray-100 dark:border-slate-700/50 flex items-center justify-between sticky top-0 bg-blue-200 dark:bg-slate-800 z-10">
              <div>
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">Comparison History</h2>
              </div>
              
              <button 
                @click="emit('close')"
                class="p-2 -mr-2 text-gray-400 hover:text-red-600 dark:hover:text-gray-300 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-slate-600"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Action Bar -->
            <div v-if="historyItems.length > 0" class="px-6 py-3 bg-gray-50/50 dark:bg-slate-800/80 border-b border-gray-100 dark:border-slate-700/50 flex justify-end">
              <button 
                @click="handleClearHistory"
                class="flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-lg transition-colors focus:outline-none"
              >
                <span>🗑️</span>
                <span>Clear History</span>
              </button>
            </div>

            <!-- Content Area (Scrollable) -->
            <div class="p-6 overflow-y-auto max-h-[60vh] custom-scrollbar">
              <template v-if="historyItems.length > 0">
                <div class="space-y-2">
                  <div 
                    v-for="item in historyItems" 
                    :key="item.id"
                    class="flex items-center gap-4 p-3 border border-transparent hover:border-blue-500 dark:hover:border-blue-400 rounded-xl transition-colors group"
                  >
                    <!-- Thumbnail -->
                    <div class="shrink-0 w-16 h-16 bg-gray-50 dark:bg-slate-900 rounded-lg p-1 border border-gray-100 dark:border-slate-700/50 flex items-center justify-center">
                      <img 
                        :src="item.thumbnail" 
                        :alt="item.title"
                        class="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    
                    <!-- Details -->
                    <div class="flex-1 min-w-0">
                      <h3 class="text-base font-bold text-gray-900 dark:text-white truncate pr-4">
                        {{ item.title }}
                      </h3>
                      <p class="text-sm text-gray-500 dark:text-gray-400 truncate mt-0.5">
                        {{ item.brand }}
                      </p>
                    </div>
                    
                    <!-- Price & Action -->
                    <div class="flex items-center gap-6 shrink-0">
                      <div class="text-right hidden sm:block">
                        <span class="text-lg font-bold text-blue-600 dark:text-blue-400">
                          ${{ item.price.toFixed(2) }}
                        </span>
                      </div>
                      <button 
                        @click="viewProduct(item.id)"
                        class="shrink-0 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg font-medium transition-all active:scale-95 shadow-sm"
                      >
                        View Again
                      </button>
                    </div>
                  </div>
                </div>
              </template>
              
              <!-- Empty State -->
              <div v-else class="flex flex-col items-center justify-center py-16 text-center">
                <div class="w-20 h-20 bg-gray-50 dark:bg-slate-800/80 rounded-full flex items-center justify-center mb-4">
                  <span class="text-5xl opacity-50 grayscale">🕰️</span>
                </div>
                <h3 class="text-xl font-bold text-gray-700 dark:text-gray-200 mb-2">No history yet</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                  Products you compare or view will appear here so you can easily find them later.
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Backdrop transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Modal scale transition */
.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}

/* Custom thin scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.3);
  border-radius: 10px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(71, 85, 105, 0.5);
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.5);
}
</style>
