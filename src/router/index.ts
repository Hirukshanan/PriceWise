import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      // :id is a dynamic parameter to load different products
      path: '/product/:id',
      name: 'product-detail',
      component: () => import('../views/ProductDetailView.vue')
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: () => import('../views/FavouritesView.vue')
    },
    {
      path: '/price-watch',
      name: 'price-watch',
      component: () => import('../views/PriceWatchView.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/AccountView.vue')
    }
  ]
});

export default router;