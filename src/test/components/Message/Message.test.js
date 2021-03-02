import React from 'react'
import { mount } from 'enzyme'
import { assert, expect } from 'chai'

import { createAttachment } from 'test/messageUtil'

import { preferences } from 'test/preferenceUtil'
import Message from 'components/Message'

describe('<Message>', () => {
  it('should render unknown type', () => {
    const wrapper = mount(
      <Message
        message={createAttachment('1001', 'Unknown', true, { text: '(Unknone) Message Text' })}
        isLastMessage
        onRetrySendMessage={() => { /* */ }}
        onCancelSendMessage={() => { /* */ }}
        onImageLoaded={() => { /* */ }}
        sendMessage={() => { /* */ }}
        preferences={preferences} />
    )
    expect(wrapper.find('Message').exists()).to.equal(true)
    wrapper.unmount()
  })
  it('should render missing content', () => {
    const model = createAttachment('1001', 'Unknown', true, { text: 'Missing Content' })
    model.attachment.content = null
    const wrapper = mount(
      <Message
        message={model}
        isLastMessage
        onRetrySendMessage={() => { /* */ }}
        onCancelSendMessage={() => { /* */ }}
        onImageLoaded={() => { /* */ }}
        sendMessage={() => { /* */ }}
        preferences={preferences} />
    )
    expect(wrapper.find('Message').exists()).to.equal(true)
    wrapper.unmount()
  })
  it('should render showInfo', () => {
    preferences.botPicture = 'https://bot.gif'
    preferences.userPicture = 'https://user.gif'
    let clicked = false
    const wrapper = mount(
      <Message
        message={createAttachment('1001', 'test', true, { text: 'Show Information Message Text' })}
        showInfo
        onClickShowInfo={(() => { clicked = true })}
        retry
        isLastMessage
        onRetrySendMessage={() => { /* */ }}
        onCancelSendMessage={() => { /* */ }}
        onImageLoaded={() => { /* */ }}
        sendMessage={() => { /* */ }}
        preferences={preferences} />
    )
    expect(wrapper.find('Message').exists()).to.equal(true)
    expect(
      wrapper.containsMatchingElement(
        <img src='https://cdn.cai.tools.sap/website/bot-builder/info.png' />
      )
    ).to.equal(true)
    // Test showInfoClick
    wrapper.find('div').at(2).simulate('click')
    assert.isTrue(clicked)
    // cause exception to be throw simulation
    const instance = wrapper.find('Message').instance()
    assert.isFalse(instance._isValidRenderType())
    assert.isFalse(instance._isValidRenderType('UnknownType'))
    assert.isFalse(instance._isValidRenderType('client_data'))
    instance.componentDidCatch('Testing Error handling', {})
    wrapper.update()
    wrapper.unmount()
  })
})

