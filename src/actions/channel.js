import config from '../config'
import axios from 'axios'

export const getChannelPreferences = (channelId, token) => {
  const client = axios.create({
    baseURL: config.apiUrl,
    headers: {
      Authorization: token,
      Accept: 'application/json',
    },
  })

  return client.get(`/webhook/${channelId}/preferences`).then(res => res.data.results)
}

export const register = (url) => {
  return axios.get(url)
    .then((response) => {
      const memory = response.data
      window.webchatMethods = {
        getMemory: () => {
          return { memory: memory, merge: true }
        },
      }
      window.webchatData = {}
      window.webchatData.savedUserData = memory
      return {}
    });
}
