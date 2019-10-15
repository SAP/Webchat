
export const truncate = (string, length) => {
  if (string.length <= length) {
    return string
  }

  return `${string.slice(0, length - 3)}...`
}

export const getCredentialCookieName = (channelId) => {
  return `cai-conversation-${channelId}`
}

export const storeCredentialsToLocalStorage = (chatId, conversationId, timeToLive, channelId) => {
  const payload = { chatId, conversationId }
  const maxAge = 3600 * timeToLive

  if (typeof window.localStorage !== 'undefined') {
    // if maxAge is 0 then it never expires.
    // Currently timeToLive is 0.002777777 (~1 sec) if set to never.
    const expire = maxAge > 0 ? new Date().getTime() + (maxAge * 1000) : 0
    const localData = { expire, payload }
    localStorage.setItem(getCredentialCookieName(channelId), JSON.stringify(localData))
  }
}

export const getCredentialsFromLocalStorage = (channelId) => {
  if (typeof window.localStorage !== 'undefined') {
    const localStorageData = localStorage.getItem(getCredentialCookieName(channelId))

    if (localStorageData) {
      try {
        const time = new Date().getTime()
        const localData = JSON.parse(localStorageData)
        const secondsLeftBeforeExpires = localData.expire === 0 ? 9999 : parseInt((localData.expire - time) / 1000, 10)
        if (secondsLeftBeforeExpires > 0) {
          return localData.payload
        }
        // The data has expired if we got here, so remove it from the storage.
        localStorage.removeItem(getCredentialCookieName(channelId))
      } catch (err) {} // eslint-disable-line no-empty
    }
  }
  return null
}
