import * as conversation from 'actions/conversation'
import chai, { expect } from 'chai'
import like from 'chai-like'

chai.use(like)

process.on('unhandledRejection', () => {
// ignore the promise reject since we only testing the post part for now. console.info(err)
})

const tokenId = 'token123'

describe('Action Conversation', () => {
  it('Conversation setCredentials', () => {
    const data = { token: tokenId, chatId: 'chatId', channelId: 'channelId', conversationId: 'conId' }
    const expectedAction = {
      type: 'SET_CREDENTIALS',
      payload: { token: tokenId, chatId: 'chatId', channelId: 'channelId', conversationId: 'conId' },
    }
    expect(conversation.setCredentials(data)).to.like(expectedAction)
  })

  it('Conversation createConversation', () => {
    const expectedAction = {
      type: 'API:CREATE_CONVERSATION',
      payload: {
        method: 'post',
        url: '/webhook/channelId/conversations',
      },
    }
    expect(conversation.createConversation('channelId', tokenId)).to.like(expectedAction)
  })
})
