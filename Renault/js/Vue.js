
// Fonction qui permet d'initialiser Vue.js

/*****************************************
Modification du titre principal
******************************************/
const header = Vue.createApp({
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

/****************************************
 Modification de la zone de 
*****************************************/
const app = Vue.createApp({
  data() {
    return {
      backgroundColor: localStorage.getItem('backgroundColor') || '#FFFFFF',
      imagePath: 'P:\RSI\Marketing\Site de rendez vous\Renault\img\header.png',
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

    document.getElementById('colorPicker').addEventListener('click', () => {
      pickr.show();
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
});
app.mount('#background-color');

const appDeroulante = Vue.createApp({
  setup() {
    const section = Vue.reactive({
      value: ''
    });

    const changeSection = (newSection) => {
      console.log('Changing section to:', newSection);
      section.value = newSection;
    };

    console.log('Component mounted');

    return {
      section,
      changeSection,
    };
  },
});

appDeroulante.mount('#menu_deroulant_container');
