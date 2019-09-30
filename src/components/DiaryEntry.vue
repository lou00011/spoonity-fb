<template>
  <div>
    <vs-input
    class="diaryentry-child"
    id="diaryentry-title"
    v-model="title"
    label="Title"
    type="text"
    >
    </vs-input>

<div
    id="diaryentry-text"
    class="diaryentry-child"
>
    <vs-textarea
    class="diaryentry-child"
    v-model="text"
    label="Type something"
    >
    </vs-textarea>
    </div>

    <vs-button
    id="diaryentry-button"
    class="diaryentry-child"
    color="#FFFFFF"
    @click="() => {
      uploadData();
      resetFields();
      $emit('return', 1);
    }"
    >
    💾</vs-button>
  </div>
</template>

<script>
import { addUserDiaryEntry } from '../logic/firebaseUtils'
export default {
  data: function () {
    return {
      title: '',
      text: ''
    }
  },
  methods: {
    uploadData: function () {
      addUserDiaryEntry(this.title, this.text)
    },
    resetFields: function () {
      this.title = ''
      this.text = ''
    }
  }
}
</script>
