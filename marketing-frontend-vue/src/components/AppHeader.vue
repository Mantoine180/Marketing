<template>
    <header id="background-color">
        <div class="container-fluid py-5 px-0 " style="margin-bottom: 45px;" :style="{ backgroundColor: backgroundColor }">
            <button id="colorPicker"></button>
            <div class="row mx-0 align-items-center">
                <div class="col-lg-6 px-md-5 text-center text-lg-left">

                    <div id="nouveau-modele" class="row">
                            <input type="text" class="col form-control form-control-sm" v-model="titre" @input="sauvegardeTitre">
                            <input type="checkbox" id="blankCheckbox" class="col-auto" value="option1" aria-label="...">
                            <h1 class="col-12 display-2 text-uppercase mb-3">{{titre}}</h1>
                    </div>

                    <div id="description-modele" class="form-group row">
                        <p class="text-dark mb-4 col-12"><big>{{description}}</big></p>
                        <textarea v-model="description" @input="sauvegardeDescription" rows="1" class="form-control col"></textarea>
                        <input type="checkbox" id="blankCheckbox" value="option1" aria-label="..." class="col-auto">
                    </div>    
                        <a href="concession.html" target="_parent" class="btn btn-dark text-uppercase mt-1 py-3 px-5">Démarrez l'expèrience</a>
                    </div>

                    <div id="photo-change" class="col-lg-6 px-0 text-right">
                        <label class="btn btn-primary button-primary btn-sm">
                            Changer la photo
                            <input type="file" @change="handleImageChange" style="display: none;">
                        </label>
                        <img :src="imagePath" :key="imagePath" alt="Photo">
                    </div>
                </div>   
            </div>
    </header>
</template>
  
  <script>
  export default {
    data() {
    return {
      backgroundColor: localStorage.getItem('backgroundColor') || '#FFFFFF',

      titre: "Veullez mettre le modèle",
      description: "Voici le texte qui contiendra la description du salon ainsi que des modèles automobiles mis en vente"
    };
  },

  methods: {
    sauvegardeTitre() {
      localStorage.setItem('messageModele', this.titre);
    },
    sauvegardeDescription() {
      localStorage.setItem('description-texte', this.description);
    },
    handleImageChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePath = reader.result;
        localStorage.setItem('savedImage', this.imagePath);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  },

  created() {
    const savedImage = localStorage.getItem('savedImage');
    if (savedImage) {
      this.imagePath = savedImage;
    }
  },

  mounted() {
    const messageSauvegarde = localStorage.getItem('messageModele');
    if (messageSauvegarde) {
      this.titre = messageSauvegarde;
    }

    const messageDescription = localStorage.getItem('description-texte');
    if (messageDescription) {
      this.description = messageDescription;
    }

    const pickr = Pickr.create({
      el: '#colorPicker',
      theme: 'classic',
      default: this.backgroundColor,
      components: {
        preview: true,
        opacity: true,
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
      pickr.hide();
    });
  },

  beforeUnmount() {
    localStorage.setItem('savedImage', this.imagePath);
  },

  watch: {
    backgroundColor(newColor) {
      localStorage.setItem('backgroundColor', newColor);
    }
  }
  }
  </script>
  