<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { PriceAlert } from '../types/alert';
import { sharedData, removeAlert, updateAlertTarget } from '../store';

const alerts = ref<PriceAlert[]>([]);
const isLoading = ref(true);

// ─── Fetch product data from DummyJSON for each stored alert ────
const loadAlerts = async () => {
  try {
    const stored = sharedData.alerts;

    if (stored.length === 0) {
      alerts.value = [];
      return;
    }

    const results = await Promise.all(
      stored.map(async (entry) => {
        const res = await fetch(`https://dummyjson.com/products/${entry.productId}`);
        const product = await res.json();

        // Determine status from live data
        let status: PriceAlert['status'] = 'monitoring';
        if (product.stock === 0) {
          status = 'out-of-stock';
        } else if (product.price <= entry.targetPrice) {
          status = 'dropped';
        }

        return {
          productId: entry.productId,
          title: product.title,
          thumbnail: product.thumbnail,
          currentPrice: product.price,
          targetPrice: entry.targetPrice,
          stock: product.stock,
          status,
        } as PriceAlert;
      })
    );

    alerts.value = results;
  } catch (error) {
    console.error('Failed to load alerts:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(loadAlerts);

// Reload when alerts change (add / remove from another page)
watch(() => sharedData.alerts.length, () => {
  isLoading.value = true;
  loadAlerts();
});

// ─── Edit Modal ─────────────────────────────────────────────────
const editingAlert = ref<PriceAlert | null>(null);
const editTargetPrice = ref(0);

const openEditModal = (alert: PriceAlert) => {
  editingAlert.value = alert;
  editTargetPrice.value = alert.targetPrice;
};

const saveEdit = () => {
  if (editingAlert.value) {
    updateAlertTarget(editingAlert.value.productId, editTargetPrice.value);

    // Update local view state
    const target = alerts.value.find(a => a.productId === editingAlert.value!.productId);
    if (target) {
      target.targetPrice = editTargetPrice.value;
      if (target.currentPrice <= editTargetPrice.value && target.stock > 0) {
        target.status = 'dropped';
      } else if (target.currentPrice > editTargetPrice.value) {
        target.status = 'monitoring';
      }
    }
  }
  editingAlert.value = null;
};

const cancelEdit = () => {
  editingAlert.value = null;
};

// ─── Delete ─────────────────────────────────────────────────────
const deleteAlert = (productId: number) => {
  removeAlert(productId);
  alerts.value = alerts.value.filter(a => a.productId !== productId);
};

// ─── Helpers ────────────────────────────────────────────────────
const progressPercent = (alert: PriceAlert): number => {
  if (alert.status === 'out-of-stock' || alert.targetPrice <= 0) return 0;
  if (alert.currentPrice <= alert.targetPrice) return 100;
  const ceiling = alert.targetPrice * 2;
  const progress = ((ceiling - alert.currentPrice) / (ceiling - alert.targetPrice)) * 100;
  return Math.max(0, Math.min(100, Math.round(progress)));
};

const getStatusConfig = (status: PriceAlert['status']) => {
  const configs = {
    'monitoring': { label: 'Monitoring', bgLight: 'bg-blue-50', bgDark: 'dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400', dot: 'bg-blue-500', barColor: 'bg-blue-500' },
    'dropped': { label: 'Price Dropped!', bgLight: 'bg-emerald-50', bgDark: 'dark:bg-emerald-900/30', text: 'text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500', barColor: 'bg-emerald-500' },
    'out-of-stock': { label: 'Out of Stock', bgLight: 'bg-red-50', bgDark: 'dark:bg-red-900/30', text: 'text-red-500 dark:text-red-400', dot: 'bg-red-500', barColor: 'bg-red-500' },
  };
  return configs[status];
};
</script>

<template>
  <div class="w-full min-h-screen px-4 md:px-6 lg:px-10 py-10 md:py-14">

    <!-- ─── Header ─────────────────────────────────────────── -->
    <div class="mb-10 md:mb-14" style="padding-bottom: 2.5rem;">
      <h1 class="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
        🔔 My Price Alerts
      </h1>
      <p class="text-lg md:text-xl text-gray-400 dark:text-gray-500 font-medium">
        Tracking prices for your favorite products.
        <span v-if="!isLoading && alerts.length > 0" class="ml-1 text-blue-600 dark:text-blue-400 font-bold">
          {{ alerts.length }} {{ alerts.length === 1 ? 'alert' : 'alerts' }} active
        </span>
      </p>
    </div>

    <!-- ─── Loading ────────────────────────────────────────── -->
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-4 border-gray-100 border-t-blue-600"></div>
    </div>

    <!-- ─── Alert Cards Grid ───────────────────────────────── -->
    <div
      v-else-if="alerts.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 md:gap-6"
    >
      <TransitionGroup name="card">
        <div
          v-for="alert in alerts"
          :key="alert.productId"
          class="group bg-white dark:bg-slate-800 rounded-2xl md:rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
        >
          <!-- Card Image -->
          <div class="relative h-56 md:h-64 bg-linear-to-br bg-blue-100 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center p-6">
            <img
              :src="alert.thumbnail"
              :alt="alert.title"
              loading="lazy"
              class="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
            />
            <!-- Status Badge -->
            <span
              :class="[
                'absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs md:text-sm font-bold backdrop-blur-md',
                getStatusConfig(alert.status).bgLight,
                getStatusConfig(alert.status).bgDark,
                getStatusConfig(alert.status).text,
              ]"
            >
              <span :class="['w-2 h-2 rounded-full animate-pulse', getStatusConfig(alert.status).dot]"></span>
              {{ getStatusConfig(alert.status).label }}
            </span>
          </div>

          <!-- Card Body -->
          <div class="p-5 md:p-7 flex flex-col flex-1">
            <!-- Title -->
            <h3 class="font-bold text-lg md:text-xl text-gray-800 dark:text-white leading-snug line-clamp-2 mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {{ alert.title }}
            </h3>

            <!-- Price Comparison -->
            <div class="flex items-center justify-between mb-2">
              <div>
                <span class="text-xs md:text-sm text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold block mb-0.5">Current</span>
                <span
                  class="text-2xl md:text-3xl font-black"
                  :class="alert.status === 'out-of-stock' ? 'text-red-400 line-through' : alert.currentPrice <= alert.targetPrice ? 'text-emerald-500' : 'text-gray-800 dark:text-white'"
                >
                  {{ alert.status === 'out-of-stock' ? '—' : '$' + alert.currentPrice }}
                </span>
              </div>
              <div class="text-right">
                <span class="text-xs md:text-sm text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold block mb-0.5">Target</span>
                <span class="text-2xl md:text-3xl font-black text-blue-600 dark:text-blue-400">
                  ${{ alert.targetPrice }}
                </span>
              </div>
            </div>

            <!-- Progress Bar -->
            <div class="mt-3 mb-5">
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-xs md:text-sm text-gray-400 dark:text-gray-500 font-medium">
                  {{ alert.status === 'out-of-stock' ? 'Unavailable' : progressPercent(alert) + '% to target' }}
                </span>
                <span
                  v-if="alert.status !== 'out-of-stock' && alert.currentPrice > alert.targetPrice"
                  class="text-xs md:text-sm text-gray-400 dark:text-gray-500 font-medium"
                >
                  ${{ (alert.currentPrice - alert.targetPrice).toFixed(0) }} away
                </span>
              </div>
              <div class="w-full h-2.5 md:h-3 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  :class="['h-full rounded-full transition-all duration-700 ease-out', getStatusConfig(alert.status).barColor]"
                  :style="{ width: progressPercent(alert) + '%' }"
                ></div>
              </div>
            </div>

            <!-- Spacer -->
            <div class="flex-1"></div>

            <!-- Action Buttons -->
            <div class="flex items-center gap-2 md:gap-3 pt-4 border-t border-gray-100 dark:border-slate-700">
              <router-link
                :to="`/product/${alert.productId}`"
                class="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base font-bold py-2.5 md:py-3 rounded-xl transition-all active:scale-95"
              >
                View Deal
              </router-link>
              <button
                @click="openEditModal(alert)"
                class="flex-1 text-center bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 text-sm md:text-base font-bold py-2.5 md:py-3 rounded-xl transition-all active:scale-95"
              >
                ✏️ Edit
              </button>
              <button
                @click="deleteAlert(alert.productId)"
                class="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-500 rounded-xl transition-all active:scale-95"
                title="Delete Alert"
              >
                <span class="text-2xl md:text-3xl">🗑️</span>
              </button>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>

    <!-- ─── Empty State ────────────────────────────────────── -->
    <div v-else class="flex flex-col items-center justify-center py-28 md:py-36 text-center">
      <div class="w-28 h-28 md:w-36 md:h-36 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-8">
        <span class="text-6xl md:text-7xl">🔕</span>
      </div>
      <p class="text-2xl md:text-3xl font-bold text-gray-700 dark:text-gray-200 mb-3">
        No price alerts yet
      </p>
      <p class="text-lg md:text-xl text-gray-400 dark:text-gray-500 mb-8 max-w-md">
        Start tracking products and we'll alert you when prices drop to your target.
      </p>
      <router-link
        to="/"
        class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all active:scale-95 shadow-lg shadow-blue-200 dark:shadow-blue-900/40"
      >
        🚀 Start Tracking
      </router-link>
    </div>

    <!-- ─── Edit Target Modal ──────────────────────────────── -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="editingAlert"
          class="fixed inset-0 z-100 flex items-center justify-center p-6 md:p-10"
        >
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="cancelEdit"></div>

          <!-- Modal Card -->
          <div class="relative bg-white dark:bg-slate-800 rounded-3xl md:rounded-[2.5rem] shadow-2xl z-10 w-[92vw] max-w-3xl p-8 md:p-12">
            <h2 class="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2 leading-tight">
              Edit Target Price
            </h2>
            <p class="text-lg md:text-xl text-gray-400 dark:text-gray-500 mb-8 line-clamp-1">
              {{ editingAlert.title }}
            </p>

            <!-- Current price display -->
            <div class="mb-6 p-5 md:p-7 bg-gray-50 dark:bg-slate-700/50 rounded-2xl">
              <span class="block text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Current Price</span>
              <span class="text-3xl md:text-4xl font-black text-gray-800 dark:text-white">${{ editingAlert.currentPrice }}</span>
            </div>

            <div class="mb-8">
              <label class="block text-sm md:text-base font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Your Target Price ($)
              </label>
              <input
                v-model.number="editTargetPrice"
                type="number"
                min="1"
                step="1"
                class="w-full bg-gray-100 dark:bg-slate-700 border-2 border-transparent focus:border-blue-500 dark:focus:border-blue-400 rounded-2xl py-4 md:py-5 px-6 text-3xl md:text-4xl font-bold text-gray-800 dark:text-white outline-none transition-all"
              />
            </div>

            <div class="flex items-center gap-4 mt-8">
              <button
                @click="saveEdit"
                class="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-lg md:text-xl font-bold py-4 md:py-5 rounded-2xl transition-all active:scale-95"
              >
                Save Changes
              </button>
              <button
                @click="cancelEdit"
                class="flex-1 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-200 text-lg md:text-xl font-bold py-4 md:py-5 rounded-2xl transition-all active:scale-95"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<style scoped>
/* ── 5-column grid: tighten alert card internals at xl ── */
@media (min-width: 1280px) {
  .grid > div > div.relative {
    height: 10rem !important;
  }
  .grid > div > div.p-5 {
    padding: 0.85rem !important;
  }
  .grid > div h3 {
    font-size: 0.85rem !important;
    margin-bottom: 0.5rem !important;
  }
  .grid > div .text-2xl {
    font-size: 1.1rem !important;
  }
  .grid > div .text-3xl {
    font-size: 1.25rem !important;
  }
  .grid > div .h-2\.5 {
    height: 0.4rem !important;
  }
}

/* Card list transition */
.card-enter-active,
.card-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.card-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
.card-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
