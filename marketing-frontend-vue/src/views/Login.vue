<template>
  <div>
    <img src="@/assets/logo.png" alt="Logo de l'application">
    <b-form class="login-form" @submit="onSubmit" v-if="show">
      
      <b-form-group id="input-group-1" label="Email address:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.password"
          type="password"
          placeholder="Enter password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" class="mb-3" variant="primary">Login</b-button>
      <b-button @click="onLogout" variant="danger" class="logout-button">Logout</b-button>
    </b-form>
    <!-- Afficher les messages d'erreur ici -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import api from '../api/axiosInstance.js';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      show: true,
      errorMessage: '', // Ajoutez la variable errorMessage
    };
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
  
      const formData = {
        email: this.form.email,
        password: this.form.password,
      };
  
      api.post('/admin/login', formData)
        .then(response => {
          const token = response.data.token; // Récupérez le token de la réponse
          console.log(token);
          // Stockez le token dans un cookie sécurisé ou un espace de stockage local
          // Par exemple, avec js-cookie
          Cookies.set('authToken', token);
          Cookies.set('user',"admin");
          alert('Authentification réussie');
          //Redirigez l'utilisateur vers la page de tableau de bord ou une autre page protégée
           this.$router.push('/admin');
        })
        .catch(error => {
          // Gérez les erreurs d'authentification ici
          if (error.response && error.response.status === 401) {
            // Erreur d'authentification, affichez le message d'erreur du serveur
            this.errorMessage = error.response.data.error;
          } else {
            // Erreur inattendue, affichez un message d'erreur générique
            this.errorMessage = 'Une erreur est survenue lors de l\'authentification.';
          }
        });
    },

    async onLogout(event) {
      event.preventDefault();
      Cookies.remove('authToken');
      Cookies.remove('user');
      alert('Déconnexion réussie');
      this.$router.push('/admin');
    }
  },
};
</script>

<style scoped>
img {
  display: block;
  margin: 100px auto;
  width: 400px;
}
.login-form {
  max-width: 1000px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
}

.login-form h2 {
  text-align: center;
  margin-bottom: 20px;
}

.login-form label {
  font-weight: bold;
}

.login-form input {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-form button {
  width: 100%;
  padding: 10px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-form button:hover {
  background-color: #0056b3;
}

.login-form .form-data-result {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f5f5f5;
  font-family: monospace;
}

.error-message {
  color: red;
  margin-top: 10px;
}
.login-form button.logout-button {
  background-color: #dc3545; /* Couleur rouge de Bootstrap 'danger' */
}
</style>
