import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'

import { preferences } from 'test/preferenceUtil'
import Picture from 'components/Message/Picture'

describe('<Picture>', () => {
  it('should render', () => {
    const wrapper = mount(
      <Picture
        isLastMessage
        content={'https://image.gif'}
        preferences={preferences} />
    )
    expect(wrapper.find('Picture').exists()).to.equal(true)
    expect(wrapper.find('img').exists()).to.equal(true)
    wrapper.unmount()
  })
  it('should render empty', () => {
    const wrapper = mount(
      <Picture
        isLastMessage
        // eslint-disable-next-line no-script-url
        content={'javascript:alert(document.domain)'}
        preferences={preferences} />
    )
    expect(wrapper.find('Picture').exists()).to.equal(true)
    expect(wrapper.find('img').exists()).to.equal(false)
    wrapper.unmount()
  })
})

