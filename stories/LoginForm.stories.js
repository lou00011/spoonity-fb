import { storiesOf } from '@storybook/vue'
import LoginForm from '../src/components/LoginForm'

storiesOf('View - Login', module)
  .add('default', () => {
    return {
      components: { lf: LoginForm },
      template: `<lf />`
    }
  })
