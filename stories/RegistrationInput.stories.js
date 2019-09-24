import { storiesOf } from '@storybook/vue'
import Input from '../src/components/RegistrationInput'
import { required, email } from 'vuelidate/lib/validators'

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
      @hasError="getErrorFromChild($event)"
      :validators='validators'
      :dangerTexts='dangerTexts'
      ></reg>
      
      From parent: {{ hasError }}
      </div>
      `,
      data: function () {
        return {
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
        getErrorFromChild: function ($e) {
          this.hasError = $e
        }
      }
    }
  })
