<template>
    <div>
      <MyNavbar />
      <AppHeader />
      <DropdownMenu />
      <AppFooter />
    </div>
</template>
  
  <script>
  import MyNavbar from '../../components/MyNavbar.vue'
  import AppHeader from '../../components/AppHeader.vue'
  import DropdownMenu from '../../components/DropdownMenu.vue'
  import AppFooter from '../../components/Footer.vue'
  
  export default {
    components: {
      MyNavbar,
      AppHeader,
      DropdownMenu,
      AppFooter
    }
  }
  </script>
  