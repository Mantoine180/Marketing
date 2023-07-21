
const appDeroulante = Vue.createApp({
  
  data() {
    return {
      horaires:[],
      concessions: [],
      section: '',
      concessionInput: ''
    };
  },
  methods: {
    changeSection(newSection) {
      this.section = newSection;
    },
    async fetchConcessions() {
      try {
        const response = await fetch('http://localhost:3000/api/concession');
        const data = await response.json();
        this.concessions = data;
      } catch (error) {
        console.error('Error fetching concessions:', error);
      }
    },
    async ajouterConcession() {
      const nouvelleConcession = this.concessionInput.trim();

  // Vérifiez si nouvelleConcession n'est pas vide avant de l'envoyer au serveur
      if (nouvelleConcession !== '' && !this.concessions.includes(nouvelleConcession)) {
        this.concessions.push(nouvelleConcession);
        try {
          const response = await fetch('http://localhost:3000/api/concession', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nomConcession: nouvelleConcession }) // Assurez-vous que la clé est "nomConcession"
          });
          const data = await response.json();
          this.concessionInput = ''; // Réinitialiser l'entrée de la concession
        } catch (error) {
          console.error('Error adding concession:', error);
        }
      }
    },
    supprimerConcession(concession){
      const index = this.concessions.indexOf(concession);
      if (index !== -1) {
        this.concessions.splice(index, 1);
      }
    },
    supprimerConcessions(){
      this.concessions=[];
    }
  },
  mounted(){
    this.fetchConcessions();
  },
});

appDeroulante.mount('#menu_deroulant_container');

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





