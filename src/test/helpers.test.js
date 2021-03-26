import { assert } from 'chai'
import {
  truncate,
  safeArrayOfItem,
  safeBooleanValue,
  safeStringValue,
  validButtonContent,
  getCredentialsFromLocalStorage,
  storeCredentialsToLocalStorage,
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
})

