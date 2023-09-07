<template>
 <div id="menu_deroulant_container">
        <div class="d-flex justify-content-center">
          <select class="form-select form-select-lg w-75 drop_list" v-model="section" aria-label="Default select example">
            <option value="" class="text-center">Choisir la concession</option>
            <option value="section1" class="text-center">Ajouter/Suprimer une concession</option>
            <option value="section2" class="text-center">Changer les horaires d'exposition</option>
            <option v-for="concession in concessions" :value="concession" class="text-center" :key="concession.id">{{ concession }}</option>
          </select>
        </div>
      
        <div class="section" v-if="section === 'section1'">

          <form @submit.prevent="ajouterConcession">
            <div class="form-group">
              <div class="input-group">
                <input type="text" class="form-control" id="formGroupExampleInput" v-model="concessionInput" placeholder="Nom de la concession">
                <button type="submit" class="btn btn-primary">Ajouter une concession</button>
              </div>
            </div>
          </form>

          <div v-for="concession in concessions" :key="concession" class="section">
            <div class="d-flex justify-content-between align-items-center">
                <h3 class="text-center">{{ concession }}</h3>
                <button class="btn btn-danger" @click="supprimerConcession(concession)">Supprimer cette concession</button>
            </div>
          </div>

          <button @click="supprimerConcessions" type="submit" class="btn btn-danger btn-lg btn-block">Supprimer les concessions</button>

        </div>

        <div class="section" v-if="section === 'section2'">
            <form @submit.prevent="ajouterHoraires">
              <input type="time" v-model="morningStart" min="08:00" max="11:00" required>
              <small>Choisir l'heure de début du matin</small><br>
          
              <input type="time" v-model="pauseTime" min="11:30" max="14:00" required>
              <small>Choisir l'heure de la pause</small><br>
          
              <input type="time" v-model="afternoonStart" min="13:00" max="17:00" required>
              <small>Choisir l'heure de début de l'après-midi</small><br>
          
              <input type="time" v-model="afternoonEnd" min="17:30" max="19:00" required>
              <small>Choisir l'heure de fin de l'après-midi</small><br>
          
              <input type="number" class="form-control" v-model="ecartCreneaux" placeholder="Ecart entre les créneaux">    
              <button type="submit" class="btn btn-primary">Valider</button>
            </form>   
            <div v-for="horaire in horaires" :key="horaire">
              <h3 class="text-center">{{horaire}}</h3>
            </div>  
          <button class="btn btn-danger" @click="supprimerHoraires">Supprimer les horaires</button>
        </div>
        <div v-for="concession in concessions" :key="concession" class="section" :class="{ 'd-none': section !== concession }">
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="col text-center">
          <h3 class="nom_concession">{{ concession }}</h3>
        </div>
        <div class="col text-right">
          <button 
            class="btn btn-primary"
            @click.stop="togglePopover(concession)"
            :id="'popover-' + concession"
          >
            Ajouter un modèle
          </button>
          
          <b-popover :target="'popover-' + concession" v-model="popovers[concession]">
            <template #default>
              <form @submit.prevent="ajouterAutomobile(concession)">
                <div class="form-group">
                  <label :for="'autoName-' + concession">Nom du modèle</label>
                  <input v-model="modeleInput" type="text" class="form-control" :id="'autoName-' + concession">
                </div>
                <div class="form-group">
                  <label :for="'inputEmail-' + concession">Places disponibles</label>
                  <input type="number" min="1" class="form-control" :id="'inputEmail-' + concession" v-model="placesInput">
                </div>
                <button type="submit" class="btn btn-primary">Créer modèle</button>
              </form>
            </template>
          </b-popover>
        </div>
      </div>
    </div>
  </div>
</div>   
    <!-- Footer Start -->
	    <div class="container-fluid bg-dark text-white-50 py-5 px-sm-3 px-md-5" style="margin-top: 90px;">
        <div class="row pt-5">
            <div class="col-lg-3 col-md-6 mb-5">
                <a href="index-2.html" class="navbar-brand">
                    <h1 class="m-0 mt-n2 text-white display-5">Groupe PEYROT</h1>
                </a>
                <p><br></p>
            </div>
            <div class="col-lg-3 col-md-6 mb-5">
            </div>
            <div class="col-lg-3 col-md-6 mb-5">
            </div>
            <div class="col-lg-3 col-md-6 mb-5">          
            </div>
        </div>
    </div>
  </template>
  
  <script>
  export default {
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

      popovers: {},
      modeleInput: '',
      placesInput: ''
    };
  },
  methods: {

    togglePopover(concession) {
      this.$set(this.popovers, concession, !this.popovers[concession]);
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
          const heureDebut = horaire.heureDebut; // Garder les 5 premiers caractères (hh:mm)
          const heureFin = horaire.heureFin; // Garder les 5 premiers caractères (hh:mm)
          return `${heureDebut} - ${heureFin}`;
        });
    
        this.horaires = formattedHoraires;
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
  console.log('Entrée dans le programme');
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
      console.log(responseConcession);
      if (responseConcession.ok) {
        const concessions = await responseConcession.json();
        const foundConcession = concessions.find(c => c.nomConcession === concession);

        if (foundConcession) {
          // Insérez le nouveau modèle avec l'ID de la concession trouvée
          const responseModele = await fetch('http://localhost:3000/api/modeles', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ modèle: nouveauModele, concessionId: foundConcession.id })
          });

          if (responseModele.ok) {
            // Le modèle a été inséré avec succès
          } else {
            console.error('Error adding model:', responseModele.status);
          }
        } else {
          console.error('Concession not found:', concession);
        }
      } else {
        console.error('Error fetching concessions:', responseConcession.status);
      }
    }catch (error) {
      console.error('Error adding model:', error);
    }
  }
  this.togglePopover(concession); // Fermer le popover
}


  },
  mounted(){
    this.fetchConcessions();
    this.fetchHoraires();
  },
}
  </script>
  