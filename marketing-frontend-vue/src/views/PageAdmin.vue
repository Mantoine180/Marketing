<script>
  import MyNavbar from '../components/MyNavbar.vue'
  import AppHeader from '../components/AppHeader.vue'
  import DropdownMenu from '../components/DropdownMenu.vue'
  import AppFooter from '../components/Footer.vue'
  import api from '../api/axiosInstance.js';
  export default {
  
    components: {
      MyNavbar,
      AppHeader,
      DropdownMenu,
      AppFooter
    },

    methods: {
        async rechercheInfo() {
              try { 
                  await api.get('/infos');   
              } 
              catch (error) {  
                const response = await api.post('/infos');
                  if (response.status === 200) {
                      console.log('Titre updated successfully');
                  }
              }
            }
        },
    mounted() {
        this.rechercheInfo();
    },
  }
  </script>
  <template>
      <MyNavbar />
      <AppHeader />
      <DropdownMenu />
      <AppFooter />
</template>