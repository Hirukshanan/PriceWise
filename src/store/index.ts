import { reactive } from 'vue';
import type { StoredAlert } from '../types/alert';
import type { Product } from '../types/product';

// ─── Generic localStorage Helpers ───────────────────────────────
function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

// ─── User Profile ───────────────────────────────────────────────
export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
}

const defaultProfile: UserProfile = {
  name: 'user',
  email: 'user@pricewise.com',
  phone: '',
  location: '',
  avatar: 'https://tse2.mm.bing.net/th/id/OIP.U_1oQ5CZ0Kl2L6UggZwlpwAAAA?w=256&h=256&rs=1&pid=ImgDetMain&o=7&rm=3',
};

// ─── Notification Settings ──────────────────────────────────────
export interface NotificationSettings {
  emailAlerts: boolean;
  pushNotifications: boolean;
  priceDropAlerts: boolean;
  backInStockAlerts: boolean;
  weeklyDigest: boolean;
  dealOfTheDay: boolean;
  priceDropThreshold: number;
  quietHoursEnabled: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
}

const defaultNotificationSettings: NotificationSettings = {
  emailAlerts: true,
  pushNotifications: true,
  priceDropAlerts: true,
  backInStockAlerts: false,
  weeklyDigest: true,
  dealOfTheDay: false,
  priceDropThreshold: 10,
  quietHoursEnabled: false,
  quietHoursStart: '22:00',
  quietHoursEnd: '07:00',
};

// ─── Dark Mode ──────────────────────────────────────────────────
function loadDarkMode(): boolean {
  try {
    const stored = localStorage.getItem('pricewise_dark_mode');
    if (stored !== null) return stored === 'true';
    // Respect system preference as default
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  } catch {
    return false;
  }
}

// ─── Registered Users ───────────────────────────────────────────
export interface RegisteredUser {
  name: string;
  email: string;
  password: string;
}

// ─── Comparison History ─────────────────────────────────────────
export type HistoryItem = Pick<Product, 'id' | 'title' | 'brand' | 'price' | 'thumbnail'>;

// ─── Shared Reactive State ──────────────────────────────────────
export const sharedData = reactive({
  searchQuery: '',
  favourites: loadFromStorage<number[]>('pricewise_favourites', []),
  alerts: loadFromStorage<StoredAlert[]>('pricewise_alerts', []),
  history: loadFromStorage<HistoryItem[]>('pricewise_history', []),
  sidebarOpen: false,
  isLoggedIn: localStorage.getItem('pricewise_logged_in') === 'true',
  userProfile: { ...defaultProfile, ...loadFromStorage<Partial<UserProfile>>('pricewise_user_profile', {}) },
  notificationSettings: { ...defaultNotificationSettings, ...loadFromStorage<Partial<NotificationSettings>>('pricewise_notification_settings', {}) },
  isDarkMode: loadDarkMode(),
});

// Apply dark mode class on initial load
if (sharedData.isDarkMode) {
  document.documentElement.classList.add('dark');
}

// ─── Dark Mode Actions ──────────────────────────────────────────
export function toggleDarkMode() {
  sharedData.isDarkMode = !sharedData.isDarkMode;
  document.documentElement.classList.toggle('dark', sharedData.isDarkMode);
  localStorage.setItem('pricewise_dark_mode', String(sharedData.isDarkMode));
}

// ─── Auth Actions ───────────────────────────────────────────────
export function registerUser(name: string, email: string, password: string): { success: boolean; error?: string } {
  const users = loadFromStorage<RegisteredUser[]>('pricewise_registered_users', []);

  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, error: 'An account with this email already exists' };
  }

  users.push({ name, email, password });
  saveToStorage('pricewise_registered_users', users);

  // Auto-login after registration
  sharedData.isLoggedIn = true;
  localStorage.setItem('pricewise_logged_in', 'true');

  sharedData.userProfile = { ...sharedData.userProfile, name, email };
  saveToStorage('pricewise_user_profile', sharedData.userProfile);

  return { success: true };
}

export function loginUser(email: string, password: string): { success: boolean; error?: string } {
  const users = loadFromStorage<RegisteredUser[]>('pricewise_registered_users', []);
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return { success: false, error: 'No account found with this email' };
  }
  if (user.password !== password) {
    return { success: false, error: 'Incorrect password' };
  }

  sharedData.isLoggedIn = true;
  localStorage.setItem('pricewise_logged_in', 'true');

  sharedData.userProfile = { ...sharedData.userProfile, name: user.name, email: user.email };
  saveToStorage('pricewise_user_profile', sharedData.userProfile);

  return { success: true };
}

export function logout() {
  sharedData.isLoggedIn = false;
  localStorage.setItem('pricewise_logged_in', 'false');
  sharedData.sidebarOpen = false;
}

// ─── Profile Actions ────────────────────────────────────────────
export function updateUserProfile(updates: Partial<UserProfile>) {
  Object.assign(sharedData.userProfile, updates);
  saveToStorage('pricewise_user_profile', sharedData.userProfile);
}

// ─── Notification Settings Actions ──────────────────────────────
export function updateNotificationSettings(updates: Partial<NotificationSettings>) {
  Object.assign(sharedData.notificationSettings, updates);
  saveToStorage('pricewise_notification_settings', sharedData.notificationSettings);
}

// ─── Favourite Actions ──────────────────────────────────────────
export function toggleFavourite(id: number) {
  const index = sharedData.favourites.indexOf(id);
  if (index === -1) {
    sharedData.favourites.push(id);
  } else {
    sharedData.favourites.splice(index, 1);
  }
  saveToStorage('pricewise_favourites', sharedData.favourites);
}

export function isFavourite(id: number): boolean {
  return sharedData.favourites.includes(id);
}

// ─── Alert Actions ──────────────────────────────────────────────
export function addAlert(productId: number, targetPrice: number) {
  if (!hasAlert(productId)) {
    sharedData.alerts.push({ productId, targetPrice });
    saveToStorage('pricewise_alerts', sharedData.alerts);
  }
}

export function removeAlert(productId: number) {
  sharedData.alerts = sharedData.alerts.filter(a => a.productId !== productId);
  saveToStorage('pricewise_alerts', sharedData.alerts);
}

export function updateAlertTarget(productId: number, targetPrice: number) {
  const alert = sharedData.alerts.find(a => a.productId === productId);
  if (alert) {
    alert.targetPrice = targetPrice;
    saveToStorage('pricewise_alerts', sharedData.alerts);
  }
}

export function hasAlert(productId: number): boolean {
  return sharedData.alerts.some(a => a.productId === productId);
}

// ─── History Actions ────────────────────────────────────────────
export function addToHistory(product: Product) {
  sharedData.history = sharedData.history.filter(item => item.id !== product.id);

  sharedData.history.unshift({
    id: product.id,
    title: product.title,
    brand: product.brand || 'Unknown Brand',
    price: product.price,
    thumbnail: product.thumbnail
  });

  // Keep only the last 20 items
  if (sharedData.history.length > 20) {
    sharedData.history = sharedData.history.slice(0, 20);
  }

  saveToStorage('pricewise_history', sharedData.history);
}

export function clearHistory() {
  sharedData.history = [];
  saveToStorage('pricewise_history', sharedData.history);
}
