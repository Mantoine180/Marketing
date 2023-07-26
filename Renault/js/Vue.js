
const appDeroulante = Vue.createApp({
  
  data() {
    return {
      horaires:[],
      concessions: [],
      section: '',
      concessionInput: '',

      morningStart: '', // Propriété pour stocker la valeur de l'heure de début du matin
      pauseTime: '', // Propriété pour stocker la valeur de l'heure de la pause
      afternoonStart: '', // Propriété pour stocker la valeur de l'heure de début de l'après-midi
      afternoonEnd: '', // Propriété pour stocker la valeur de l'heure de fin de l'après-midi
      ecartCreneaux: null, 
    };
  },
  methods: {
    changeSection(newSection) {
      this.section = newSection;
    },

    /**************************************************************************************
    * 
    * Chercher une concession dans la base de données
    * 
    ***************************************************************************************/
    async fetchConcessions() {
      try {
        const response = await fetch('http://localhost:3000/api/concession');
        const data = await response.json();
        this.concessions = data;
      } catch (error) {
        console.error('Error fetching concessions:', error);
      }
    },
    /***************************************************************************************
    **************************************************************************************** 
    ****************************************************************************************/
    async fetchHoraires() {
      try {
        const response = await fetch('http://localhost:3000//api/horaires');
        const data = await response.json();
        this.horaires = data;
      } catch (error) {
        console.error('Error fetching concessions:', error);
      }
    },
    /**************************************************************************************
    * 
    * Ajouter une concession
    * 
    ***************************************************************************************/
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
    /***************************************************************************************
    **************************************************************************************** 
    ***************************************************************************************/

    /**************************************************************************************
    * 
    * Supprimer une concession
    * 
    ***************************************************************************************/
    async supprimerConcession(concession) {
      const index = this.concessions.indexOf(concession);
      if (index !== -1) {
        try {
          const response = await fetch(`http://localhost:3000/api/concession/${encodeURIComponent(concession)}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (response.ok) {
            this.concessions.splice(index, 1);
            console.log('Concession deleted successfully');
          } else {
            console.error('Error deleting the concession:', response.statusText);
          }
        } catch (error) {
          console.error('Error deleting the concession:', error);
        }
      }
    }, 
    /***************************************************************************************
    **************************************************************************************** 
    ****************************************************************************************/

    /**************************************************************************************
    * 
    * Supprimer toute les concessions
    * 
    ***************************************************************************************/
    async supprimerConcessions(){
      this.concessions=[];
      try {
        const response = await fetch('http://localhost:3000/api/concession', {method: 'DELETE'});
        const data = await response.json();
      } catch (error) {
        console.error('Error deleting concessions:', error);
      }
    },
    /***************************************************************************************
    **************************************************************************************** 
    ***************************************************************************************/
    
    ajouterHoraires() {
      // Utilisez les valeurs des propriétés pour appeler votre fonction ajouterHoraires()
      const values = {
        morningStart: this.morningStart,
        pauseTime: this.pauseTime,
        afternoonStart: this.afternoonStart,
        afternoonEnd: this.afternoonEnd,
        ecartCreneaux: this.ecartCreneaux,
      };

      // Appelez votre fonction ajouterHoraires() avec les valeurs récupérées
      // Ici, vous pouvez envoyer les données au serveur ou effectuer toute autre action requise
      console.log(values);
      
      let morningStartObj =new Date(`2000-01-01T${values.morningStart}:00`);
      let morningPauseObj =new Date(`2000-01-01T${values.pauseTime}:00`);
      let afternoonStartObj =new Date(`2000-01-01T${values.afternoonStart}:00`);
      let afternoonEndObj=new Date(`2000-01-01T${values.afternoonEnd}:00`);


      this.horaires = [];
      // Boucle pour créer les créneaux horaires
      this.ajoutertableau(morningStartObj,morningPauseObj,values.ecartCreneaux);
      this.ajoutertableau(afternoonStartObj,afternoonEndObj,values.ecartCreneaux);

      for (let i = 0; i < this.horaires.length; i++) {
            console.log(this.horaires[i]);
          }
     // Affiche le premier élément du tableau
     const horairesData = this.horaires; // Tableau des horaires à envoyer au serveur

     // Effectuer la requête POST vers le serveur
     fetch('http://localhost:3000/api/horaires', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({ horaires: horairesData })
     })
       .then(response => response.json())
       .then(data => {
         // Traitement de la réponse du serveur si nécessaire
         console.log(data);
       })
       .catch(error => {
         console.error('Error sending horaires:', error);
       });      
    },
    ajoutertableau(debut,fin,ecartCreneaux){
      while (debut < fin) {
        const heureDebutCreneau = debut.toTimeString().slice(0, 5); // Heure de début du créneau
        debut.setMinutes(debut.getMinutes() +ecartCreneaux); // Incrémenter de l'écart créneaux pour le prochain créneau
        const heureFinCreneau = debut.toTimeString().slice(0, 5); // Heure de fin du créneau

        // Ajouter le créneau horaire au tableau
        if(debut<=fin)
        {
            this.horaires.push(`${heureDebutCreneau} - ${heureFinCreneau}`);
        }
      }
    },
    /**************************************************************************************
    * 
    * Ajouter les horraires
    * 
    ***************************************************************************************/
  },
  mounted(){
    this.fetchConcessions();
    this.fetchHoraires();
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





