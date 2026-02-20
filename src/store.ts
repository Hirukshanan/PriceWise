import { reactive } from 'vue';

// Load persisted favourites from localStorage
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

export const sharedData = reactive({
  searchQuery: '',
  favourites: loadFavourites() as number[],
});

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