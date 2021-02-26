import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'

import { preferences } from 'test/preferenceUtil'
import Expander from 'components/Expander'

describe('<Expander>', () => {
  it('should render', () => {
    const wrapper = mount(<Expander preferences={preferences} onClick={() => { /* */ }} />)
    expect(wrapper.find('Expander').exists()).to.equal(true)
    wrapper.unmount()
  })
})

