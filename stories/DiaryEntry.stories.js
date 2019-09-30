import { storiesOf } from '@storybook/vue'
import DiaryEntry from '../src/components/DiaryEntry'

storiesOf('Component - DiaryEntry', module)
  .add('default', () => {
    return {
      components: { de: DiaryEntry },
      template: `<de></de>`
    }
  })
