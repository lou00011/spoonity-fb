import { isEmailPresent } from './firebaseUtils'

// custom validators for vuelidate

// https://vuelidate.netlify.com/#sub-collections-validation
// tldr: async validation require passing of a promise
// valid promise -> passing validation
// failed promise -> failed validation
function noEmailDuplicate (value) {
  return isEmailPresent.then(x => {
    if (x) {
      return x
    }else{
      throw new Error()
    }
  }
}

function isValidPhoneNumber (value) {
  //https://regexr.com/3c53v
  const pattern = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$'/
  return pattern.test(value)
}

// data cleaning functions
// This function strips all non-numeric character from an already validated phone number
function cleanPhoneNumber (value) {
  const pattern = /[^\d]+/
  return value.replace(pattern, '')
}
