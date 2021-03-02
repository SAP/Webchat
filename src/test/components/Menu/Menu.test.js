import React from 'react'
import { mount } from 'enzyme'
import { assert, expect } from 'chai'

import { preferences } from 'test/preferenceUtil'
import Menu from 'components/Menu'

const menu = {
  title: 'Menu 1',
  call_to_actions: [{ type: 'nested',
    title: 'Nested',
    call_to_actions: [{ title: 'Pay Bill', type: 'postback' }] },
  { type: 'postback', title: 'Post back' },
  { type: 'Link', title: 'Link back' },
  { type: 'foo' }],
}

describe('<Menu>', () => {
  it('should render', () => {
    let addMenu = false
    let removeIndex = false
    let postback = false
    const wrapper = mount(
      <Menu
        currentMenu={menu}
        addMenuIndex={() => { addMenu = true }}
        removeMenuIndex={() => { removeIndex = true }}
        closeMenu={() => { /* */ }}
        postbackClick={() => { postback = true }}
        preferences={preferences} />
    )
    expect(wrapper.find('Menu').exists()).to.equal(true)
    const addMenuIndexDiv = wrapper.find('div').at(2)
    addMenuIndexDiv.simulate('click')
    assert.isTrue(addMenu)
    const instance = wrapper.find('Menu').instance()
    instance.handleMenuSelection()
    assert.isFalse(postback)
    instance.handleMenuSelection({ type: 'postback', title: 'Post back' })
    assert.isTrue(postback)
    const removeMenuIndexDiv = wrapper.find('div').at(1)
    removeMenuIndexDiv.simulate('click')
    assert.isTrue(removeIndex)

    wrapper.unmount()
  })
})

