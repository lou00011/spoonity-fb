<!--
  A generic input component that wraps round Vuesax vs-input

  Input: it takes a label, type, validators, and danger-texts as input to construct the form input element,
  the type of each input is detailed under props

  Output: returns a list tuple of [errorBool, value], where value is the content inside input field
-->
<template>
  <vs-input
  :label='label'
  :type='type'
  :validators='validators'
  :danger-texts='dangerTexts'

  v-model='model'
  v-bind="validationAttrs"
  @focus.once="() => $v.model.$touch()"
  @input="() => $emit('return', [$v.model.$error,model])"
  >
  </vs-input>
</template>

<script>
export default {
  props: {
    label: String,
    type: String,
    validators: Object,
    dangerTexts: Object
  },
  data: function () {
    return {
      model: ''
    }
  },
  // https://stackoverflow.com/a/54366827
  // validations passed as props needs to be an function that returns an object instead of just an object
  // I suspect it is related to Vue lifecycle and what stage of the lifecycle functions are materialized
  validations () {
    return { model: this.validators }
  },
  methods: {
    getDangerTexts: function (v) {
      const result = Object.entries(this.dangerTexts)
      // find all elements that is present in $v and dangerTexts that are false in $v
        .filter(([x, y]) => v[x] === false)
      // this is a 2 level nested list, so flatten it
        .flat()

      // the end return structure is 2 element list where
      // first element = key in dangerText,
      // second element = value for the corresponding key
      return result
    }
  },
  computed: {
    validationAttrs: function () {
      const v = this.$v.model
      if (v.$dirty && !v.$error) {
        return {
          success: true,
          danger: false
        }
      } else if (v.$dirty && v.$error) {
        const [_, second, ...rest] = this.getDangerTexts(v)
        /* only using the first error for simplicity because some errors overlap, for example:
         password is both required and length must be greater than 6
         therefore when password is missing the length is always lesser than 6
         this is trivially true. To avoid this we only take one error */

        return {
          success: false,
          danger: true,
          'danger-text': second
        }
      } else {
        return {
          success: false,
          danger: false
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
