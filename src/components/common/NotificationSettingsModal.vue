<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { sharedData, updateNotificationSettings } from '../../store';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

// Local form state — single reactive object instead of 10 refs
const form = reactive({
  emailAlerts: sharedData.notificationSettings.emailAlerts,
  pushNotifications: sharedData.notificationSettings.pushNotifications,
  priceDropAlerts: sharedData.notificationSettings.priceDropAlerts,
  backInStockAlerts: sharedData.notificationSettings.backInStockAlerts,
  weeklyDigest: sharedData.notificationSettings.weeklyDigest,
  dealOfTheDay: sharedData.notificationSettings.dealOfTheDay,
  priceDropThreshold: sharedData.notificationSettings.priceDropThreshold,
  quietHoursEnabled: sharedData.notificationSettings.quietHoursEnabled,
  quietHoursStart: sharedData.notificationSettings.quietHoursStart,
  quietHoursEnd: sharedData.notificationSettings.quietHoursEnd,
});

const saveMessage = ref('');

// Sync all fields when modal opens
watch(() => props.isOpen, (open) => {
  if (open) {
    Object.assign(form, sharedData.notificationSettings);
    saveMessage.value = '';
  }
});

const handleSave = () => {
  updateNotificationSettings({ ...form });
  saveMessage.value = 'Settings saved!';
  setTimeout(() => { saveMessage.value = ''; }, 3000);
};

const handleBackdropClick = (e: MouseEvent) => {
  if ((e.target as HTMLElement).classList.contains('backdrop')) {
    emit('close');
  }
};

const thresholdOptions = [5, 10, 15, 20, 25, 30, 40, 50];
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
            class="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <!-- Header -->
            <div class="px-6 py-5 border-b border-gray-100 dark:border-slate-700/50 flex items-center justify-between sticky top-0 bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 dark:from-slate-800 dark:via-slate-800/80 dark:to-slate-900 z-10">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
                  <svg class="w-5 h-5 text-amber-600 dark:text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                  </svg>
                </div>
                <div>
                  <h2 class="text-xl font-bold text-gray-900 dark:text-white">Notification Settings</h2>
                  <p class="text-xs text-gray-500 dark:text-slate-400">Control how and when we reach you</p>
                </div>
              </div>

              <button
                @click="emit('close')"
                class="p-2 -mr-2 text-gray-400 hover:text-red-500 dark:hover:text-gray-300 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-slate-600"
                aria-label="Close modal"
              >
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Content -->
            <div class="p-6 overflow-y-auto custom-scrollbar space-y-6">
              <!-- Success Message -->
              <Transition name="fade">
                <div
                  v-if="saveMessage"
                  class="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                >
                  <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {{ saveMessage }}
                </div>
              </Transition>

              <!-- ── Section: Channels ───────────────────── -->
              <section>
                <h3 class="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"/></svg>
                  Notification Channels
                </h3>

                <div class="space-y-1">
                  <!-- Email Alerts -->
                  <div class="flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors group">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      </div>
                      <div>
                        <p class="text-sm font-semibold text-gray-800 dark:text-white">Email Alerts</p>
                        <p class="text-xs text-gray-500 dark:text-slate-400">Receive notifications via email</p>
                      </div>
                    </div>
                    <button
                      @click="form.emailAlerts = !form.emailAlerts"
                      role="switch"
                      :aria-checked="form.emailAlerts"
                      class="relative inline-flex items-center shrink-0 w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-800"
                      :class="form.emailAlerts ? 'bg-blue-600' : 'bg-gray-200 dark:bg-slate-600'"
                    >
                      <span
                        class="inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300"
                        :class="form.emailAlerts ? 'translate-x-[1.35rem]' : 'translate-x-1'"
                      />
                    </button>
                  </div>

                  <!-- Push Notifications -->
                  <div class="flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors group">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-500 dark:text-purple-400 group-hover:scale-110 transition-transform">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                      </div>
                      <div>
                        <p class="text-sm font-semibold text-gray-800 dark:text-white">Push Notifications</p>
                        <p class="text-xs text-gray-500 dark:text-slate-400">Browser push notifications</p>
                      </div>
                    </div>
                    <button
                      @click="form.pushNotifications = !form.pushNotifications"
                      role="switch"
                      :aria-checked="form.pushNotifications"
                      class="relative inline-flex items-center shrink-0 w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-slate-800"
                      :class="form.pushNotifications ? 'bg-purple-600' : 'bg-gray-200 dark:bg-slate-600'"
                    >
                      <span
                        class="inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300"
                        :class="form.pushNotifications ? 'translate-x-[1.35rem]' : 'translate-x-1'"
                      />
                    </button>
                  </div>
                </div>
              </section>

              <div class="border-t border-gray-100 dark:border-slate-700/50" />

              <!-- ── Section: Alert Types ─────────────────── -->
              <section>
                <h3 class="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  Alert Types
                </h3>

                <div class="space-y-1">
                  <!-- Price Drop -->
                  <div class="flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors group">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-500 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                      </div>
                      <div>
                        <p class="text-sm font-semibold text-gray-800 dark:text-white">Price Drop Alerts</p>
                        <p class="text-xs text-gray-500 dark:text-slate-400">When tracked products drop in price</p>
                      </div>
                    </div>
                    <button
                      @click="form.priceDropAlerts = !form.priceDropAlerts"
                      role="switch"
                      :aria-checked="form.priceDropAlerts"
                      class="relative inline-flex items-center shrink-0 w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-slate-800"
                      :class="form.priceDropAlerts ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-slate-600'"
                    >
                      <span
                        class="inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300"
                        :class="form.priceDropAlerts ? 'translate-x-[1.35rem]' : 'translate-x-1'"
                      />
                    </button>
                  </div>

                  <!-- Back in Stock -->
                  <div class="flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors group">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-lg bg-rose-50 dark:bg-rose-900/30 flex items-center justify-center text-rose-500 dark:text-rose-400 group-hover:scale-110 transition-transform">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                      </div>
                      <div>
                        <p class="text-sm font-semibold text-gray-800 dark:text-white">Back in Stock</p>
                        <p class="text-xs text-gray-500 dark:text-slate-400">When out-of-stock items return</p>
                      </div>
                    </div>
                    <button
                      @click="form.backInStockAlerts = !form.backInStockAlerts"
                      role="switch"
                      :aria-checked="form.backInStockAlerts"
                      class="relative inline-flex items-center shrink-0 w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 dark:focus:ring-offset-slate-800"
                      :class="form.backInStockAlerts ? 'bg-rose-500' : 'bg-gray-200 dark:bg-slate-600'"
                    >
                      <span
                        class="inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300"
                        :class="form.backInStockAlerts ? 'translate-x-[1.35rem]' : 'translate-x-1'"
                      />
                    </button>
                  </div>

                  <!-- Weekly Digest -->
                  <div class="flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors group">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      </div>
                      <div>
                        <p class="text-sm font-semibold text-gray-800 dark:text-white">Weekly Digest</p>
                        <p class="text-xs text-gray-500 dark:text-slate-400">Summary of best deals every week</p>
                      </div>
                    </div>
                    <button
                      @click="form.weeklyDigest = !form.weeklyDigest"
                      role="switch"
                      :aria-checked="form.weeklyDigest"
                      class="relative inline-flex items-center shrink-0 w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-800"
                      :class="form.weeklyDigest ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-slate-600'"
                    >
                      <span
                        class="inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300"
                        :class="form.weeklyDigest ? 'translate-x-[1.35rem]' : 'translate-x-1'"
                      />
                    </button>
                  </div>

                  <!-- Deal of the Day -->
                  <div class="flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors group">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-500 dark:text-amber-400 group-hover:scale-110 transition-transform">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      </div>
                      <div>
                        <p class="text-sm font-semibold text-gray-800 dark:text-white">Deal of the Day</p>
                        <p class="text-xs text-gray-500 dark:text-slate-400">Daily top deal recommendations</p>
                      </div>
                    </div>
                    <button
                      @click="form.dealOfTheDay = !form.dealOfTheDay"
                      role="switch"
                      :aria-checked="form.dealOfTheDay"
                      class="relative inline-flex items-center shrink-0 w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 dark:focus:ring-offset-slate-800"
                      :class="form.dealOfTheDay ? 'bg-amber-500' : 'bg-gray-200 dark:bg-slate-600'"
                    >
                      <span
                        class="inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300"
                        :class="form.dealOfTheDay ? 'translate-x-[1.35rem]' : 'translate-x-1'"
                      />
                    </button>
                  </div>
                </div>
              </section>

              <div class="border-t border-gray-100 dark:border-slate-700/50" />

              <!-- ── Section: Preferences ────────────────── -->
              <section>
                <h3 class="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                  Preferences
                </h3>

                <!-- Price Drop Threshold -->
                <div class="px-4 py-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                  <div class="flex items-center justify-between mb-3">
                    <div>
                      <p class="text-sm font-semibold text-gray-800 dark:text-white">Price Drop Threshold</p>
                      <p class="text-xs text-gray-500 dark:text-slate-400">Only alert when price drops by at least this percentage</p>
                    </div>
                    <span class="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-lg">{{ form.priceDropThreshold }}%</span>
                  </div>
                  <div class="flex items-center gap-2 flex-wrap">
                    <button
                      v-for="opt in thresholdOptions"
                      :key="opt"
                      @click="form.priceDropThreshold = opt"
                      :class="[
                        'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200',
                        form.priceDropThreshold === opt
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                          : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                      ]"
                    >
                      {{ opt }}%
                    </button>
                  </div>
                </div>

                <div class="border-t border-gray-100 dark:border-slate-700/30 mx-4 my-1" />

                <!-- Quiet Hours -->
                <div class="px-4 py-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400">
                        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                      </div>
                      <div>
                        <p class="text-sm font-semibold text-gray-800 dark:text-white">Quiet Hours</p>
                        <p class="text-xs text-gray-500 dark:text-slate-400">Pause notifications during set times</p>
                      </div>
                    </div>
                    <button
                      @click="form.quietHoursEnabled = !form.quietHoursEnabled"
                      role="switch"
                      :aria-checked="form.quietHoursEnabled"
                      class="relative inline-flex items-center shrink-0 w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 dark:focus:ring-offset-slate-800"
                      :class="form.quietHoursEnabled ? 'bg-slate-700 dark:bg-slate-500' : 'bg-gray-200 dark:bg-slate-600'"
                    >
                      <span
                        class="inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300"
                        :class="form.quietHoursEnabled ? 'translate-x-[1.35rem]' : 'translate-x-1'"
                      />
                    </button>
                  </div>

                  <Transition name="slide-down">
                    <div v-if="form.quietHoursEnabled" class="mt-3 flex items-center gap-3 ml-12">
                      <div class="space-y-1">
                        <label class="text-xs font-medium text-gray-500 dark:text-slate-400">From</label>
                        <input
                          v-model="form.quietHoursStart"
                          type="time"
                          class="block bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg py-1.5 px-3 text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <span class="text-gray-400 dark:text-slate-500 mt-5 font-medium">to</span>
                      <div class="space-y-1">
                        <label class="text-xs font-medium text-gray-500 dark:text-slate-400">Until</label>
                        <input
                          v-model="form.quietHoursEnd"
                          type="time"
                          class="block bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg py-1.5 px-3 text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>
                  </Transition>
                </div>
              </section>
            </div>

            <!-- Footer -->
            <div class="px-6 py-4 border-t border-gray-100 dark:border-slate-700/50 bg-gray-50/50 dark:bg-slate-900/50 flex items-center justify-end gap-3">
              <button
                @click="emit('close')"
                class="px-5 py-2.5 text-sm font-semibold text-gray-600 dark:text-slate-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                @click="handleSave"
                class="px-8 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-amber-500/25 dark:shadow-amber-900/30 active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
              >
                Save Settings
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-8px);
}
.slide-down-enter-to,
.slide-down-leave-from {
  max-height: 200px;
}

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
</style>
