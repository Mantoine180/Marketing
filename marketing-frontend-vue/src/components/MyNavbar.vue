<template>
    <div class="container-fluid bg-white position-relative">
        <nav class="navbar navbar-expand-xl bg-white navbar-light py-3 py-lg-0">
            <div id ="titre-principal" class="form-check">
                <a href="index.html" class="navbar-brand text-secondary">
                    <h1 class="display-4 text-uppercase">{{titre}}</h1>
                </a>
                <input type="text" class="form-control form-control-sm col-md-3 mb-3" v-model="titre" @input="sauvegardeTitre">
                <input type="checkbox" id="blankCheckbox" value="option1" aria-label="...">
            </div>
            <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav ml-auto">
                <div class="d-none d-xl-flex align-items-center pl-4"> 
                    <img src="img/GROUPEPEYROT_Logo_RVB_Positif_72dpi_ok_format_logo.png" width="300">
                </div>
            </ul>
            </div>
        </nav>
    </div>
  </template>
  
  <script>
  export default {
    name: "MyNavbar",
    data() {
        return {
            titre: "Veuillez mettre la date de l'exposition"
        };
    },

  methods: {
    sauvegardeTitre() {
      localStorage.setItem('messageSauvegarde', this.titre);
    }
     },

  mounted() {
        const messageSauvegarde = localStorage.getItem('messageSauvegarde');
        if (messageSauvegarde) {
        this.titre = messageSauvegarde;
        }
    }
  }
  </script>
  