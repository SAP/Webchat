import { assert } from 'chai'
import {
  truncate,
  safeArrayOfItem,
  safeBooleanValue,
  safeStringValue,
  validButtonContent,
  getCredentialsFromLocalStorage,
  storeCredentialsToLocalStorage,
  isLastMessageForIndex,
} from 'helpers'

describe('Test the helper utilities', () => {
  it('Test Helpers', () => {
    assert.equal(truncate('abcdef extra text', 6), 'abc...')
    assert.equal(truncate('abcdef', 30), 'abcdef')
    assert.equal(truncate({ }, 30), '')
  })

  it('Valid String test', () => {
    assert.equal(safeStringValue('abc'), 'abc', 'Testing safe of string')
    assert.equal(safeStringValue(123), '123', 'Testing safe of number')
    assert.equal(safeStringValue(123.99), '123.99', 'Testing safe of number')
    assert.equal(safeStringValue(), 'undefined', 'Testing safe of undefined')
    assert.equal(safeStringValue({ data: '123' }), '{"data":"123"}', 'Testing safe of Object')
    assert.equal(safeStringValue(true), '', 'Testing safe of Boolean')
  })

  it('Valid Array test', () => {
    assert.isTrue(safeArrayOfItem(null).length === 0, 'Testing array of null')
    assert.isTrue(safeArrayOfItem().length === 0, 'Testing array of undefined')
    assert.isTrue(safeArrayOfItem('<strong>abc</strong>').length === 0, 'Testing array of a string')
    assert.isTrue(safeArrayOfItem([{ one: 'item' }]).length === 1, 'Testing array of array')
  })

  it('Valid Boolean test', () => {
    assert.isFalse(safeBooleanValue(null), 'Testing Boolean of null')
    assert.isFalse(safeBooleanValue(), 'Testing Boolean of undefined')
    assert.isTrue(safeBooleanValue('true'), 'Testing Boolean of a string')
    assert.isTrue(safeBooleanValue(true), 'Testing Boolean')
  })

  it('Valid Button Content test', () => {
    assert.isNull(validButtonContent(null), 'Testing Button Content of null')
    assert.isUndefined(validButtonContent(), 'Testing Button Content of undefined')
    assert.isObject(validButtonContent({ type: 'postback' }), 'Testing Button Content')
  })

  it('Test Credentials LocalStorage', () => {
    assert.isNull(getCredentialsFromLocalStorage('channelId', 1, { firstname: 'test', lastname: 'user' }))
    storeCredentialsToLocalStorage('chatId', 'conversation-Id', 1, 'channelId')
    assert.propertyVal(getCredentialsFromLocalStorage('channelId', 1), 'conversationId', 'conversation-Id')
  })

  it('Test isLastMessageForIndex', () => {
    assert.isFalse(isLastMessageForIndex(), 'No params')
    assert.isFalse(isLastMessageForIndex([], 0), 'Empty params')
    assert.isTrue(isLastMessageForIndex([{ attachment: { type: 'foo' } }], 0), 'Is first and last message')
    assert.isTrue(isLastMessageForIndex([
      { attachment: { type: 'quickreplies' } },
      { attachment: { type: 'client_data' } }], 0), 'Has client data after the first (quickreplies) message')
    assert.isFalse(isLastMessageForIndex([
      { attachment: { type: 'text' } },
      { attachment: { type: 'client_data' } }], 0), 'Has client data after the first (text) message')
    assert.isTrue(isLastMessageForIndex([
      { attachment: { type: 'quickreplies' } },
      { attachment: { type: 'client_data' } },
      { attachment: { type: 'client_data' } }], 0), 'Has two client data after the first message')
    assert.isTrue(isLastMessageForIndex([{ attachment: { type: 'client_data' } }], 0), 'Only client data')
    assert.isFalse(isLastMessageForIndex([
      { attachment: { type: 'quickreplies' } },
      { attachment: { type: 'client_data' } },
      { attachment: { type: 'buttons' } },
      { attachment: { type: 'client_data' } }], 0))
    assert.isFalse(isLastMessageForIndex([
      { attachment: { type: 'quickreplies' } },
      { attachment: { type: 'client_data' } },
      { attachment: { type: 'buttons' } },
      { attachment: { type: 'client_data' } }], 1))
    assert.isTrue(isLastMessageForIndex([
      { attachment: { type: 'button' } },
      { attachment: { type: 'client_data' } },
      { attachment: { type: 'quickreplies' } },
      { attachment: { type: 'client_data' } }], 2))
    assert.isFalse(isLastMessageForIndex([
      { attachment: { type: 'quickreplies' } },
      { attachment: { type: 'buttons' } }], 2), 'Test out of range')
    assert.isTrue(isLastMessageForIndex([
      { attachment: { type: 'quickreplies' } },
      { attachment: { type: 'buttons' } }], 1), 'Test is Last one')
    assert.isFalse(isLastMessageForIndex([
      { attachment: { type: 'quickreplies' } },
      { attachment: { type: 'buttons' } }], 0), 'Is First message')
  })
})

