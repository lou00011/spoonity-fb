import { configure } from '@storybook/vue';
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import Vuelidate from 'vuelidate'

Vue.use(Vuesax)
Vue.use(Vuelidate)
Vue.use(VueRouter)
Vue.use(Vuex)

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module);
