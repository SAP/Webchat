import React from 'react'
import { configure, mount, shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { Provider } from 'react-redux'

import { store, sampleMessages, createStore, buildInitialState } from 'test/mockStore'
import { preferences } from 'test/preferenceUtil'
import { conversationHistoryId, loadConversationHistoryPromise, sendMessagePromise } from 'test/codyEmulateTest'

import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import Chat from 'containers/Chat'

const emptyState = createStore(buildInitialState({}))
const chatApp = (isShown) => {
  return (
    <Provider store={store} >
      <Chat
        show={isShown}
        containerMessagesStyle={{ height: '500' }}
        footerStyle={{ height: '5.0rem' }}
        conversationId={'conversationId'}
        messages={sampleMessages}
        token={'tokenId'}
        channelId={'tokenId'}
        preferences={preferences} />
    </Provider>
  )
}
const setWindowGetmemory = () => {
  window.webchatMethods = {
    getMemory: (conversationId) => {
      let memory = null
      let merge = true
      switch (conversationId) {
      case '1':
        return 'Not an Object'
      case '2':
        merge = 'true'
        break
      case '3':
        memory = 'Memory String'
        break
      default:
        memory = { userName: 'Dominik Bousquet', userId: 123456 }
      }
      return { memory, merge }
    },
  }
}
const testGetMemoryPromise = (instance, done) => {
  setWindowGetmemory()
  instance.getMemoryOptions('1').then((noData) => {
    assert.isUndefined(noData, 'Not a string')
    instance.getMemoryOptions('2').then((stringBoolean) => {
      assert.isUndefined(stringBoolean)
      instance.getMemoryOptions('3').then((stringMemory) => {
        assert.isUndefined(stringMemory)
        instance.getMemoryOptions('chatId').then((data) => {
          expect(data.merge).to.equal(true)
          done()
        })
      })
    })
  })

}
describe('<Chat>', () => {

  it('should render empty', () => {
    const wrapper = shallow(<Chat store={emptyState} />)
    expect(wrapper.find('div').exists()).to.equal(false)
  })

  it('should render', (done) => {
    const wrapper = mount(chatApp(true))
    const chat = wrapper.find('Chat')
    expect(chat.exists()).to.equal(true)
    setTimeout(() => {
      wrapper.unmount()
      done()
    }, 100)
  })

  it('Test methods', (done) => {
    const wrapper = mount(chatApp(false))
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
    expect(instance._shouldStopMessagePolling(), '_shouldStopMessagePolling (Not Open)').to.equal(true)
    instance._onSendMessagePromiseCompleted({ data: { messages: [] } })
    instance.retrySendMessage({ id: 'testId', type: 'text', content: 'Text', conversationExpired: true })
    testGetMemoryPromise(instance, () => {
      wrapper.unmount()
      done()
    })
  })

  it('Test Cody', (done) => {
    const codywrapper = mount(
      <Provider store={emptyState} >
        <Chat
          show
          conversationId={null}
          primaryHeader={() => {
            return (<div>Primary Header</div>)
          }}
          sendMessagePromise={sendMessagePromise}
          conversationHistoryId={conversationHistoryId}
          loadConversationHistoryPromise={loadConversationHistoryPromise}
          preferences={preferences} />
      </Provider>
    )
    const ChatApp = codywrapper.find('Chat')
    expect(
      codywrapper.containsMatchingElement(
        <div>Primary Header</div>
      )
    ).to.equal(true)

    const instance = ChatApp.instance()
    instance.componentDidUpdate({ conversationHistoryId: 'abc' }, {})
    instance.sendMessage({ id: 'testId', type: 'text', content: 'Text' }, true)
    assert.throws(instance._onSendMessagePromiseCompleted, Error, 'Fail send message')
    sendMessagePromise({ attachment: { content: 'hi' } }).then((res) => {
      instance._onSendMessagePromiseCompleted(res)
    })

    setTimeout(() => {
      codywrapper.unmount()
      done()
    }, 500)
  })
  it('Test Cody (ReadOny', () => {
    const codywrapper = mount(
      <Provider store={emptyState} >
        <Chat
          show
          readOnlyMode
          secondaryView
          secondaryHeader={<div>Secondary Header</div>}
          conversationHistoryId={conversationHistoryId}
          loadConversationHistoryPromise={loadConversationHistoryPromise}
          preferences={preferences} />
      </Provider>
    )
    const ChatApp = codywrapper.find('Chat')
    expect(
      codywrapper.containsMatchingElement(
        <div>Secondary Header</div>
      )
    ).to.equal(true)
    const instance = ChatApp.instance()
    instance.componentDidUpdate({ conversationHistoryId: 'abc' }, {})
    instance.sendMessage({ id: 'testId', type: 'text', content: 'Text' }, true)
    assert.isUndefined(instance._sendMessage({ id: 'testId', type: 'text', content: 'Text' }, true))
    assert.throws(instance._onSendMessagePromiseCompleted, Error, 'Fail send message')
    sendMessagePromise({ attachment: { content: 'hi' } }).then((res) => {
      instance._onSendMessagePromiseCompleted(res)
    })
    codywrapper.unmount()
  })
})
