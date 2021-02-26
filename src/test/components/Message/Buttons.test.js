import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'

import { preferences } from 'test/preferenceUtil'
import Buttons from 'components/Message/Buttons'

describe('<Buttons>', () => {
  it('should render', () => {
    const wrapper = mount(
      <Buttons
        isLastMessage
        content={{ title: 'Title', buttons: [{ value: 'hi', type: 'postback', title: 'Test' }] }}
        preferences={preferences}
        onClick={() => { /* */ }} />
    )
    expect(wrapper.find('Buttons').exists()).to.equal(true)
    wrapper.unmount()
  })
})

