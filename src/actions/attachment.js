import { createAction } from 'redux-actions'

export const postAttachment = createAction('CROSSAPI:POST_ATTACHMENT', (imageUrl, token, data) => ({
  url: `${imageUrl}`,
  method: 'post',
  headers: { Authorization: token },
  data
}))
