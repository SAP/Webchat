import Cookies from 'cookies-js'

export const truncate = (string, length) => {
  if (string.length <= length) {
    return string
  }

  return `${string.slice(0, length - 3)}...`
}

export const getCredentialCookieName = (channelId) => {
  return `cai-conversation-${channelId}`
}

export const storeCredentialsInCookie = (chatId, conversationId, timeToLive, channelId) => {
  const payload = { chatId, conversationId }
  const cookieName = getCredentialCookieName(channelId)
  Cookies.set(cookieName, JSON.stringify(payload), { expires: 3600 * timeToLive })
}

export const getCredentialsFromCookie = (channelId) => {
  const cookieName = getCredentialCookieName(channelId)
  let credentials = Cookies.get(cookieName)

  if (credentials) {
    try {
      credentials = JSON.parse(credentials)
      return credentials
    } catch (err) {} // eslint-disable-line no-empty
  }

  return null
}
