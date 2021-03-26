import React from 'react'
import { mount } from 'enzyme'
import { assert, expect } from 'chai'

import { preferences } from 'test/preferenceUtil'
import QuickReplies from 'components/Message/QuickReplies'

describe('<QuickReplies>', () => {
  it('should render', () => {
    let messageSend = false
    const wrapper = mount(
      <QuickReplies
        isLastMessage
        sendMessage={() => { messageSend = true }}
        style={{}}
        content={{ title: 'Title', buttons: [{ value: 'hi', type: 'postback', title: 'Test' }] }}
        preferences={preferences}
        onClick={() => { /* */ }} />
    )
    expect(wrapper.find('QuickReplies').exists()).to.equal(true)
    expect(wrapper.find('Slider').exists()).to.equal(true)
    expect(wrapper.find('Track').exists()).to.equal(true)

    // Get the button to test on click event
    const clickDiv = wrapper.find('Track').at(0).find('div').at(4)
    expect(clickDiv.exists()).to.equal(true)

    clickDiv.simulate('click')
    assert.isTrue(messageSend, 'Message send Test')

    // Check double click
    messageSend = false
    clickDiv.simulate('click')
    assert.isFalse(messageSend, 'Sending Message twice Test - Should not send second time')
    wrapper.unmount()
  })
})

