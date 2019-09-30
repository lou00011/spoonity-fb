<template>
<div>
<form id="registrationform">

  <reginput
  class="registrationform-child"
  label="Email"
  :type="'text'"
  :validators="validators.email"
  :dangerTexts="dangerTexts"
  @return="getDataFromChild('email',$event)"
  >
  </reginput>

  <reginput
  class="registrationform-child"
  label="Password"
  :type="'password'"
  :validators="validators.password"
  :dangerTexts="dangerTexts"
  @return="getDataFromChild('password',$event)"
  >
  </reginput>

  <reginput
  class="registrationform-child"
  label="Confirm Password"
  :type="'password'"
  :validators="validators.rePassword"
  :dangerTexts="dangerTexts"
  @return="getDataFromChild('rePassword',$event)"
  >
  </reginput>

  <reginput
  class="registrationform-child"
  label="First Name"
  :type="'text'"
  :validators="validators.firstName"
  :dangerTexts="dangerTexts"
  @return="getDataFromChild('firstName',$event)"
  >
  </reginput>

  <reginput
  class="registrationform-child"
  label="Last Name"
  :type="'text'"
  :validators="validators.lastName"
  :dangerTexts="dangerTexts"
  @return="getDataFromChild('lastName',$event)"
  >
  </reginput>

  <reginput
  class="registrationform-child"
  label="Phone Number"
  :type="'text'"
  :validators="validators.phoneNumber"
  :dangerTexts="dangerTexts"
  @return="getDataFromChild('phoneNumber',$event)"
  >
  </reginput>

  <vs-button
  class="registrationform-child"
  type="border"
  :disabled="!isFormSubmittable"
  @click.prevent="() => { 
    cleanAll()
    registerToFB()
    redirect()
    changeNavLinkState(0) // Because it redirect to login
    }"
  >register</vs-button>
  </form>
  </div>
</template>

<script>
import RegistrationInput from '../components/RegistrationInput'
import { required, minLength, email, alpha } from 'vuelidate/lib/validators'
import { noEmailDuplicate, isValidPhoneNumber, cleanPhoneNumber } from '../logic/utils'
import { register } from '../logic/firebaseUtils'
import { mapActions } from 'vuex'

export default {
  name: 'Register',
  components: {
    reginput: RegistrationInput
  },
  data: function () {
    return {
      // These values are used to seed individual input components
      validators: {
        email: { required, email, noEmailDuplicate: noEmailDuplicate },
        password: { required, passwordMinLength: minLength(6) },
        rePassword: { required, confirmPassword: this.confirmPassword },
        firstName: { required, alpha },
        lastName: { required, alpha },
        phoneNumber: { required, isValidPhoneNumber: isValidPhoneNumber }
      },
      dangerTexts: {
        required: 'This field is required',
        email: 'Email is not valid',
        alpha: 'Only alphabetic characters are allowed',
        noEmailDuplicate: 'Email already exists',
        passwordMinLength: 'Password too short',
        confirmPassword: 'The passwords entered do not match',
        isValidPhoneNumber: 'Not a valid phone number'
      },

      // These fields are used to store value that are potentially propagated elsewhere
      store: {
        // Note that true = existence of error
        errors: {
          email: true,
          password: true,
          rePassword: true,
          firstName: true,
          lastName: true,
          phoneNumber: true
        },
        values: {
          email: '',
          password: '',
          rePassword: '',
          firstName: '',
          lastName: '',
          phoneNumber: ''
        }
      }
    }
  },
  methods: {
    getDataFromChild: function (fieldName, [error, value]) {
      this.store.errors[fieldName] = error
      this.store.values[fieldName] = value
    },
    confirmPassword: function (value) {
      return this.store.values.password === value
    },
    // field cleaning functions
    cleanAll: function () {
      const trimAndCapFirst = (str) => {
        let s = str.trim()
        return s.charAt(0).toUpperCase() + s.slice(1)
      }

      this.store.values.firstName = trimAndCapFirst(this.store.values.firstName)
      this.store.values.lastName = trimAndCapFirst(this.store.values.lastName)
      this.store.values.phoneNumber = cleanPhoneNumber(this.store.values.phoneNumber)
    },
    registerToFB: function () {
      const { rePassword, ...rest } = this.store.values
      register(rest)
    },
    redirect: function () {
      this.$router.push('/')
    },
    ...mapActions([
      'changeNavLinkState'
    ])
  },
  computed: {
    isFormErrorFree: function () {
      return Object.values(this.store.errors).filter(x => x === true).length === 0
    },
    isFormFilled: function () {
      return Object.values(this.store.values).filter(x => x === '').length === 0
    },
    isFormSubmittable: function () {
      return this.isFormErrorFree && this.isFormFilled
    }
  }
}
</script>
