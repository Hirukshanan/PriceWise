import { reactive } from 'vue';
import type { StoredAlert } from '../types/alert';
import type { Product } from '../types/product';

// ─── Favourites ─────────────────────────────────────────────────
function loadFavourites(): number[] {
  try {
    const stored = localStorage.getItem('pricewise_favourites');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveFavourites(ids: number[]) {
  localStorage.setItem('pricewise_favourites', JSON.stringify(ids));
}

// ─── Price Alerts ───────────────────────────────────────────────
function loadAlerts(): StoredAlert[] {
  try {
    const stored = localStorage.getItem('pricewise_alerts');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveAlerts(alerts: StoredAlert[]) {
  localStorage.setItem('pricewise_alerts', JSON.stringify(alerts));
}

// ─── Comparison History ─────────────────────────────────────────
export type HistoryItem = Pick<Product, 'id' | 'title' | 'brand' | 'price' | 'thumbnail'>;

function loadHistory(): HistoryItem[] {
  try {
    const stored = localStorage.getItem('pricewise_history');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveHistory(history: HistoryItem[]) {
  localStorage.setItem('pricewise_history', JSON.stringify(history));
}

// ─── Auth State ─────────────────────────────────────────────────
function loadIsLoggedIn(): boolean {
  try {
    return localStorage.getItem('pricewise_logged_in') === 'true';
  } catch {
    return false;
  }
}

function saveIsLoggedIn(status: boolean) {
  localStorage.setItem('pricewise_logged_in', status ? 'true' : 'false');
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

function loadUserProfile(): UserProfile {
  try {
    const stored = localStorage.getItem('pricewise_user_profile');
    return stored ? { ...defaultProfile, ...JSON.parse(stored) } : { ...defaultProfile };
  } catch {
    return { ...defaultProfile };
  }
}

function saveUserProfile(profile: UserProfile) {
  localStorage.setItem('pricewise_user_profile', JSON.stringify(profile));
}

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

function loadNotificationSettings(): NotificationSettings {
  try {
    const stored = localStorage.getItem('pricewise_notification_settings');
    return stored ? { ...defaultNotificationSettings, ...JSON.parse(stored) } : { ...defaultNotificationSettings };
  } catch {
    return { ...defaultNotificationSettings };
  }
}

function saveNotificationSettings(settings: NotificationSettings) {
  localStorage.setItem('pricewise_notification_settings', JSON.stringify(settings));
}

// ─── Registered Users ───────────────────────────────────────────
export interface RegisteredUser {
  name: string;
  email: string;
  password: string;
}

function loadRegisteredUsers(): RegisteredUser[] {
  try {
    const stored = localStorage.getItem('pricewise_registered_users');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveRegisteredUsers(users: RegisteredUser[]) {
  localStorage.setItem('pricewise_registered_users', JSON.stringify(users));
}

// ─── Shared Reactive State ──────────────────────────────────────
export const sharedData = reactive({
  searchQuery: '',
  favourites: loadFavourites() as number[],
  alerts: loadAlerts() as StoredAlert[],
  history: loadHistory() as HistoryItem[],
  sidebarOpen: false,
  isLoggedIn: loadIsLoggedIn(),
  userProfile: loadUserProfile(),
  notificationSettings: loadNotificationSettings(),
});

// ─── Auth Actions ───────────────────────────────────────────────
export function registerUser(name: string, email: string, password: string): { success: boolean; error?: string } {
  const users = loadRegisteredUsers();

  // Check if email already exists
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, error: 'An account with this email already exists' };
  }

  // Save the new user
  users.push({ name, email, password });
  saveRegisteredUsers(users);

  // Auto-login after registration
  sharedData.isLoggedIn = true;
  saveIsLoggedIn(true);

  // Set profile from registration data
  sharedData.userProfile = {
    ...sharedData.userProfile,
    name,
    email,
  };
  saveUserProfile(sharedData.userProfile);

  return { success: true };
}

export function loginUser(email: string, password: string): { success: boolean; error?: string } {
  const users = loadRegisteredUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return { success: false, error: 'No account found with this email' };
  }

  if (user.password !== password) {
    return { success: false, error: 'Incorrect password' };
  }

  // Successful login
  sharedData.isLoggedIn = true;
  saveIsLoggedIn(true);

  // Load user profile
  sharedData.userProfile = {
    ...sharedData.userProfile,
    name: user.name,
    email: user.email,
  };
  saveUserProfile(sharedData.userProfile);

  return { success: true };
}

export function login() {
  sharedData.isLoggedIn = true;
  saveIsLoggedIn(true);
}

export function logout() {
  sharedData.isLoggedIn = false;
  saveIsLoggedIn(false);
  sharedData.sidebarOpen = false;
}

// ─── Profile Actions ────────────────────────────────────────────
export function updateUserProfile(updates: Partial<UserProfile>) {
  Object.assign(sharedData.userProfile, updates);
  saveUserProfile(sharedData.userProfile);
}

// ─── Notification Settings Actions ──────────────────────────────
export function updateNotificationSettings(updates: Partial<NotificationSettings>) {
  Object.assign(sharedData.notificationSettings, updates);
  saveNotificationSettings(sharedData.notificationSettings);
}

// ─── Favourite Actions ──────────────────────────────────────────
export function toggleFavourite(id: number) {
  const index = sharedData.favourites.indexOf(id);
  if (index === -1) {
    sharedData.favourites.push(id);
  } else {
    sharedData.favourites.splice(index, 1);
  }
  saveFavourites(sharedData.favourites);
}

export function isFavourite(id: number): boolean {
  return sharedData.favourites.includes(id);
}

// ─── Alert Actions ──────────────────────────────────────────────
export function addAlert(productId: number, targetPrice: number) {
  if (!hasAlert(productId)) {
    sharedData.alerts.push({ productId, targetPrice });
    saveAlerts(sharedData.alerts);
  }
}

export function removeAlert(productId: number) {
  sharedData.alerts = sharedData.alerts.filter(a => a.productId !== productId);
  saveAlerts(sharedData.alerts);
}

export function updateAlertTarget(productId: number, targetPrice: number) {
  const alert = sharedData.alerts.find(a => a.productId === productId);
  if (alert) {
    alert.targetPrice = targetPrice;
    saveAlerts(sharedData.alerts);
  }
}

export function hasAlert(productId: number): boolean {
  return sharedData.alerts.some(a => a.productId === productId);
}

// ─── History Actions ────────────────────────────────────────────
export function addToHistory(product: Product) {
  // Remove if it already exists to put it at the front
  sharedData.history = sharedData.history.filter(item => item.id !== product.id);

  // Add to the front of the array
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

  saveHistory(sharedData.history);
}

export function clearHistory() {
  sharedData.history = [];
  saveHistory(sharedData.history);
}
