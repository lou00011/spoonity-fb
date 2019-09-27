import { storiesOf } from '@storybook/vue'
import Input from '../src/components/RegistrationInput'
import { required, email, minLength } from 'vuelidate/lib/validators'

//https://stackoverflow.com/questions/47077972/how-to-pass-props-to-components-story
//How to pass props to storybook
storiesOf('Component - RegistrationInput', module)
  .add('email', () => {
    return {
      components: { reg: Input },
      template: `
      <div>
      <reg
      :type='type'
      :label='label'
      :validators='validators'
      :dangerTexts='dangerTexts'
      
      @return="getDataFromChild($event)"
      ></reg>
      
      From parent: {{ hasError }}
      <br>
      From parent model: {{ model }}
      </div>
      `,
      data: function () {
        return {
          model: 'default',
          type: 'email',
          label: 'email',
          hasError: '',
          validators: { required, email },
          dangerTexts: {
            required: 'The field is required',
            email: 'The email is invalid'
          }
        }
      },
      methods: {
        getDataFromChild: function ([error, value]) {
          this.hasError = error
          this.model = value
        }
      }
    }
  })
  .add('passwords', () => {
    return {
      components: { 'reg': Input },
      template: `
      <div>
      <reg
      :type='type'
      :label='label'
      :validators='validators'
      :dangerTexts='dangerTexts'
      @return=getDataFromPassword($event)
      ></reg>
      {{ this.password }}
      <reg
      :type='type'
      :label='label'
      :validators='validators2'
      :dangerTexts='dangerTexts'
      @return=getDataFromRePassword($event)
      ></reg>
      {{ this.rePassword }}
      </div>
      `,
      data: function () {
        return {
          password: '',
          passwordErr: '',
          rePassword: '',
          rePasswordErr: '',
          type: 'password',
          label: 'password',
          validators: { required, minLength: minLength(6) },
          validators2: { required, sameAs: this.mySameAs },
          dangerTexts: { required: 'This field is required', minLength: 'The password provided is too short', MySameAs: "The passwords do not match" }
        }
      },
      methods: {
        getDataFromPassword: function ([error, value]) {
          this.password = value
          this.passworErr = error
        },
        getDataFromRePassword: function ([error, value]) {
          this.rePassword = value
          this.rePasswordErr = error
        },
        mySameAs: function (value) {
          return value == this.password
        }
      }
    }
  })
