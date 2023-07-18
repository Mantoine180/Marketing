// Fonction qui permet d'initialiser Vue.js


/*****************************************
Modification de la photo
****************************************** 
*****************************************/
changePhoto = Vue.createApp({
  data() {
    return {
      imagePath: ''
    };
  },
  methods: {
    openFileExplorer() {
      this.$refs.fileInput.click();
    },
    handleImageChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePath = reader.result;
        localStorage.setItem('savedImage', this.imagePath); // Sauvegarder l'image dans le localStorage
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
  beforeUnmount() {
    localStorage.setItem('savedImage', this.imagePath); // Sauvegarder l'image dans le localStorage avant la destruction de l'application
  }
});

changePhoto.mount('#photo-change');
/*****************************************
****************************************** 
*****************************************/

/*****************************************
Modification du titre principal
****************************************** 
*****************************************/
header=Vue.createApp({
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
});
header.mount('#titre-principal'); 
/*****************************************
****************************************** 
*****************************************/

/*****************************************
Modification du titre du body
****************************************** 
*****************************************/
nouveauModele=Vue.createApp({
    data() {
        return {
            titre: "Veullez mettre le modèle"
        };
    },

    methods: {
        sauvegardeTitre() {
          localStorage.setItem('messageModele', this.titre);
        }
      },
    
      mounted() {
        const messageSauvegarde = localStorage.getItem('messageModele');
        if (messageSauvegarde) {
          this.titre = messageSauvegarde;
        }
      }
});
nouveauModele.mount('#nouveau-modele'); 
/*****************************************
****************************************** 
*****************************************/

descriptionModele=Vue.createApp({
    data() {
        return {
            description:"Voici le texte qui contiendra la description du salon ainsi que des modèles automobiles mis en vente"
        };
    },

    methods: {
        sauvegardeDescription() {
          localStorage.setItem('description-texte', this.description);
        }
      },
    
      mounted() {
        const messageSauvegarde = localStorage.getItem('description-texte');
        if (messageSauvegarde) {
          this.description = messageSauvegarde;
        }
      }
});
descriptionModele.mount('#description-modele');

const app = Vue.createApp({
  data() {
      return {
        backgroundColor: localStorage.getItem('backgroundColor') || '#FFFFFF',
        imagePath: localStorage.getItem('savedImage') || '',
        titreHeader: localStorage.getItem('messageSauvegarde') || "Veuillez mettre la date de l'exposition",
        titreModele: localStorage.getItem('messageModele') || "Veullez mettre le modèle",
        description: localStorage.getItem('description-texte') || "Voici le texte qui contiendra la description du salon ainsi que des modèles automobiles mis en vente"
      }
  },
  mounted() {
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

      document.getElementById('colorPicker').addEventListener('click', () => {
          pickr.show();
      });
  },
  watch: {
      backgroundColor(newColor) {
          localStorage.setItem('backgroundColor', newColor);
      },
      titre(newTitre) {
          localStorage.setItem('titre', newTitre);
      },
      description(newDescription) {
          localStorage.setItem('description', newDescription);
      }
  }
});
app.mount('#background-color');
// ... autres applications Vue.js




