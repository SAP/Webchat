import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'

import { preferences } from 'test/preferenceUtil'
import Card from 'components/Message/Card'

describe('<Card>', () => {
  it('should render', () => {
    const wrapper = mount(
      <Card
        isLastMessage
        content={{ title: 'Title' }}
        preferences={preferences}
        onClick={() => { /* */ }} />
    )
    expect(wrapper.find('Card').exists()).to.equal(true)
    wrapper.unmount()
  })
})

