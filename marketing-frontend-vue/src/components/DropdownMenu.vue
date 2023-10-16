<template>
 <div id="menu_deroulant_container">
        <div class="d-flex justify-content-center  ">
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
        <div class="row justify-content-center align-items-center">
          <div class="col text-right">
            <button class="btn btn-primary" :id="'popover-' + concession" target="popover-button-open">
              Ajouter un modèle
            </button>
            <b-popover :target="'popover-' + concession" >
              <template #default>
                <form @submit.prevent="ajouterAutomobile(concession)">
                  <div class="form-group">
                    <label>Nom du modèle</label>
                    <input v-model="modeleInput" type="text" class="form-control" :id="'autoName-' + concession">
                  </div>
                  <div class="form-group">
                    <label class="btn btn-primary button-primary btn-sm">
                            Ajouter la photo de l'automobile
                            <input type="file" @change="handleImageChange" style="display: none;">
                    </label>
                  </div>
                  <div class="form-group">
                    <label>Places disponibles</label>
                    <input type="number" min="1" class="form-control" :id="'placesInput-' + concession" v-model="placesInput">
                  </div>

                  <button type="submit" class="btn btn-primary">Créer modèle</button>
                </form>
              </template>
            </b-popover>
          </div>
        
        <b-card-group deck>
          
          <div v-for="modele in modeles" :key="modele" >
              <b-card
                v-if="modele.concession===concession"
                :title="modele.modele"
                :img-src="modele.photo"
                img-alt="Image"
                style="max-width: 20rem;"
                class="mb-2 pull-right "
                >
                <b-button @click="fermerModele(modele)" class="close position-absolute top-0 end-0 btn-danger custom-close-icon" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </b-button>
                <b-button href="#" variant="primary">Réserver une horaire</b-button>
              </b-card>
          </div>
        </b-card-group>  
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
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import api from '../api/axiosInstance.js';
  export default {
    data() {
    return {
      horaires:[],
      concessions: [],
      modeles: [],
      section: '',
      concessionInput: '',

      morningStart: '', // Propriété pour stocker la valeur de l'heure de début du matin
      pauseTime: '', // Propriété pour stocker la valeur de l'heure de la pause
      afternoonStart: '', // Propriété pour stocker la valeur de l'heure de début de l'après-midi
      afternoonEnd: '', // Propriété pour stocker la valeur de l'heure de fin de l'après-midi
      ecartCreneaux: null,
      
      modeleInput: '',
      placesInput: '',

      newModele:{
        modele: "",
        photo: '',
        concession:""
      },
    };
  },

  watch: {
    section() {
      this.modeleInput = '';
      this.placesInput = '';
      this.newModele.photo = '';
    }
  },
  methods: {
  
    /**************************************************************************************
    * 
    * Chercher une concession dans la base de données
    * 
    ***************************************************************************************/
  async fetchConcessions() {
  try {
    const response = await api.get('/concession');
    this.concessions = response.data;
    console.log(this.concessions);
  } catch (error) {
    console.error('Error fetching concessions:', error);
  }
},

  /***************************************************************************************
  **************************************************************************************** 
  ****************************************************************************************/

async fetchHoraires() {
  try {
    const response = await api.get('/horaires');
    const data = response.data;

    // Formater les horaires au format "hh:mm"
    const formattedHoraires = data.map(horaire => {
      const heureDebut = horaire.heureDebut; // Garder les 5 premiers caractères (hh:mm)
      const heureFin = horaire.heureFin; // Garder les 5 premiers caractères (hh:mm)
      return `${heureDebut} - ${heureFin}`;
    });

    this.horaires = formattedHoraires;
  } catch (error) {
    console.error('Error fetching horaires:', error);
  }
},

async fetchHorairesId() {
      try {
        const response = await api.get('/horaires');
        const data = response.data;
    
        // Extraire les ids et les stocker dans le tableau horaires_id
        const horaires_id = data.map(horaire => horaire.id);
        this.horaires_id = horaires_id; // Assurez-vous que vous avez défini horaires_id dans la section data de votre composant
      } catch (error) {
        console.error('Error fetching id:', error);
      }
},

async fetchModeles() {
  try {
    const response = await api.get(`/modeles`);
    this.modeles = response.data;
    console.log(this.modeles);
  } catch (error) {
    console.error('Error fetching modeles:', error);
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
        await api.post('/concession', { nomConcession: nouvelleConcession });
        this.concessionInput = ''; // Réinitialiser l'entrée de la concession
      } catch (error) {
        console.error('Error adding concession:', error);
      }
    }
  },

  async supprimerConcession(concession) {
    const index = this.concessions.indexOf(concession);
    if (index !== -1) {
      try {
        const response = await api.delete(`/concession/${encodeURIComponent(concession)}`);
        if (response.status === 200) {
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

  async supprimerConcessions() {
    this.concessions = [];
    try {
      await api.delete('/concession');
    } catch (error) {
      console.error('Error deleting concessions:', error);
    }
  },

    
    




    /**************************************************************************************
    * 
    * Ajouter les horraires
    * 
    ***************************************************************************************/
  async ajouterHoraires() {
  // Utilisez les valeurs des propriétés pour appeler votre fonction ajouterHoraires()
  const values = {
    morningStart: this.morningStart,
    pauseTime: this.pauseTime,
    afternoonStart: this.afternoonStart,
    afternoonEnd: this.afternoonEnd,
    ecartCreneaux: this.ecartCreneaux,
  };

  // Appelez votre fonction ajouterHoraires() avec les valeurs récupérées
  console.log(values);

  let morningStartObj = new Date(`2000-01-01T${values.morningStart}:00`);
  let morningPauseObj = new Date(`2000-01-01T${values.pauseTime}:00`);
  let afternoonStartObj = new Date(`2000-01-01T${values.afternoonStart}:00`);
  let afternoonEndObj = new Date(`2000-01-01T${values.afternoonEnd}:00`);

  this.ajoutertableau(morningStartObj, morningPauseObj, values.ecartCreneaux);
  this.ajoutertableau(afternoonStartObj, afternoonEndObj, values.ecartCreneaux);

  const horairesData = this.horaires.map(h => {
    const [heureDebut, heureFin] = h.split(' - ');
    return {
      heureDebut: heureDebut.trim(),
      heureFin: heureFin.trim(),
    };
  });

  try {
    const response = await api.post('/horaires', { horaires: horairesData });
    console.log(response.data);
  } catch (error) {
    console.error('Error sending horaires:', error);
  }
  this.fetchHorairesId();
},

ajoutertableau(debut, fin, ecartCreneaux) {
  while (debut < fin) {
    const heureDebutCreneau = debut.toTimeString().slice(0, 5);
    debut.setMinutes(debut.getMinutes() + ecartCreneaux);
    const heureFinCreneau = debut.toTimeString().slice(0, 5);
    if (debut <= fin) {
      this.horaires.push(`${heureDebutCreneau} - ${heureFinCreneau}`);
    }
  }
},

async supprimerHoraires() {
  this.horaires = [];
  try {
    const response = await api.delete('/horaires');
    console.log(response.data.message); // Afficher le message de succès du serveur
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

async handleImageChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = async () => {
        this.newModele.photo = reader.result; // Met à jour la propriété photo
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    },

async ajouterAutomobile(concession) {
  const nbPlaces = parseInt(this.placesInput);
  this.newModele.modele = this.modeleInput.trim();
  this.newModele.concession = concession;
  console.log(this.newModele);
  const modeleExiste = this.modeles.some(modele => modele.modele === this.newModele.modele && modele.concession === concession);
  if (this.newModele.modele && !isNaN(nbPlaces) && nbPlaces >= 0  && !modeleExiste) {
      try {
        // Recherchez l'ID de la concession en utilisant son nom
        const { data: concessions_id } = await api.get(`/modeles/id/${encodeURIComponent(concession)}`);

        // Insertion du nouveau modèle avec l'ID de la concession
        await api.post('/modeles', {
          modele: this.newModele.modele,
          concessionId: concessions_id,
          photo: this.newModele.photo,
        });
        this.fetchModeles(); 

        // Récupérer l'ID du modèle automobile juste après qu'il soit créé
        const params = new URLSearchParams({ concessionId: concessions_id, modele: this.newModele.modele});
        const { data: modeleData } = await api.get(`/reservation/idconcession/?${params}`);
        const modele_id = modeleData;
        console.log('ID du modèle:', modele_id);

        // Effectuer les requêtes POST vers le serveur pour mettre en place les réservations
        const reservations = this.horaires_id.map(creneauId => 
          api.post('/reservation', {
            quantiteMax: nbPlaces,
            creneauId,
            modeleId: modele_id
          })
        );

        await Promise.all(reservations);
        console.log('All reservations made successfully!');

      } 
      catch (error) {
        console.error('Error:', error);
      }
    }
  },

  async fermerModele(modele) {
  try {
    console.log('Deleting model:', modele.modele);
    const params = new URLSearchParams({
      modele: modele.modele,
      concession: modele.concession
    });
    const response = await api.delete(`/modeles/?${params}`);
    if (response.status === 200) {
      const index = this.modeles.indexOf(modele);
      this.modeles.splice(index, 1);
      console.log('Model deleted successfully!');
    }
  } catch (error) {
    console.error('Error deleting model:', error);
  }
}

},
  mounted(){
    this.fetchConcessions();
    this.fetchHoraires();
    this.fetchHorairesId();
    this.fetchModeles(); 
  },
 
}
  </script>

<style scoped>
.custom-close-icon {
  top: 0.25rem;
  right: 0.5rem;
  font-size: 3rem;
  font-weight: lighter;
  line-height: 1;
  opacity: .5;
}
</style>