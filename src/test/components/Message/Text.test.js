import React from 'react'
import { mount } from 'enzyme'
import { assert, expect } from 'chai'

import { preferences } from 'test/preferenceUtil'
import Text, { getValidMarkDownLinkString } from 'components/Message/Text'

describe('<Text>', () => {
  it('should render MarkDown', () => {
    const wrapper = mount(
      <Text
        isMarkdown
        style={{}}
        content={'- This is a text message.  **bold test**  see https://wwww.sap.com'}
        preferences={preferences} />
    )
    expect(wrapper.find('Text').exists()).to.equal(true)
    expect(wrapper.find('ReactMarkdown').exists(), 'Markdown test').to.equal(true)
    expect(wrapper.find('ul').exists(), 'ul item test').to.equal(true)
    expect(wrapper.find('li').exists(), 'li item test').to.equal(true)
    expect(wrapper.find('strong').exists(), 'Bold test').to.equal(true)
    const anchor = wrapper.find('a')
    expect(anchor.exists(), 'Link test').to.equal(true)
    expect(anchor.prop('href')).to.equal('https://wwww.sap.com')
    expect(anchor.prop('target')).to.equal('_blank')
    wrapper.unmount()
  })
  it('should render MarkDown readOnly', () => {
    const wrapper = mount(
      <Text
        isMarkdown
        readOnlyMode
        style={{}}
        content={'**This is a text message**    see https://wwww.sap.com'}
        preferences={preferences} />
    )
    expect(wrapper.find('Text').exists()).to.equal(true)
    expect(wrapper.find('ReactMarkdown').exists()).to.equal(true)
    const anchor = wrapper.find('a')
    expect(anchor.exists()).to.equal(true)
    expect(anchor.prop('href')).to.equal('#')
    wrapper.unmount()
  })
  it('Markdown link validation test', () => {
    assert.isNull(getValidMarkDownLinkString(false, 'Testing text'), 'Not a markdown')
    assert.isNull(getValidMarkDownLinkString(true), 'Missing markdown text')
    expect(getValidMarkDownLinkString(true, '[Testing text]'), 'Text markdown').to.equal('[Testing text]')
  })
})

