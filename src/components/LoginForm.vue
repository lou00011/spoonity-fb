<template>
 <form>
   <vs-input
    class="loginform-child"
    label='Email'
    type='Text'
    v-model="email"
    @input="() => $v.email.$touch()"
    @click="() => state.displayError = false"
   >
   </vs-input>
   <vs-input
    class="loginform-child"
    type='password'
    v-model="password"
    @input="() => $v.password.$touch()"
    @click="() => state.displayError = false"
    >
   </vs-input>

   <vs-button
  ref="loadableButton"
   class="vs-con-loading__container loginform-child"
   vslor="primary"
   type="relief"
   :disabled="disableLoginButton"
   @click.prevent="() => {
     runLoginBtnLoadingAnimation()
     login(redirectToHome, handleLoginErrors)
     }"
   >Login
   </vs-button>

  <vs-alert
  class="loginform-child"
  title="Error"
  :active="state.displayError"
  color="danger"
  >
  {{ state.errorMessage }}
  </vs-alert>
  </form>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { login } from '../logic/firebaseUtils'
import { mapActions } from 'vuex'
export default {
  data: function () {
    return {
      email: '',
      password: '',
      state: {
        displayError: false,
        errorMessage: ''
      }
    }
  },
  validations: {
    email: { required },
    password: { required, minLength: minLength(6) }
  },
  computed: {
    disableLoginButton: function () {
      return !(this.$v.$anyDirty && !this.$v.$anyError)
    }
  },
  methods: {
    ...mapActions([
      'onAuthenticationChange'
    ]),
    login: function (successFn, errorFn) {
      login(this.email, this.password)
        .then(function (x) {
          x.hasOwnProperty('user') ? successFn(x) : errorFn(x)
        })
    },
    handleLoginErrors: function (errorObj) {
      // details of sign-in error code are found under SignInWithEmailAndPassword
      // https://firebase.google.com/docs/reference/js/firebase.auth.Auth.html#signinwithemailandpassword
      switch (errorObj.errorCode) {
        case 'auth/user-disabled':
          this.state.errorMessage = 'This account is disabled'
          break
        case 'auth/invalid-email':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          this.state.errorMessage = 'The login information provided is incorrect'
          break
      }
      this.state.displayError = true
    },
    redirectToHome: function () {
      this.onAuthenticationChange()
      this.$router.push('/')
    },
    // Loading in Login button
    runLoginBtnLoadingAnimation () {
      this.$vs.loading({
        background: 'default',
        color: '#FFFFFF',
        container: this.$refs.loadableButton.$el,
        scale: 0.45,
        type: 'point'
      })
      this.stopLoginBtnLoadingAnimation()
    },
    stopLoginBtnLoadingAnimation () {
      setTimeout(() => {
        this.$vs.loading.close(this.$refs.loadableButton.$el)
      }, 600)
    }
  }
}
</script>
