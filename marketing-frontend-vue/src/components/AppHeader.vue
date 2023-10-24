<template>
    <header id="background-color">
        <div class="container-fluid py-5 px-0 " style="margin-bottom: 45px;" :style="{ backgroundColor: backgroundColor }">
            <button v-if="authToken " id="colorPicker"></button>
            <div class="row mx-0 align-items-center">
              
                <div class="col-lg-6 px-md-5 text-center text-lg-left">

                    <div id="nouveau-modele" class="row">
                            <input v-if="authToken" type="text" class="col form-control form-control-sm" v-model="titre" @input="sauvegardeTitre">
                            <h1 class="col-12 display-3 text-uppercase mb-3">{{titre}}</h1>
                    </div>

                    <div id="description-modele" class="form-group row">
                        <p class="text-dark mb-4 col-12"><big>{{description}}</big></p>
                        <textarea v-if="authToken" v-model="description" @input="sauvegardeDescription" rows="1" class="form-control col"></textarea>
                    </div>    
                        
                    <!--<a href="concession.html" target="_parent" class="btn btn-dark text-uppercase mt-1 py-3 px-5">Démarrez l'expèrience</a>-->
                </div>

                    <div class="col-lg-6 px-0 text-right">
                        <label v-if="authToken" class="btn btn-primary button-primary btn-sm">
                            Changer la photo
                            <input type="file" @change="handleImageChange" style="display: none;">
                        </label>
                        <img :src="image64" :key="image64" alt="Photo">
                    </div>
                </div>   
          </div>
    </header>
</template>
  
  <script>
  import api from '../api/axiosInstance.js';
  import Cookies from 'js-cookie';
  export default {
    data() {
    return {
      backgroundColor:'#C68C0A',
      titre:"Veuillez mettre le modèle",
      description: "Voici le texte qui contiendra la description du salon ainsi que des modèles automobiles mis en vente",
      image64: "",
      authToken: Cookies.get('authToken'),

    };
  },

  methods: {
    async fetchInfos(){
      try {
        const response = await api.get('/infos');

        this.titre = response.data.titrePrincipal;
        this.description = response.data.description;
        this.backgroundColor= response.data.color;
        this.image64 = response.data.photo;
        
        if (this.titre === "" || this.titre === null) {
          this.titre = "Veuillez mettre le modèle";
        }
        if (this.description === "" || this.description === null) {
          this.description = "Voici le texte qui contiendra la description du salon ainsi que des modèles automobiles mis en vente";
        }
        if (this.backgroundColor === null) {
          this.backgroundColor = '#C68C0A';
        }
      } catch (error) {
        console.error('Error fetching infos:', error);
      }
    },
    async sauvegardeTitre() {
      try {
        const response = await api.put('/infos', { titrePrincipal: this.titre });
        if (response.status === 200) {
          console.log('Titre updated successfully');
        }
      } catch (error) {
          console.error('Error updating titre:', error);
      }
    },
    async sauvegardeDescription() {
      try {
        const response = await api.put('/infos', { description: this.description });
        if (response.status === 200) {
          console.log('Description updated successfully');
        }
      } catch (error) {
          console.error('Error updating description:', error);
      }
    },

    async handleImageChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = async () => {
        this.image64 = reader.result;
        
        try {
          // Envoyez la requête PUT avec le base64 dans le champ photo
          const response = await api.put('/infos', { photo: this.image64 });
          if (response.status === 200) {
            console.log('Image updated successfully');
          }
        } catch (error) {
          console.error('Error updating image:', error);
        }
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    },


    async saveColor() {
        try {
          const response = await api.put('/infos', { color: this.backgroundColor });
          if (response.status === 200) {
            console.log('Color updated successfully');
          }
        } catch (error) {
            console.error('Error updating color:', error);
        }
      }
  },

  mounted() {
    this.fetchInfos();
    if(this.authToken  ){

    
    const pickr = Pickr.create({
      el: '#colorPicker',
      theme: 'classic',
      default: this.backgroundColor,
      components: {   
        hue: true,
        interaction: {
          hex: true,
          rgba: true,
          hsla: true,
          hsva: true,
          cmyk: true,
          input: true,
          clear: true,
          save: true
        }
      }
    });

    pickr.on('save', color => {
      this.backgroundColor = color.toHEXA().toString();
      this.saveColor();
      pickr.hide();
    });
  }
  },
  }
  </script>
  