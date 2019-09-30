import { storiesOf } from '@storybook/vue'
import App from '../src/App'

storiesOf('View - App', module)
  .add('default', () => {
    return {
      components: { app: App },
      template: `
      <app></app>
      `
    }
  })
