import { isEmailPresent } from './firebaseUtils'


// custom validators for vuelidate
function noEmailDuplicate (value) {
  return isEmailPresent()
  //todo async validation
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
