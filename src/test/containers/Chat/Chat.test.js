import React from 'react'
import { configure, mount, shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { Provider } from 'react-redux'

import { store, sampleMessages } from 'test/mockStore'
import { preferences } from 'test/preferenceUtil'

import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import Chat from 'containers/Chat'

const chatApp = (
  <Provider store={store} >
    <Chat
      show
      containerMessagesStyle={{ height: '500' }}
      footerStyle={{ height: '5.0rem' }}
      conversationId={'conversationId'}
      messages={sampleMessages}
      token={'tokenId'}
      channelId={'tokenId'}
      preferences={preferences} />
  </Provider>
)
describe('<Chat>', () => {

  it('should render empty', () => {
    const wrapper = shallow(<Chat store={store} />)
    expect(wrapper.find('div').exists()).to.equal(false)
  })

  it('should render', (done) => {
    const wrapper = mount(chatApp)
    const chat = wrapper.find('Chat')
    expect(chat.exists()).to.equal(true)

    // Stop polling
    chat.setState({ show: false })
    chat.update()
    setTimeout(() => {
      wrapper.unmount()
      done()
    }, 100)
  })

  it('Test methods', (done) => {
    const wrapper = mount(chatApp)
    const ChatApp = wrapper.find('Chat')
    const instance = ChatApp.instance()
    instance.cancelSendMessage({ id: 'testId', conversationExpired: true })
    // instance.doMessagesPolling()
    const currentCount = 0
    expect(instance._deteremNumberCallsWithoutAnyMessages(currentCount, false, null), 'Count without messages').to.equal(currentCount + 1)
    expect(instance._deteremNumberCallsWithoutAnyMessages(currentCount, true, null), 'Count with waittime').to.equal(currentCount)
    expect(instance._deteremNumberCallsWithoutAnyMessages(currentCount, false, [{ item: '1' }]), 'Count with messages').to.equal(currentCount)
    expect(instance._shouldSetWaitTime(true, 0), 'Should set waittime (backend set waittime').to.equal(true)
    expect(instance._shouldSetWaitTime(false, 0), 'No waittime').to.equal(false)
    expect(instance._shouldSetWaitTime(false, 5), 'No waittime, count below threshold').to.equal(false)
    expect(instance._shouldSetWaitTime(false, 6), 'No waittime, count above threshold').to.equal(true)
    assert.isUndefined(instance.shouldHideBotReply({}), 'shouldHideBotReply')
    instance._onSendMessagePromiseCompleted({ data: { messages: [] } })
    // instance.sendMessage({ id: 'testId', type: 'text', content: 'Text' }, true)
    // instance.retrySendMessage({ id: 'testId', type: 'text', content: 'Text' })
    // instance.retrySendMessage({ id: 'testId', type: 'text', content: 'Text', conversationExpired: true })
    instance.getMemoryOptions('chatId').then((data) => {
      expect(data.merge).to.equal(true)
      done()
    })
  })

})
