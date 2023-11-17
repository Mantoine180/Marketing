import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import vClickOutside from 'v-click-outside'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const app = createApp(App)

// Make BootstrapVue available throughout your project
app.use(BootstrapVue)
app.use(vClickOutside)
// Optionally install the BootstrapVue icon components plugin
app.use(IconsPlugin)

app.use(createPinia())
app.use(router)

app.mount('#app')
