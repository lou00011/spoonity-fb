import { isValidPhoneNumber } from '@/logic/utils'

// Testing isValidPhoneNumber
test('valid phone number', () => {
  expect(isValidPhoneNumber(`6132223333`)).toBeTruthy()
})

test('valid phone number containing common symbols', () => {
  expect(isValidPhoneNumber(`613-222-3333`)).toBeTruthy()
})

test('valid phone number containing common symbols', () => {
  expect(isValidPhoneNumber(`(613)-222-3333`)).toBeTruthy()
})

test('valid phone number containing common symbols', () => {
  expect(isValidPhoneNumber(`(613) 222 3333`)).toBeTruthy()
})

test('valid phone number containing common symbols', () => {
  expect(isValidPhoneNumber(`613 222 3333`)).toBeTruthy()
})

test('invalid phone number containing alphabetic characters', () => {
  expect(isValidPhoneNumber(`a 613 222 3333`)).toBeFalsy()
})

test('invalid phone number containing alphabetic characters', () => {
  expect(isValidPhoneNumber(` 613 222 3ee333`)).toBeFalsy()
})

test('invalid phone number containing alphabetic characters', () => {
  expect(isValidPhoneNumber(`abcdefg`)).toBeFalsy()
})

test('invalid phone number containing wrong number of digits', () => {
  expect(isValidPhoneNumber(`46`)).toBeFalsy()
})

test('invalid phone number containing wrong number of digits', () => {
  expect(isValidPhoneNumber(`613222444`)).toBeFalsy()
})
