import { storiesOf } from '@storybook/vue'
import Nav from '../src/components/Nav'
import StoryRouter from 'storybook-vue-router'
import Vuex from 'vuex'

storiesOf('Component - Navbar', module)
  .addDecorator(StoryRouter())
  .add('default', () => {
    return {
      components: { 'navigation': Nav },
      template: `
      <navigation></navigation>
      `,
      store: new Vuex.Store({
        state: { navLinkState: 0 }
      })
    }
  })
