import React from 'react'
import { mount } from 'enzyme'
import { assert, expect } from 'chai'

import { preferences } from 'test/preferenceUtil'
import Input from 'components/Input'

describe('<Input>', () => {
  it('should render', () => {
    const menu = {
      title: 'Menu 1',
      call_to_actions: [{ type: 'nested',
        title: 'Nested',
        call_to_actions: [{ title: 'Pay Bill', type: 'postback' }] },
      { type: 'postback', title: 'Post back' },
      { type: 'Link', title: 'Link back' },
      { type: 'foo' }],
    }

    const wrapper = mount(
      <Input
        characterLimit={10}
        enableHistoryInput
        isOpen
        menu={menu}
        onSubmit={() => { /* */ }}
        inputPlaceholder={'ask me question'}
        preferences={preferences} />
    )
    const componentWrapper = wrapper.find('Input')
    expect(componentWrapper.exists()).to.equal(true)
    const menuState = componentWrapper.state('menuOpened')
    componentWrapper.instance().triggerMenu()
    expect(componentWrapper.state('menuOpened'), ' Open menu test').to.equal(!menuState)

    componentWrapper.instance().onInputChange({ target: { value: 'This is over the character limit of 10' }, persist: () => { /* */ } })
    componentWrapper.instance().onInputChange({ target: { value: 'Testing' }, persist: () => { /* */ } })
    assert.isNotEmpty(componentWrapper.state('value'), 'Input value set')
    componentWrapper.instance().sendMessage()
    assert.isEmpty(componentWrapper.state('value'), 'Input value after submit')
    componentWrapper.instance().sendMessage()

    componentWrapper.instance().handleKeyboard('Esc')
    expect(componentWrapper.state('indexHistory'), 'History index').to.equal(1)
    componentWrapper.instance().handleKeyboard('ArrowUp')
    expect(componentWrapper.state('indexHistory'), 'History index after up arrow').to.equal(0)
    componentWrapper.instance().handleKeyboard('ArrowDown')
    expect(componentWrapper.state('indexHistory'), 'History index after down arrow').to.equal(1)
    componentWrapper.instance().handleKeyboard('ArrowDown')

    expect(componentWrapper.instance().getCurrentMenu().title).to.equal(menu.title)

    componentWrapper.instance().addMenuIndex(0)
    expect(componentWrapper.state('menuIndexes'), 'Add menu test').length(1)
    componentWrapper.instance().removeMenuIndex()
    expect(componentWrapper.state('menuIndexes'), 'Remove menu test').length(0)

    componentWrapper.instance().triggerMenu()
    expect(componentWrapper.state('menuOpened'), 'Close menu test').to.equal(menuState)
    componentWrapper.instance().sendMenuSelection('post')
    componentWrapper.instance().sendMenuSelection()
  })
  it('should render without isOpen', () => {
    const wrapper = mount(
      <Input
        characterLimit={10}
        enableHistoryInput
        onSubmit={() => { /* */ }}
        inputPlaceholder={'ask me question'}
        preferences={preferences} />
    )
    const componentWrapper = wrapper.find('Input')
    expect(componentWrapper.exists()).to.equal(true)
  })
})

