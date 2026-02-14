import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductDetailView from '../views/ProductDetailView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/product/:id', component: ProductDetailView, props: true }
];

export const router = createRouter({
  history: createWebHistory(),
  routes
});