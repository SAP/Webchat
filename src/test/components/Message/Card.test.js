import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'

import { preferences } from 'test/preferenceUtil'
import Card from 'components/Message/Card'

describe('<Card>', () => {
  it('should render Empty', () => {
    const wrapper = mount(
      <Card
        isLastMessage
        // eslint-disable-next-line no-script-url
        content={{ title: 'Title', imageUrl: 'javascript:alert(document.domain)' }}
        preferences={preferences}
        onClick={() => { /* */ }} />
    )
    expect(wrapper.find('img').exists()).to.equal(false)
    wrapper.unmount()
  })

  it('should render', () => {
    const wrapper = mount(
      <Card
        isLastMessage
        content={{ title: 'Title', subtitle: 'subtitle', imageUrl: 'https://image.gif', buttons: [{ title: 'button1' }] }}
        preferences={preferences}
        onClick={() => { /* */ }} />
    )
    expect(wrapper.find('Card').exists(), 'Card test').to.equal(true)
    expect(wrapper.find('Button').exists(), 'Buttons test').to.equal(true)
    expect(wrapper.find('img').exists(), 'Image test').to.equal(true)
    expect(
      wrapper.containsMatchingElement(
        <p className='RecastAppCard--text-title CaiAppCard--text-title'>
          Title
        </p>), 'Title test'
    ).to.equal(true)
    expect(
      wrapper.containsMatchingElement(
        <p className='Card--text-subtitle'>
          subtitle
        </p>), 'Subtitle test'
    ).to.equal(true)

    wrapper.unmount()
  })
})

