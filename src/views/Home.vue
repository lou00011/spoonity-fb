<template>
<div>
  Home
  <diaryentry
  id="diaryentry"
  @return="reRender()"
  >
  </diaryentry>

  <diarylist
  id="diarylist"
  :entries="entries"
  @return="reRender()"
  >
  </diarylist>
</div>
</template>

<script>
import DiaryList from '../components/DiaryList'
import DiaryEntry from '../components/DiaryEntry'
import { getCurrentUserDiaries } from '../logic/firebaseUtils'
export default {
  name: 'Home',
  components: {
    diarylist: DiaryList,
    diaryentry: DiaryEntry
  },
  data: function () {
    return {
      entries: undefined
    }
  },
  methods: {
    reRender: async function () {
      console.log('Data refreshed')
      const v = await getCurrentUserDiaries()
      if (v !== undefined) {
        this.entries = v
      }
    }
  },
  created: async function () {
    const v = await getCurrentUserDiaries()
    if (v !== undefined) {
      this.entries = v
    }
  }
}
</script>
