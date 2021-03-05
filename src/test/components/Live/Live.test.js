import React from 'react'
import { mount } from 'enzyme'
import { assert, expect } from 'chai'

import { preferences } from 'test/preferenceUtil'
import { createAttachment } from 'test/messageUtil'
import Live from 'components/Live'

const msg1 = createAttachment('1001', 'text', false, { text: 'Ask Bot Message Text' })
const msg2 = createAttachment('1002', 'text', true, { text: 'Answer Message Text' })

describe('<Live>', () => {
  it('should render', () => {
    let srollToBottom = false
    msg2.attachment.delay = '0.5'
    msg2.data = { hasDelay: true, hasNextMessage: true }
    const wrapper = mount(
      <Live
        onScrollBottom={() => { srollToBottom = true }}
        onRetrySendMessage={() => { /* */ }}
        onCancelSendMessage={() => { /* */ }}
        preferences={preferences}
        messages={[msg1, msg2]} />
    )
    const live = wrapper.find('Live')
    expect(live.exists(), 'Live existing test').equal(true)
    assert.isTrue(wrapper.find('Message').exists(), 'Message shown')
    live.setState({ showTyping: true })
    wrapper.update()
    live.instance().onImageLoaded()
    live.setState({ showTyping: false })
    live.update()
    expect(live.state('showTyping'), 'Busy indicator test').equal(false)
    live.instance().handleScroll()
    assert.isTrue(srollToBottom)
    wrapper.unmount()
  })

  it('should render empty', () => {
    const wrapper = mount(
      <Live
        messages={[]}
        preferences={preferences} />
    )
    const live = wrapper.find('Live')
    expect(live.exists()).equal(true)
    assert.isFalse(wrapper.find('Message').exists(), 'No Messages')
    const instance = live.instance()
    instance.componentDidUpdate({ messages: [msg1, msg2] })
    // Test methods when the message list ref is null.
    instance.messagesList = null
    // These methods do not return anything, just make sure they do not crash
    assert.doesNotThrow(() => {
      instance.onImageLoaded()
    }, 'Exception thrown for onImageLoaded')
    assert.doesNotThrow(() => {
      instance.handleScroll()
    }, 'Exception thrown for onImageLoaded')
    assert.doesNotThrow(() => {
      instance.componentDidUpdate({ messages: [msg1, msg2] })
    }, 'Exception thrown for componentDidUpdate')
    assert.doesNotThrow(() => {
      instance.componentDidMount()
    }, 'Exception thrown for componentDidMount')
    wrapper.unmount()
  })

})
