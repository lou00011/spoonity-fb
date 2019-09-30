<template>
<div v-if="entries !== undefined">
<vs-list :key="id" v-for="(entry, id) in entries">
  <vs-list-item :title="entry.data.title" :subtitle="entry.data.text">
    <vs-button
    color="#FFFFFF"
    @click="() => {
      deleteAction(entry.id)
      $emit('return', 1)
      }"
    >❌</vs-button>
    </vs-list-item>
</vs-list>
</div>
</template>

<script>
import { deleteUserDiaryEntry } from '../logic/firebaseUtils'
export default {
  props: {
    entries: Array
  },
  methods: {
    deleteAction: function (entryid) {
      deleteUserDiaryEntry(entryid)
    }
  }
}
</script>
