<script setup lang="ts">
import { ref, watch } from 'vue';
import { sharedData, updateUserProfile } from '../../store';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

// Local form state, synced from store when modal opens
const formName = ref(sharedData.userProfile.name);
const formEmail = ref(sharedData.userProfile.email);
const formPhone = ref(sharedData.userProfile.phone);
const formLocation = ref(sharedData.userProfile.location);

const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const showPasswordSection = ref(false);

const saveMessage = ref('');
const saveStatus = ref<'success' | 'error' | ''>('');

// Sync form when modal opens
watch(() => props.isOpen, (open) => {
  if (open) {
    formName.value = sharedData.userProfile.name;
    formEmail.value = sharedData.userProfile.email;
    formPhone.value = sharedData.userProfile.phone;
    formLocation.value = sharedData.userProfile.location;
    currentPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';
    showPasswordSection.value = false;
    saveMessage.value = '';
    saveStatus.value = '';
  }
});

const handleSaveProfile = () => {
  if (!formName.value.trim()) {
    saveMessage.value = 'Name cannot be empty';
    saveStatus.value = 'error';
    return;
  }
  if (!formEmail.value.trim() || !formEmail.value.includes('@')) {
    saveMessage.value = 'Please enter a valid email';
    saveStatus.value = 'error';
    return;
  }

  updateUserProfile({
    name: formName.value.trim(),
    email: formEmail.value.trim(),
    phone: formPhone.value.trim(),
    location: formLocation.value.trim(),
  });

  saveMessage.value = 'Profile updated successfully!';
  saveStatus.value = 'success';
  setTimeout(() => {
    saveMessage.value = '';
    saveStatus.value = '';
  }, 3000);
};

const handleChangePassword = () => {
  if (!newPassword.value || newPassword.value.length < 6) {
    saveMessage.value = 'Password must be at least 6 characters';
    saveStatus.value = 'error';
    return;
  }
  if (newPassword.value !== confirmPassword.value) {
    saveMessage.value = 'Passwords do not match';
    saveStatus.value = 'error';
    return;
  }

  // Simulated password change
  saveMessage.value = 'Password changed successfully!';
  saveStatus.value = 'success';
  currentPassword.value = '';
  newPassword.value = '';
  confirmPassword.value = '';
  showPasswordSection.value = false;
  setTimeout(() => {
    saveMessage.value = '';
    saveStatus.value = '';
  }, 3000);
};

const handleBackdropClick = (e: MouseEvent) => {
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
            class="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <!-- Header -->
            <div class="px-6 py-5 border-b border-gray-100 dark:border-slate-700/50 flex items-center justify-between sticky top-0 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-800 dark:via-slate-800/80 dark:to-slate-900 z-10">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L9 18l-4 1 1-4 12.5-12.5z"/>
                  </svg>
                </div>
                <div>
                  <h2 class="text-xl font-bold text-gray-900 dark:text-white">Update Profile</h2>
                  <p class="text-xs text-gray-500 dark:text-slate-400">Manage your personal information</p>
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
            <div class="p-6 sm:p-8 overflow-y-auto custom-scrollbar space-y-8">
              <!-- Status Message -->
              <Transition name="fade">
                <div
                  v-if="saveMessage"
                  :class="[
                    'flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                    saveStatus === 'success'
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
                  ]"
                >
                  <svg v-if="saveStatus === 'success'" class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <svg v-else class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                  {{ saveMessage }}
                </div>
              </Transition>

              <!-- Avatar Section -->
              <div class="flex items-center gap-5">
                <div class="relative group">
                  <div class="w-20 h-20 rounded-2xl ring-2 ring-gray-100 dark:ring-slate-700 shadow-lg overflow-hidden bg-gray-100 dark:bg-slate-700">
                    <img :src="sharedData.userProfile.avatar" alt="User avatar" class="w-full h-full object-cover" />
                  </div>
                  <div class="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <svg class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <p class="font-bold text-gray-900 dark:text-white text-lg">{{ sharedData.userProfile.name }}</p>
                  <p class="text-sm text-gray-500 dark:text-slate-400">{{ sharedData.userProfile.email }}</p>
                  <p class="text-xs text-blue-500 dark:text-blue-400 mt-1 cursor-pointer hover:underline">Change photo</p>
                </div>
              </div>

              <div class="border-t border-gray-100 dark:border-slate-700/50" />

              <!-- Form Fields -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <!-- Name -->
                <div class="space-y-1.5">
                  <label class="block text-sm font-semibold text-gray-700 dark:text-slate-300">Full Name</label>
                  <div class="relative">
                    <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500">
                      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    </span>
                    <input
                      v-model="formName"
                      type="text"
                      class="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <!-- Email -->
                <div class="space-y-1.5">
                  <label class="block text-sm font-semibold text-gray-700 dark:text-slate-300">Email</label>
                  <div class="relative">
                    <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500">
                      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </span>
                    <input
                      :value="formEmail"
                      type="email"
                      readonly
                      class="w-full bg-gray-100 dark:bg-slate-900/60 border border-gray-200 dark:border-slate-600 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-500 dark:text-slate-400 cursor-not-allowed outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <!-- Phone -->
                <div class="space-y-1.5">
                  <label class="block text-sm font-semibold text-gray-700 dark:text-slate-300">Phone</label>
                  <div class="relative">
                    <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500">
                      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </span>
                    <input
                      v-model="formPhone"
                      type="tel"
                      class="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <!-- Location -->
                <div class="space-y-1.5">
                  <label class="block text-sm font-semibold text-gray-700 dark:text-slate-300">Location</label>
                  <div class="relative">
                    <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500">
                      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    </span>
                    <input
                      v-model="formLocation"
                      type="text"
                      class="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="City, Country"
                    />
                  </div>
                </div>
              </div>

              <!-- Save Profile Button -->
              <div class="pt-4">
                <button
                  @click="handleSaveProfile"
                  class="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/25 dark:shadow-blue-900/30 active:scale-[0.98] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
                >
                  Save Changes
                </button>
              </div>

              <div class="border-t border-gray-100 dark:border-slate-700/50 my-1" />

              <!-- Password Section -->
              <div class="pt-1">
                <button
                  @click="showPasswordSection = !showPasswordSection"
                  class="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  Change Password
                  <svg :class="['w-4 h-4 transition-transform duration-200', showPasswordSection ? 'rotate-180' : '']" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>

                <Transition name="slide-down">
                  <div v-if="showPasswordSection" class="mt-4 space-y-4 p-4 bg-gray-50 dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-700">
                    <div class="space-y-1.5">
                      <label class="block text-sm font-medium text-gray-600 dark:text-slate-400">Current Password</label>
                      <input
                        v-model="currentPassword"
                        type="password"
                        class="w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl py-2.5 px-4 text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div class="space-y-1.5">
                        <label class="block text-sm font-medium text-gray-600 dark:text-slate-400">New Password</label>
                        <input
                          v-model="newPassword"
                          type="password"
                          class="w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl py-2.5 px-4 text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          placeholder="Min 6 characters"
                        />
                      </div>
                      <div class="space-y-1.5">
                        <label class="block text-sm font-medium text-gray-600 dark:text-slate-400">Confirm Password</label>
                        <input
                          v-model="confirmPassword"
                          type="password"
                          class="w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl py-2.5 px-4 text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          placeholder="Re-enter password"
                        />
                      </div>
                    </div>
                    <button
                      @click="handleChangePassword"
                      class="px-6 py-2 bg-slate-800 dark:bg-slate-600 hover:bg-slate-700 dark:hover:bg-slate-500 text-white font-semibold text-sm rounded-xl active:scale-[0.98] transition-all"
                    >
                      Update Password
                    </button>
                  </div>
                </Transition>
              </div>
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
  max-height: 500px;
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
