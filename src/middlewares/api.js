import config from 'config'
import qs from 'query-string'

export default store => next => action => {

  console.log(action)

  if (!action.type.startsWith('API:')) {
    return next(action)
  }

  const { dispatch } = store
  const prefix = action.type.split(':')[1]
  const { method = 'get', url, data, headers, query } = action.payload

  const payload = {
    method,
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
  }

  const fullUrl = `${config.apiUrl}${url}${query ? '?' : ''}${qs.stringify(query || {})}`
  return fetch(fullUrl, payload)
    .then(res => res.json())
    .then(data => {
      dispatch({ type: `${prefix}_SUCCESS`, payload: { ...data.results } })
      return data.results
    })
    .catch(err => {
      dispatch({ type: `${prefix}_ERROR` })
      throw new Error(err)
    })
}
