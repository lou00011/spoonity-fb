<template>
    <form>
      <vs-input
      type="email"
      v-model.lazy="store.email"
      placeholder="email" 
      icon-after="false"
      >
      </vs-input>

      <vs-input
      type='password'
      v-model="store.password"
      placeholder="password" 
      icon-after="false"
      >
      </vs-input>

      <vs-input
      type='password'
      v-model="store.passwordConfirm"
      placeholder="Confirm password" 
      icon-after="false"
      >
      </vs-input>

      <vs-input
      type="text"
      v-model.trim="store.firstName"
      placeholder="first name" 
      icon-after="false"
      >
      </vs-input>

      <vs-input
      type="text"
      v-model.trim="store.lastName"
      placeholder="last name" 
      icon-after="false"
      >
      </vs-input>
    
      <vs-input
      type="text"
      v-model.trim="store.phoneNumber"
      placeholder="phone number" 
      icon-after="false"
      >
      </vs-input>
      
     <vs-button
     @click.prevent="register"
     >
     Register
     </vs-button>

    </form>
</template>

<script>
import { required, minLength, email, alpha, sameAs } from 'vuelidate/lib/validators'
import { register, isEmailPresent } from '../logic/firebaseUtils'

const noEmailDuplicate = (value) => !isEmailPresent(value)
const isvalidPhoneNumber = (value) => {}

export default {
  name: 'register',
  data: function(){
    return {
      state:{

      },
      store:{
        email:'',
        password: '',
        passwordConfirm: '',
        firstName: '',
        lastNAme: '',
        phoneNumber: '',
      }
    }
  },
  methods:{
    register: function(e){
      isEmailPresent(this.store.email)
         .then(v => { v ? alert("email already exist") : register(this.store)})
    }
  },
  validations: {
    store:{
      email: { required, email, noEmailDuplicate },
      password: { minLength: minLength(6) },
      passwordConfirm: { sameAs: sameAs(this.store.password) },
      firstName: { alpha },
      lastName: { alpha },
      phoneNumber: { number }, 
    }
  }
}
</script>

<style scoped>

</style>