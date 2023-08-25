import { createRouter, createWebHistory } from 'vue-router';
import AppVue from '../views/admin/PageAdmin.vue';
import AppVue from '../views/admin/PageAdmin.vue';
import Login from '../views/Login.vue'; // Assurez-vous que ce chemin est correct!

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppVue
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
});

export default router;
