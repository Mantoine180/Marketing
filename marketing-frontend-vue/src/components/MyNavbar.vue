<template>
    <div class="container-fluid bg-white position-relative">
        <nav class="navbar navbar-expand-xl bg-white navbar-light py-3 py-lg-0">

                <router-link to="/" class="navbar-brand text-secondary">
                    <h1 class="display-4 text-uppercase">{{titre}}</h1>
                </router-link> 
                <input v-if="authToken " type="text" class="form-control form-control-sm col-md-3 mb-3" v-model="titre" @input="sauvegardeTitre">
                <input  type="checkbox" id="blankCheckbox" value="option1" aria-label="...">
            
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav ml-auto">
                    <div class="d-none d-xl-flex align-items-center pl-4"> 
                        <img src="img/GROUPEPEYROT_Logo_RVB_Positif_72dpi_ok_format_logo.png" width="300">
                    </div>
                </ul>
            </div>
            <div class="text-center my-3">
</div>
        </nav>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import api from '../api/axiosInstance.js';
export default {
    name: "MyNavbar",
    data() {
        return {
            authToken: Cookies.get('authToken'),
            titre: "Veuillez mettre la date de l'exposition"
        };
    },

    methods: {
        async fetchTitre() {
            try {
                
                const response = await api.get('/infos');
                this.titre = response.data.annonce;
                if (this.titre === "" || this.titre === null) {
                    this.titre = "Veuillez mettre le modèle";
                }
            } catch (error) {
                console.error('Error fetching titre:', error);
            }
        },
        
        async sauvegardeTitre() {
        try {
            const response = await api.put('/infos', { annonce: this.titre });
            console.log(this.authToken);
            if (response.status === 200) {
                console.log('Titre updated successfully');
            }
        } catch (error) {
            console.error('Error updating titre:', error);
        }
        }
    },

    mounted() {
        this.fetchTitre();

    }
}
</script>
