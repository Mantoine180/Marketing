
const appDeroulante = Vue.createApp({
  
  data() {
    return {
      horaires:[],
      horaires_id:[],
      concessions: [],
      section: '',
      concessionInput: '',

      morningStart: '', // Propriété pour stocker la valeur de l'heure de début du matin
      pauseTime: '', // Propriété pour stocker la valeur de l'heure de la pause
      afternoonStart: '', // Propriété pour stocker la valeur de l'heure de début de l'après-midi
      afternoonEnd: '', // Propriété pour stocker la valeur de l'heure de fin de l'après-midi
      ecartCreneaux: null, 
      id_horaires:null,

      openPopovers: {} ,
      modeleInput: '',
      placesInput:'',
    };
  },
  methods: {

    togglePopover(concession) {
      // Inversez l'état d'ouverture du popover pour la concession donnée
      this.openPopovers[concession] = !this.openPopovers[concession];
    },
    isPopoverOpen(concession) {
      // Renvoie true si le popover est ouvert pour la concession donnée
      return this.openPopovers[concession];
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
        const response = await fetch('http://localhost:3000/api/horaires');
        const data = await response.json();
    
        // Formater les horaires au format "hh:mm"
        const formattedHoraires = data.map(horaire => {
          const heureDebut = horaire.heureDebut;
          const heureFin = horaire.heureFin;
          return `${heureDebut} - ${heureFin}`;
        });
        this.horaires = formattedHoraires;
      } catch (error) {
        console.error('Error fetching concessions:', error);
      }
    },

    async fetchHorairesId() {
      try {
        const response = await fetch('http://localhost:3000/api/horaires');
        const data = await response.json();
    
        // Extraire les ids et les stocker dans le tableau horaires_id
        const horaires_id = data.map(horaire => horaire.id);
        this.horaires_id = horaires_id; // Assurez-vous que vous avez défini horaires_id dans la section data de votre composant
      } catch (error) {
        console.error('Error fetching id:', error);
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
    
    















    /**************************************************************************************
    * 
    * Ajouter les horraires
    * 
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
    
      // Créez un tableau pour stocker les horaires sous forme d'objets avec les propriétés "heureDebut" et "heureFin"
      const horairesData = [];
    
      let morningStartObj = new Date(`2000-01-01T${values.morningStart}:00`);
      let morningPauseObj = new Date(`2000-01-01T${values.pauseTime}:00`);
      let afternoonStartObj = new Date(`2000-01-01T${values.afternoonStart}:00`);
      let afternoonEndObj = new Date(`2000-01-01T${values.afternoonEnd}:00`);
    
      // Boucle pour créer les créneaux horaires
      this.ajoutertableau(morningStartObj, morningPauseObj, values.ecartCreneaux);
      this.ajoutertableau(afternoonStartObj, afternoonEndObj, values.ecartCreneaux);
    
      for (let i = 0; i < this.horaires.length; i++) {
        const [heureDebut, heureFin] = this.horaires[i].split(' - ');
        // Vérifier que les horaires ne sont pas vides et ne contiennent pas d'espaces avant de les ajouter au tableau horairesData
        if (heureDebut && heureFin && heureDebut.trim() !== '' && heureFin.trim() !== '') {
          horairesData.push({
            heureDebut: heureDebut.trim(),
            heureFin: heureFin.trim(),
          });
        }
      }
    
      // Effectuer la requête POST vers le serveur
      fetch('http://localhost:3000/api/horaires', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ horaires: horairesData })
      })
        .then(response => {
          if (!response.ok) {
            return response.text().then(text => {
              throw new Error(text);
            });
          }
          return response.json();
        })
        .then(data => {
          // Traitement de la réponse du serveur si nécessaire
          console.log(data);
        })
        .catch(error => {
          console.error('Error sending horaires:', error);
        });

        fetchHorairesId();
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
    async supprimerHoraires() {
      this.horaires = [];
      this.horaires_id=[];
      try {
        const response = await fetch('http://localhost:3000/api/horaires', { method: 'DELETE' });
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
        const data = await response.json();
        console.log(data.message); // Afficher le message de succès du serveur
      } catch (error) {
        console.error('Error deleting horaires:', error);
      }
    },
    /***************************************************************************************
    **************************************************************************************** 
    ***************************************************************************************/




















    /**************************************************************************************
    * 
    * Ajouter les modeles
    * 
    ***************************************************************************************/
// Dans votre code Vue.js
  async ajouterAutomobile(concession){
  const nouveauModele = this.modeleInput.trim();
  const nbPlaces = parseInt(this.placesInput); // Convertir en nombre entier

  // Vérifiez si nouveauModele n'est pas vide et nbPlaces est un nombre valide
  if (nouveauModele !== '' && !isNaN(nbPlaces) && nbPlaces >= 0) {
    
    try {
      // Recherchez l'ID de la concession en utilisant son nom
      const responseConcession = await fetch(`http://localhost:3000/api/modeles/${encodeURIComponent(concession)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!responseConcession.ok) {
          throw new Error('Error fetching concessions');
      }
  
      const concessions_id = await responseConcession.text(); // Notez que nous utilisons .text() car la réponse est une chaîne (ID converti en chaîne).
      //console.log(concessions_id);
  
      const responseModele = await fetch('http://localhost:3000/api/modeles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ modele: nouveauModele, concessionId: concessions_id }) // Notez l'utilisation de concessions_id ici
      });
  
      if (!responseModele.ok) {
        throw new Error('Error adding model');
      }
  
      // Le modèle a été inséré avec succès
      console.log('Model added successfully!');


      // Insérez le nouveau modèle avec l'ID de la concession trouvée
      const responseModeleID = await fetch(`http://localhost:3000/api/modeles/${encodeURIComponent(concessions_id)}/${encodeURIComponent(nouveauModele)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!responseModeleID.ok) {
        throw new Error('Error adding model');
      }
      const modeles_id = await responseModeleID.text(); // Notez que nous utilisons .text() car la réponse est une chaîne (ID converti en chaîne).
      
      console.log(modeles_id);
      // Le modèle a été inséré avec succès
      console.log('Model added successfully!');
      } catch (error) {
          console.error('Error:', error);
      }
  
  }
}


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
 Modification de la zone 
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
