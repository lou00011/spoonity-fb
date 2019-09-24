import { storiesOf } from '@storybook/vue'
import Register from '../src/views/Register'

storiesOf('View - Register', module)
  .add('default', () => {
    return {
      components: { register: Register },
      template: `<register/>`
    }
  })
