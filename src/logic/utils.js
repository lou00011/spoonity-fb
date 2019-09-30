import { isEmailPresent } from './firebaseUtils'
import { email } from 'vuelidate/lib/validators'

// custom validators
// Because I don't want to swarm API calls to email verificaition, this function will short circult before the email is valid
export function noEmailDuplicate (value) {
  return email(value) ? isEmailPresent(value).then(x => !x) : false
}

export function isValidPhoneNumber (value) {
  // https://regexr.com/3c53v
  const pattern = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/
  const validCharacterSet = pattern.test(value)
  const validNumericalLength = cleanPhoneNumber(value).length === 10
  return validCharacterSet && validNumericalLength
}

// data cleaning functions
// This function strips all non-numeric character from an already validated phone number
export function cleanPhoneNumber (value) {
  const pattern = /[^\d]*/g
  return value.replace(pattern, '')
}
