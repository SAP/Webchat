import * as messages from 'actions/messages'
import chai, { expect } from 'chai'
import like from 'chai-like'

chai.use(like)

process.on('unhandledRejection', () => {
// ignore the promise reject since we only testing the post part for now. console.info(err)
})

const tokenId = 'token123'

describe('Action Messages', () => {
  it('Messages postMessage', () => {
    const data = { text: 'Text Message' }
    const expectedAction = {
      type: 'API:POST_MESSAGE',
      payload: {
        method: 'post',
        url: '/webhook/channelId',
      },
    }
    expect(messages.postMessage('channelId', tokenId, data)).to.like(expectedAction)
  })

  it('Messages getMessages', () => {
    const expectedAction = {
      type: 'API:GET_MESSAGES',
      payload: {
        method: 'get',
        url: '/webhook/channelId/conversations/conversationId/messages',
      },
    }
    expect(messages.getMessages('channelId', tokenId, 'conversationId')).to.like(expectedAction)
  })

  it('Messages pollMessages', () => {
    const expectedAction = {
      type: 'API:POLL_MESSAGES',
      payload: {
        method: 'get',
        url: '/webhook/channelId/conversations/conversationId/poll',
      },
    }
    expect(messages.pollMessages('channelId', tokenId, 'conversationId', 'lastMessageId')).to.like(expectedAction)
  })
  it('Messages addBotMessage', () => {
    const expectedAction = {
      type: 'ADD_BOT_MESSAGE',
    }
    expect(messages.addBotMessage([], { text: 'Message' })).to.like(expectedAction)
  })

  it('Messages addUserMessage', () => {
    const expectedAction = {
      type: 'ADD_USER_MESSAGE',
    }
    expect(messages.addUserMessage()).to.like(expectedAction)
  })

  it('Messages removeMessage', () => {
    const expectedAction = {
      type: 'REMOVE_MESSAGE',
    }
    expect(messages.removeMessage()).to.like(expectedAction)
  })

  it('Messages setFirstMessage', () => {
    const expectedAction = {
      type: 'SET_FIRST_MESSAGE',
    }
    expect(messages.setFirstMessage()).to.like(expectedAction)
  })

  it('Messages removeAllMessages', () => {
    const expectedAction = {
      type: 'REMOVE_ALL_MESSAGES',
    }
    expect(messages.removeAllMessages()).to.like(expectedAction)
  })
})
