<!--
  TODO: the speed of emit may be problematic
-->
<template>
<div>
  <vs-input
  v-model='model'
  @change="() => $emit('hasError', $v.model.$error)"
  :label='label'
  :type='type'
  :validators='validators'
  :danger-texts='dangerTexts'
  @click="() => $v.model.$touch()"
  v-bind="validationAttrs"
  >
  </vs-input>
  From child: {{ $v.model.$error }}
  </div>
</template>

<script>
export default {
  props:{
    label: String,
    type: String,
    hasError: Boolean,
    validators: Object,
    dangerTexts: Object,
  },
  data: function(){
    return{
        model:'',
    }
  },
  //https://stackoverflow.com/a/54366827
  //validations passed as props needs to be an function that returns an object instead of just an object
  //I suspect it is related to Vue lifecycle and what stage of the lifecycle functions are materialized
  validations(){
    return {model: this.validators}
  },
  created: function(){
  },
  methods:{
    getDangerTexts: function(v){
      const result = Object.entries(this.dangerTexts)
      //find all elements that is present in $v and dangerTexts that are false in $v
        .filter(([x,y]) => v[x] === false)
      //this is a 2 level nested list, so flatten it
        .flat()

      //the end return structure is 2 element list where
      // first element = key in dangerText,
      // second element = value for the corresponding key
      return result
    }
  },
  computed:{
    validationAttrs: function(){
      let v = this.$v.model
      if(v.$dirty && !v.$error){
        return {
          success: true,
          danger: false,
        }
      } else if (v.$dirty && v.$error) {
        const [first, second, ...rest] = this.getDangerTexts(v)
        /* only using the first error for simplicity because some errors overlap, for example:
         password is both required and length must be greater than 6
         therefore when password is missing the length is always lesser than 6
         this is trivially true. To avoid this we only take one error */
        
        return {
          success: false,
          danger: true,
          "danger-text": second
        }
      } else {
        return {
          success: false,
          danger: false,
        }
      }
    }
  }
}
</script>

<style scoped>

</style>