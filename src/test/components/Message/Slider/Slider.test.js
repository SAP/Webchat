import React from 'react'
import { mount } from 'enzyme'
import { assert, expect } from 'chai'

import Slider from 'components/Message/Slider'
import { PrevArrow, NextArrow } from 'components/arrows'

describe('<Slider>', () => {
  it('should render', () => {
    const wrapper = mount(
      <div style={{ width: '100px' }}>
        <Slider
          arrows
          prevArrow={<PrevArrow />}
          nextArrow={<NextArrow />}
        >
          <div key='0' style={{ width: '100px' }} />
          <div key='1' style={{ width: '100px' }} />
          <div key='2' style={{ width: '100px' }} />
          <div key='3' style={{ width: '100px' }} />
          <div key='4' style={{ width: '100px' }} />
          <div key='5' style={{ width: '100px' }} />
        </Slider>
      </div>
    )
    expect(wrapper.find('Slider').exists()).to.equal(true)
    wrapper.find('Slider').setState({ translateWidth: 100, index: 1 })
    wrapper.update()
    const instance = wrapper.find('Slider').instance()
    assert.isTrue(instance.hasMaxElementsDisplayed())
    wrapper.find('Slider').setState({ canPrevious: true, canNext: true })
    wrapper.update()
    instance.onClickNext()
    instance.onClickPrevious()
    wrapper.unmount()
  })
})

