import React from 'react'
import { mount } from 'enzyme'
import { assert, expect } from 'chai'

import IsTyping from 'components/Message/isTyping'

describe('<IsTyping>', () => {
  it('should render', (done) => {
    let timeoutcalled = false
    const wrapper = mount(
      <IsTyping
        onImageLoaded={() => { /* */ }}
        image={'https://image.gif'}
        callAfterTimeout={() => { timeoutcalled = true }}
        timeout={null}
      />

    )
    const typing = wrapper.find('IsTyping')
    expect(typing.exists()).to.equal(true)
    typing.instance()._setTimeoutCallBack()
    wrapper.setProps({ timeout: 30 })
    wrapper.update()
    setTimeout(() => {
      assert.isTrue(timeoutcalled, 'Time out call')
      wrapper.unmount()
      done()
    }, 50)

  })

  it('should render invalid image', () => {
    const wrapper = mount(
      <IsTyping
        onImageLoaded={() => { /* */ }}
        image={'abcd123'}
      />

    )
    const typing = wrapper.find('IsTyping')
    expect(typing.exists()).to.equal(true)
    wrapper.setProps({ callAfterTimeout: () => { /* */ } })
    wrapper.update()
    wrapper.unmount()
  })
})

