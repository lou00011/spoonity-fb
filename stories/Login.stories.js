import { storiesOf } from '@storybook/vue'
import Login from '../src/views/Login'

storiesOf('View - Login', module)
  .add('default', () => {
    return {
      components: { login: Login },
      template: `<login />`
    }
  })
