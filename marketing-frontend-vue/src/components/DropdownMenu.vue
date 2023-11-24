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
            <form v-if="horaires.length===0" @submit.prevent="ajouterHoraires">
              <input type="time" v-model="morningStart" min="08:00" max="11:00" required>
              <small>Choisir l'heure de début du matin</small><br>
          
              <input type="time" v-model="pauseTime" min="11:30" max="14:00" required>
              <small>Choisir l'heure de la pause</small><br>
          
              <input type="time" v-model="afternoonStart" min="13:00" max="17:00" required>
              <small>Choisir l'heure de début de l'après-midi</small><br>
          
              <input type="time" v-model="afternoonEnd" min="17:30" max="19:00" required>
              <small>Choisir l'heure de fin de l'après-midi</small><br>
          
              <input type="number" class="form-control" v-model="ecartCreneaux" placeholder="Ecart entre les créneaux">    
              <button  type="submit" class="btn btn-primary">Valider</button>
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
             
            </b-popover>
          </div>
        
        <b-card-group deck>
          <div v-for="modele in modeles" :key="modele" >
              <b-card
                v-if="modele.concession===concession"
                :id="modele.concession+' '+modele.modele"
                :title="modele.modele"
                :img-src="modele.photo"
                img-alt="Image"
                style="max-width: 20rem;"
                class="mb-2 pull-right "
                tabindex="0" 
                >
                <b-button  @click="fermerModele(modele)" class="close position-absolute top-0 end-0 btn-danger custom-close-icon" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </b-button>
                

                <b-popover
                :ref="`${modele.concession}-${modele.modele}`"
                triggers="focus "
                :target="modele.concession+' '+modele.modele"
                placement="right"
                
                >
                <template #title>
                <!--<b-button @click="onClose(modele)" class="close position-absolute top-0 end-0 btn-danger custom-pop-close-icon" aria-label="Close">
                  <span class="d-inline-block" aria-hidden="true">&times;</span>
                </b-button>-->
                    Essai de {{ modele.modele }}
                </template>
                  <div>
                    <b-form-group
                      label="Nom"
                      label-for="popover-input-1"
                      label-cols="3"
                      :state="input1state"
                      class="mb-1"
                      description="Entrer votre nom"
                      invalid-feedback="Ce champ est requis"
                    >
                      <b-form-input
                        ref="input1"
                        id="popover-input-1"
                        :state="input1state"
                        v-model="nom"
                        size="sm"
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group
                      label="Prenom"
                      label-for="popover-input-2"
                      label-cols="3"
                      :state="input2state"
                      class="mb-1"
                      description="Entrer votre prenom"
                      invalid-feedback="Ce champ est requis"
                    >
                      <b-form-input
                        ref="input1"
                        id="popover-input-2"
                        :state="input2state"
                        v-model="prenom"
                        size="sm"
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group
                      label="Email"
                      label-for="popover-input-3"
                      label-cols="3"
                      :state="input1state"
                      class="mb-1"
                      description="Entrer votre email"
                      invalid-feedback="Ce champ est requis"
                    >
                    <b-form-input
                        ref="input1"
                        id="popover-input-3"
                        :state="input1state"
                        v-model="email"
                        size="sm"
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group
                      label="Telephone"	
                      label-for="popover-input-4"
                      label-cols="4"
                      :state="input4state"
                      class="mb-1"
                      description="Entrer votre numero de telephone"
                      invalid-feedback="Ce champ est requis"
                    >
                    <b-form-input
                        type="tel"
                        ref="input1"
                        id="popover-input-4"
                        v-model="telephone"
                        pattern="[0-9]"
                        :state="input4state"
                        size="sm"
                      ></b-form-input>
                    </b-form-group>

                    <b-form-group
                      label="Horaires"
                      label-for="popover-input-2"
                      label-cols="3"
                      :state="input5state"
                      class="mb-1"
                      description="Choisir un horaire"
                      invalid-feedback="Ce champ est requis"
                    >
                      <b-form-select
                        type="text"
                        ref="input2"
                        id="popover-input-5"
                        :state="input5state"
                        size="sm"
                        :options="modele.horaires"
                        class="black-border"
                      ></b-form-select>
                    </b-form-group>
                    <b-button @click="onOk(modele)" size="sm" variant="primary">Réserver mon essai</b-button>
                  </div>                 
                </b-popover>
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
  import Cookies from 'js-cookie';
  export default {
    data() {
    return {
      horaires:[],
      horaires_automobiles: [],
      horaires_id:[],
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
        concession:"",
        modele_id: null,
      },

      authToken: Cookies.get('authToken'),

      nom:'', // Propriété pour stocker la valeur du nom',
      prenom:'',
      email:'',
      telephone:'',
      horaire:'',
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
    /*closePopoverOnClickOutside(modele) {
      console.log('closePopoverOnClickOutside');
      this.$root.$emit('bv::hide::popover', modele.concession + ' ' + modele.modele);  
    },*/

    async onOk(modele){
      console.log('onOk');

      console.log(modele.modele_id,this.telephone);

      const [heureDebut] = this.horaire.split(' - ');
      const horaireDebut = heureDebut.trim();


      console.log(horaireDebut);
      try {
        const response = await api.post(`/client`,{
        horaire:horaireDebut,
        nom:this.nom,
        prenom:this.prenom,
        email:this.email,
        telephone:this.telephone,
        modele_id:modele.modele_id,
      });
        console.log(response.data);
        await this.fetchHorairesAutomobiles();
      } catch (error) {
        console.error('Error sending reservation:', error);
      }
    },
    /**************************************************************************************
    * 
    * Chercher une concession dans la base de données
    * 
    ***************************************************************************************/
  async fetchConcessions() {
  try {
    const response = await api.get('/concession');
    this.concessions = response.data;
    
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

async fetchHorairesAutomobiles(){
  try {
    const response = await api.get(`/horaires/spehoraires`);
    this.horaires_automobiles = response.data;
    this.modeles.forEach((modele) => {
    const modeleId = modele.modele_id;
    const horairesCorrespondants = this.horaires_automobiles.find(
      (automobile) => automobile.id === modeleId
    );

    if (horairesCorrespondants) {
    const horairesString = horairesCorrespondants.horaires
      .map((horaire) => `${horaire.heureDebut} - ${horaire.heureFin}`)
     // Pour obtenir une chaîne avec toutes les plages horaires séparées par des virgules
    modele.horaires = horairesString;
}  else {
      modele.horaires = []; // Si aucun horaire correspondant n'est trouvé
    }
    console.log("Hola",modele.horaires);
    console.log(this.horaires);
});

  } catch (error) {
    console.error('Error fetching horaires_automobiles:', error);
  }
},

async fetchModeles() {
  try {
    const response = await api.get(`/modeles`);
    this.modeles = response.data;
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
      
      try {
        await api.post('/concession', { nomConcession: nouvelleConcession });
        this.concessionInput = ''; // Réinitialiser l'entrée de la concession
      } catch (error) {
        console.error('Error adding concession:', error);
      }
      this.fetchConcessions();
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
    const values = {
      morningStart: this.morningStart,
      pauseTime: this.pauseTime,
      afternoonStart: this.afternoonStart,
      afternoonEnd: this.afternoonEnd,
      ecartCreneaux: this.ecartCreneaux,
    };

    this.createHoraires(values);

    try {
      const response = await this.sendHoraires();
      console.log(response.data);
    } catch (error) {
      console.error('Error sending horaires:', error);
    }

    this.fetchHorairesId();
    this.fetchHorairesAutomobiles();
  },

  createHoraires(values) {
    const morningStartObj = this.createDateObject(values.morningStart);
    const morningPauseObj = this.createDateObject(values.pauseTime);
    const afternoonStartObj = this.createDateObject(values.afternoonStart);
    const afternoonEndObj = this.createDateObject(values.afternoonEnd);

    this.ajoutertableau(morningStartObj, morningPauseObj, values.ecartCreneaux);
    this.ajoutertableau(afternoonStartObj, afternoonEndObj, values.ecartCreneaux);
  },

  createDateObject(time) {
    return new Date(`2000-01-01T${time}:00`);
  },

  async sendHoraires() {
    const horairesData = this.horaires.map(h => {
      const [heureDebut, heureFin] = h.split(' - ');
      return {
        heureDebut: heureDebut.trim(),
        heureFin: heureFin.trim(),
      };
    });

    return await api.post('/horaires', { horaires: horairesData });
    
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
          quantiteMax: nbPlaces,
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
      await this.fetchHorairesAutomobiles();
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
  async mounted(){
    this.fetchConcessions();
    this.fetchHoraires();
    this.fetchHorairesId();
    this.fetchModeles(); 
    await this.fetchHorairesAutomobiles();
  },
 
}
  </script>

<style scoped>

.custom-close-icon {
  color: black;
  top: 0.25rem;
  right: 0.5rem;
  font-size: 4rem;
  font-weight:solid;
  line-height: 1;
  opacity: .5;
}

.custom-pop-close-icon {
  color: rgb(0, 0, 0);
  top: 0px;
  right: 0.5rem;
  font-size: 4rem;
  font-weight:solid;
 line-height: 0.5;
  opacity: .5;
}
.row{
  --bs-gutter-x: 0rem;  
}

h1 {
  border-width: 20px;
}

.black-border {
  border-color: #000000 !important;
}

.popover {
  margin-left: 200px;
  border-width: 200px;
}
</style>