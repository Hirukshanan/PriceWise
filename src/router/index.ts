import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductDetailView from '../views/ProductDetailView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      // :id is a dynamic parameter to load different products
      path: '/product/:id',
      name: 'product-detail',
      component: ProductDetailView
    }
  ]
});

export default router;