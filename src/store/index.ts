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

// ─── Shared Reactive State ──────────────────────────────────────
export const sharedData = reactive({
  searchQuery: '',
  favourites: loadFavourites() as number[],
  alerts: loadAlerts() as StoredAlert[],
  history: loadHistory() as HistoryItem[],
  sidebarOpen: false,
});

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
