import Vue from 'vue'
import Vuex from 'vuex'
import { isSessionAuthenticated } from './logic/firebaseUtils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navLinkState: 0,
    authenticationStatus: isSessionAuthenticated()
  },
  mutations: {
    changeNavLinkState: (state, payload) => {
      state.navLinkState = payload
    },
    toggleAuthenticationStatus: (state) => {
      state.authenticationStatus = !state.authenticationStatus
    }
  },
  actions: {
    changeNavLinkState: (context, payload) => {
      context.commit('changeNavLinkState', payload)
    },
    onAuthenticationChange: (context) => {
      context.commit('toggleAuthenticationStatus')
      context.commit('changeNavLinkState', 0)
    }
  }
})
