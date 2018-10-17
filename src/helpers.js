import Cookies from 'cookies-js'

export const truncate = (string, length) => {
  if (string.length <= length) {
    return string
  }

  return `${string.slice(0, length - 3)}...`
}

export const storeCredentialsInCookie = (chatId, conversationId, timeToLive) => {
  const payload = { chatId, conversationId }
  Cookies.set('recast-conversation', JSON.stringify(payload), { expires: 3600 * timeToLive })
}

export const getCredentialsFromCookie = () => {
  let credentials = Cookies.get('recast-conversation')

  if (credentials) {
    try {
      credentials = JSON.parse(credentials)
      return credentials
    } catch (err) {} // eslint-disable-line no-empty
  }

  return null
}
