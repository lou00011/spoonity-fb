import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'

// Additional imports and Vue plugins
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'

import Vuelidate from 'vuelidate'

Vue.use(Vuesax)
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
