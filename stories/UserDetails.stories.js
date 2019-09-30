import { storiesOf } from '@storybook/vue'
import UserDetails from '../src/views/UserDetails'

storiesOf('View - UserDetails', module)
  .add('default', () => {
    return {
      components: { ud: UserDetails },
      template: `
     <ud></ud>
     `
    }
  })
