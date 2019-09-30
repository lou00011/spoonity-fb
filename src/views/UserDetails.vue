<template>
  <form>
    <h3>User Details</h3>
    <br>
    Registered Email: <em>{{ store.values.email }}</em>

    <div v-if="state.editUserInfo">
    <reginput
    label="First Name"
    :type="'text'"
    :validators="validators.firstName"
    :dangerTexts="dangerTexts"
    @return="getDataFromChild('firstName', $event)"
    >
    </reginput>
    <reginput
    label="Last Name"
    :type="'text'"
    :validators="validators.lastName"
    :dangerTexts="dangerTexts"
    @return="getDataFromChild('lastName', $event)"
    >
    </reginput>

    <reginput
    label="Phone Number"
    :type="'text'"
    :validators="validators.phoneNumber"
    :dangerTexts="dangerTexts"
    @return="getDataFromChild('phoneNumber', $event)"
    >
    </reginput>
    </div>
    <div v-else>
    <vs-input
    label="First Name"
    type="text"
    color="#000000"
    v-model="store.values.firstName"
    readonly>
    </vs-input>
    <vs-input
    label="Last Name"
    type="text"
    color="#000000"
    v-model="store.values.lastName"
    readonly>
    </vs-input>
    <vs-input
    label="Phone Number"
    type="text"
    color="#000000"
    v-model="store.values.phoneNumber"
    readonly>
    </vs-input>
    </div>

    <div v-if="state.editUserInfo">
      <vs-button
      @click="() => {state.editUserInfo = false}"
      > Cancel </vs-button>
      <vs-button
      :disable="!isFormErrorFree"
      @click="() => {
        pushDataToDB()
        state.editUserInfo = false
        completionNotification()
        }"
      > Confirm Changes </vs-button>
    </div>
    <div v-else>
    <vs-button
    @click="() => {state.editUserInfo = true}"
    > Edit Personal Information </vs-button>
    </div>
  </form>
</template>

<script>
import { required, alpha } from 'vuelidate/lib/validators'
import RegistrationInput from '../components/RegistrationInput'
import { isValidPhoneNumber } from '../logic/utils'
import { getCurrentUserInfo, updateCurrentUserInfo } from '../logic/firebaseUtils'
export default {
  name: 'UserDetails',
  components: { reginput: RegistrationInput },
  data: function () {
    return {
      // These are passed to create registration inputs
      validators: {
        firstName: { required, alpha },
        lastName: { required, alpha },
        phoneNumber: { required, isValidPhoneNumber: isValidPhoneNumber }
      },
      dangerTexts: {
        required: 'This field is required',
        alpha: 'Only alphabetic characters are allowed',
        isValidPhoneNumber: 'Not a valid phone number'
      },
      store: {
        // Note that true = existence of error
        errors: {
          firstName: true,
          lastName: true,
          phoneNumber: true
        },
        values: {
          email: '',
          firstName: '',
          lastName: '',
          phoneNumber: ''
        }
      },
      state: {
        editUserInfo: false
      }
    }
  },
  methods: {
    getDataFromChild: function (fieldName, [error, value]) {
      this.store.errors[fieldName] = error
      this.store.values[fieldName] = value
    },
    pushDataToDB: function () {
      updateCurrentUserInfo({
        firstName: this.store.values.firstName,
        lastName: this.store.values.lastName,
        phoneNumber: this.store.values.phoneNumber
      })
    },
    completionNotification: function () {
      this.$vs.notify({
        title: 'Update Successful',
        color: 'primary',
        fixed: false
      })
    }
  },
  computed: {
    isReadOnly: function () {
      return this.state.editUserInfo ? { readonly: '' } : { readonly: 'readonly' }
    },
    isFormErrorFree: function () {
      return Object.values(this.store.errors).filter(x => x === true).length === 0
    }
  },
  created: async function () {
    let o = await getCurrentUserInfo()

    if (o !== null) {
      this.store.values.email = o.email
      this.store.values.firstName = o.firstName
      this.store.values.lastName = o.lastName
      this.store.values.phoneNumber = o.phoneNumber
    }
  }
}
</script>
