import conversation, { initialState } from '../../reducers/conversation'
import { expect } from 'chai'

describe('Reducer conversation', () => {
  it('SET_CREDENTIALS', () => {
    const action = { type: 'SET_CREDENTIALS', payload: { token: 'token', chatId: 'chatId', channelId: 'channelId', conversationId: 'msgId', lastMessageId: 'lastId' } }
    const newState = conversation(initialState, action)
    expect(newState.token).to.equal(action.payload.token)
  })
  it('REMOVE_CONVERSATION_ID', () => {
    const action = { type: 'REMOVE_CONVERSATION_ID', payload: { token: 'token', chatId: 'chatId', channelId: 'channelId', conversationId: 'msgId', lastMessageId: 'lastId' } }
    const newState = conversation(initialState, action)
    expect(newState.token).to.equal('')
  })
  it('CREATE_CONVERSATION_SUCCESS', () => {
    const action = { type: 'CREATE_CONVERSATION_SUCCESS', payload: { id: 'conversationId', chatId: 'chatId' } }
    const newState = conversation(initialState, action)
    expect(newState.conversationId).to.equal(action.payload.id)
  })
  it('GET_MESSAGES_SUCCESS', () => {
    const action = { type: 'GET_MESSAGES_SUCCESS', payload: { messages: [{ id: '1' }, { id: '2' }, { id: '3' }] } }
    const newState = conversation(initialState, action)
    expect(newState.lastMessageId).to.equal(action.payload.messages[2].id)
    action.payload.messages = []
    conversation(initialState, action)
  })
  it('POLL_MESSAGES_SUCCESS', () => {
    const action = { type: 'POLL_MESSAGES_SUCCESS', payload: { messages: [{ id: '1' }, { id: '2' }, { id: '3' }] } }
    const newState = conversation(initialState, action)
    expect(newState.lastMessageId).to.equal(action.payload.messages[2].id)
    action.payload.messages = []
    conversation(initialState, action)
  })
  it('POLL_MESSAGES_ERROR', () => {
    const action = { type: 'POLL_MESSAGES_ERROR', payload: { error: { response: { } } } }
    const newState = conversation(initialState, action)
    expect(newState.token).to.equal('')
    const action2 = { type: 'POLL_MESSAGES_ERROR', payload: { error: { response: { status: 404, data: { message: 'Conversation not found' } } } } }
    const newState2 = conversation(initialState, action2)
    expect(newState2.token).to.equal('')
  })
})
