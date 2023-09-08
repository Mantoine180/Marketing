<template>
    <div class="container-fluid bg-white position-relative">
        <nav class="navbar navbar-expand-xl bg-white navbar-light py-3 py-lg-0">

                <router-link to="/" class="navbar-brand text-secondary">
                    <h1 class="display-4 text-uppercase">{{titre}}</h1>
                </router-link> 
                <input type="text" class="form-control form-control-sm col-md-3 mb-3" v-model="titre" @input="sauvegardeTitre">
                <input type="checkbox" id="blankCheckbox" value="option1" aria-label="...">
            
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
import api from '../api/axiosInstance.js';
export default {
    name: "MyNavbar",
    data() {
        return {
            titre: "Veuillez mettre la date de l'exposition"
        };
    },

    methods: {
        async sauvegardeTitre() {
        try {
            const response = await api.put('/infos', { annonce: this.titre });

            if (response.status === 200) {
                console.log('Titre updated successfully');
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                // Si la ligne n'existe pas, envoyez une requête POST pour la créer
                try {
                    const postResponse = await api.post('/infos', { annonce: this.titre });
                    console.log('Titre added successfully', postResponse.data);
                } catch (postError) {
                    console.error('Error adding titre:', postError);
                }
            } else {
                console.error('Error updating titre:', error);
            }
        }
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
