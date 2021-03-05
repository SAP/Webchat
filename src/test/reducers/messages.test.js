import messages, { initialState } from '../../reducers/messages'
import { expect } from 'chai'

describe('Reducer messages', () => {
  it('SET_FIRST_MESSAGE', () => {
    const action = { type: 'SET_FIRST_MESSAGE', payload: { message: { id: '1' } } }
    const newState = messages(initialState, action)
    expect(newState[0].attachment.content).to.equal(action.payload)
  })

  it('POLL_MESSAGES_SUCCESS', () => {
    const action = { type: 'POLL_MESSAGES_SUCCESS', payload: { messages: [{ id: '1' }] } }
    const newState = messages(initialState, action)
    expect(newState[0]).to.equal(action.payload.messages[0])
  })

  it('POST_MESSAGE_SUCCESS', () => {
    const action = { type: 'POST_MESSAGE_SUCCESS', payload: { message: { id: '1' } } }
    const newState = messages(initialState, action)
    expect(newState).to.have.lengthOf(0)
    // Test with firstMessage true
    const pollaction = { type: 'POLL_MESSAGES_SUCCESS', payload: { messages: [{ id: '1' }] } }
    messages(initialState, pollaction)
  })

  it('GET_MESSAGES_SUCCESS', () => {
    const action = { type: 'GET_MESSAGES_SUCCESS', payload: { messages: [{ id: '1' }, { id: '2' }, { id: '3' }] } }
    const newState = messages(initialState, action)
    expect(newState).to.equal(action.payload)
  })

  it('POST_MESSAGE_ERROR', () => {
    const action = { type: 'POST_MESSAGE_ERROR', payload: { error: { response: { status: 404, statusText: 'Not found' }, message: 'Test Message' } } }
    const newState = messages(initialState, action)
    expect(newState[0]).to.exist
  })

  it('REMOVE_MESSAGE', () => {
    const action = { type: 'REMOVE_MESSAGE', payload: { messageId: 'TestId' } }
    const newState = messages(initialState, action)
    expect(newState).to.exist
  })

  it('REMOVE_ALL_MESSAGES', () => {
    const action = { type: 'REMOVE_ALL_MESSAGES' }
    const newState = messages(initialState, action)
    expect(newState).to.exist
  })

  it('ADD_BOT_MESSAGE', () => {
    const action = { type: 'ADD_BOT_MESSAGE', payload: { messages: [{ id: '1' }] } }
    const newState = messages(initialState, action)
    expect(newState).to.exist
  })

  it('ADD_USER_MESSAGE', () => {
    const action = { type: 'ADD_USER_MESSAGE', payload: { messages: [{ id: '1' }] } }
    const newState = messages(initialState, action)
    expect(newState).to.exist
  })

})
