import { createRouter, createWebHistory } from 'vue-router';
import AppVue from '../views/PageAdmin.vue';
import Login from '../views/Login.vue'; // Assurez-vous que ce chemin est correct!
//import AdminDashboard from '../views/AdminDashboard.vue';
import Cookies from 'js-cookie';
import api from '../api/axiosInstance.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppVue,

      beforeEnter: (to, from, next) => {
        // Vérifiez si le cookie authToken n'existe pas
        if (Cookies.get('authToken')) {
          // Définissez le cookie authToken sur 'false'
          Cookies.set('user',"admin");
          console.log('authToken', Cookies.get('authToken'));
        }
        // L'utilisateur est authentifié, autorisez l'accès à la route d'administration
        next();
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      name: 'AdminDashboard',
      component: AppVue,
      beforeEnter: async (to, from, next) => {
        const authToken = Cookies.get('authToken');
        if (authToken) {
          // Effectuez une requête au serveur pour vérifier si le token est valide
          try {
            const response = await api.get('/admin/verify');
    
            if (response.status === 200) {
              // Le token est valide, autorisez l'accès à la route d'administration
              Cookies.set('user',"admin");
              next();
            } else {
              // Le token est invalide, redirigez l'utilisateur vers la page de connexion
              next('/login');
            }
          } catch (error) {
            // En cas d'erreur lors de la vérification, redirigez l'utilisateur vers la page de connexion par sécurité
            next('/login');
          }
        } else {
          // L'utilisateur n'a pas de token, redirigez-le vers la page de connexion
          next('/login');
        }
      }
    }
  ]
});

export default router;
