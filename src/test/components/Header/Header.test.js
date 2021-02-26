import React from 'react'
import { mount } from 'enzyme'
import { expect, assert } from 'chai'

import { preferences } from 'test/preferenceUtil'
import Header from 'components/Header'

describe('<Header>', () => {
  it('should render', () => {
    const wrapper = mount(<Header preferences={preferences} onClick={() => { /* */ }} />)
    expect(wrapper.find('Header').exists()).to.equal(true)
    wrapper.unmount()
  })
  it('should render ReadOnly', () => {
    const wrapper = mount(<Header readOnlyMode preferences={preferences} onClick={() => { /* */ }} />)
    assert.isNotNull(wrapper.find('Header'))
    wrapper.unmount()
  })
})

