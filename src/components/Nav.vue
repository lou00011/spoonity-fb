<template>
  <div>
    <!--
      How this works:
      v-model binds to computed value navLinkState coming from Vuex
      while v-model directive is technically two way binding, since mapState is strictly a get function, it is effectively a one way bind
      To edit the value we call an action function in Vuex, which is under store.js
      Right now the value passed to the set function is hard-coded. This can be made dynamic via an $event, but I don't find this solution of internally emitting and reading an event paticularly graceful.
    -->
    <vs-navbar
    v-model="navLinkState"
    text-color="grey"
    active-text-color="black"
    >
      <div slot="title">
        <vs-navbar-title id="navtitle">
          Hi {{ userName }}, It is {{ weathercond }} today
        </vs-navbar-title>
      </div>

      <vs-navbar-item index="0" v-if="!authenticationStatus">
        <a
        @click="() => {
          changeNavLinkState(0)
          $emit('return', '/login')
        }"
        >Login</a>
      </vs-navbar-item>

      <vs-navbar-item index="1" v-if="!authenticationStatus">
        <a
        @click="() => {
          changeNavLinkState(1)
          $emit('return', '/register')
        }"
        >Register</a>
      </vs-navbar-item>

      <vs-navbar-item index="0" v-if="authenticationStatus">
        <a
        @click="() => {
          changeNavLinkState(0)
          $emit('return', '/')
          }"
        >Home</a>
      </vs-navbar-item>

      <vs-navbar-item index="1" v-if="authenticationStatus">
        <a @click="() => {
        changeNavLinkState(1)
        $emit('return', '/userdetails')
        }"
        >User Details</a>
      </vs-navbar-item>

      <vs-navbar-item index="2" v-if="authenticationStatus">
        <a @click="() => {
        signOutx();
        changeNavLinkState(0);
        }">
          Sign Out
        </a>
      </vs-navbar-item>
    </vs-navbar>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { signout, getCurrentUserInfo } from '../logic/firebaseUtils'
import { getCurrentWeatherEmoji } from '../logic/openWeatherUtils'

export default {
  data: function () {
    return {
      weathercond: '',
      userName: 'Guest'
    }
  },
  methods: {
    signOutx: function () {
      this.onAuthenticationChange()
      signout()
      this.$router.push('/login')
    },
    // Vuex methods
    ...mapActions([
      'changeNavLinkState',
      'onAuthenticationChange'
    ])
  },
  computed: {
    ...mapState([
      'navLinkState',
      'authenticationStatus'
    ])
  },
  watch: {
    authenticationStatus: async function (newValue, oldValue) {
      const info = await getCurrentUserInfo()
      this.userName = this.authenticationStatus ? info.firstName : 'Guest'
    }
  },
  created: async function () {
    // get the weather condition from OpenWeather
    const weather = await getCurrentWeatherEmoji()
    this.weathercond = weather

    const info = await getCurrentUserInfo()
    this.userName = this.authenticationStatus ? info.firstName : 'Guest'
  }
}
</script>

<style scoped>
  #navtitle{
    color: grey
  }
</style>
