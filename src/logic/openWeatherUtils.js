import URI from 'urijs'
import { openWeatherKey } from '../logic/secrets'

/**
 * Form the URI for the OpenWeather API for Ottawa
 * @return: URI obj
 */
function getCurrentWeatherURI () {
  return URI()
    .protocol('http')
    .hostname('api.openweathermap.org')
    .port('80')
    .path('data/2.5/weather')
    .search({
      id: 6094817, // cityid of ottawa
      APPID: openWeatherKey()
    })
    .normalize()
}

/**
 * Fetch json for the Ottawa Open Weather API call
 * @return json object
 */
export function getCurrentWeatherJSON () {
  return fetch(getCurrentWeatherURI().toString()).then(x => x.json())
}

/**
 * Converts weather condition ids into emoji chars, given the json structure the id is always located under weather[0].id
 * @return emoji str
 */
export async function getCurrentWeatherEmoji () {
  const j = await getCurrentWeatherJSON()
  if (j.hasOwnProperty('weather')) {
    return weatherConditionIdToEmoji(j.weather[0].id)
  } else {
    return weatherConditionIdToEmoji(-1) // error condition
  }
}

/**
 * Converts weather condition ids into emoji chars
 *  @param: integer
 *  @return emoji string
 */
function weatherConditionIdToEmoji (id) {
  if (id < 200) {
    return '🤷‍♂️'
  } else if (id < 300) {
    return '⛈ '
  } else if (id < 500) {
    return '🌧 '
  } else if (id < 600) {
    return '🌧 '
  } else if (id < 700) {
    return '❄ '
  } else if (id === 800) {
    return '☀️'
  } else if (id < 900) {
    return '⛅ '
  } else {
    return '🤷‍♂️'
  }
}
