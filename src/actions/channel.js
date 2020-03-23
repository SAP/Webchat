import config from '../config'
import axios from 'axios'

export const getChannelPreferences = (channelId, token) => {
  const client = axios.create({
    baseURL: config.apiUrl,
    headers: {
      Authorization: token,
      'X-Token': token,
      Accept: 'application/json',
    },
  })

  return client.get(`/webhook/${channelId}/preferences`).then(res => res.data.results)
}
