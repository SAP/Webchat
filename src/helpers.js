
export const truncate = (string, length) => {
  if (string.length <= length) {
    return string
  }

  return `${string.slice(0, length - 3)}...`
}

export const storeCredentialsInCookie = (chatId, conversationId, timeToLive) => {
  const payload = { chatId, conversationId }
  const maxAge = 3600 * timeToLive

  if (typeof window.localStorage !== 'undefined') {
    // if maxAge is 0 then it never expires.
    // Currently timeToLive is 0.002777777 (~1 sec) if set to never.
    // Check if never expires or is greater then 60 seconds to save id.
    if (maxAge === 0 || maxAge >= 60) {
      const expire = maxAge > 0 ? new Date().getTime() + (maxAge * 1000) : 0
      const localData = { expire, payload }
      localStorage.setItem('cai-conversation', JSON.stringify(localData))
    } else if (localStorage.getItem('cai-conversation')) {
      localStorage.removeItem('cai-conversation')
    }
  }
}

export const getCredentialsFromCookie = () => {
  if (typeof window.localStorage !== 'undefined') {
    const localStorageData = localStorage.getItem('cai-conversation')

    if (localStorageData) {
      try {
        const time = new Date().getTime()
        const localData = JSON.parse(localStorageData)
        const secondsLeftBeforeExpires = localData.expire === 0 ? 9999 : parseInt((localData.expire - time) / 1000, 10)
        if (secondsLeftBeforeExpires > 0) {
          return localData.payload
        }
        // The data has expired if we got here, so remove it from the storage.
        localStorage.removeItem('cai-conversation')
      } catch (err) {} // eslint-disable-line no-empty
    }
  }
  return null
}
