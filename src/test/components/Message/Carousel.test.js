import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'

import { preferences } from 'test/preferenceUtil'
import Carousel from 'components/Message/Carousel'

describe('<Carousel>', () => {
  it('should render', () => {
    const wrapper = mount(
      <Carousel
        isLastMessage
        content={[{ title: 'card1' }]}
        preferences={preferences} />
    )
    expect(wrapper.find('Carousel').exists()).to.equal(true)
    wrapper.unmount()
  })
})

