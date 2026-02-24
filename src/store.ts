import { reactive } from 'vue';
import type { StoredAlert } from './types/alert';

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

// ─── Shared Reactive State ──────────────────────────────────────
export const sharedData = reactive({
  searchQuery: '',
  favourites: loadFavourites() as number[],
  alerts: loadAlerts() as StoredAlert[],
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
