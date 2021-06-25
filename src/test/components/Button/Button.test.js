import React from 'react'
import { mount, shallow } from 'enzyme'
import { assert, expect } from 'chai'

import Button from 'components/Button'

let sendMessageFlag = false
const createButton = (params, readOnlyMode) => {
  return (
    <Button
      readOnlyMode={readOnlyMode}
      sendMessage={() => { sendMessageFlag = true }}
      button={params} />
  )
}
const buttonUrlValues = { value: 'http://wwww.sap.com', title: 'Url', type: 'web_url' }
const phonenumber = { value: 'tel:123-123-1234', title: 'Phone number 2', type: 'phonenumber' }

describe('<Button>', () => {

  it('should render empty', () => {
    const wrapper = shallow(<Button />)
    expect(wrapper.find('Button').exists()).to.equal(false)
  })
  it('should render', () => {
    sendMessageFlag = false
    const wrapper = mount(createButton({
      value: 'Value',
      title: 'Title This is a very lone text to see if the tooltip part will be added after 80 characters of text.',
      type: 'postback' }, false))
    expect(wrapper.find('Button').exists()).to.equal(true)
    wrapper.find('Button').simulate('click')
    assert.isTrue(sendMessageFlag, 'Button click simulation')
    wrapper.unmount()
  })
  it('should render url', () => {
    const wrapper = mount(createButton(buttonUrlValues, false))
    const anchor = wrapper.find('a')
    expect(anchor.exists()).to.equal(true)
    expect(anchor.prop('href')).to.equal(buttonUrlValues.value)
    expect(anchor.prop('target')).to.equal('_blank')
    wrapper.unmount()
  })
  it('should render url readonly', () => {
    const wrapper = mount(createButton(buttonUrlValues, true))
    const anchor = wrapper.find('a')
    expect(anchor.exists()).to.equal(true)
    expect(anchor.prop('href')).to.equal('#')
    expect(anchor.prop('target')).to.equal('_self')
    wrapper.unmount()
  })
  it('handle render invalid url', () => {
    // eslint-disable-next-line no-script-url
    const wrapper = mount(createButton({ value: 'javascript:alert(document.domain)', title: 'Url', type: 'web_url' }, false))
    expect(wrapper.find('a').exists()).to.equal(false)
    wrapper.unmount()
  })
  it('should render phone', () => {
    const wrapper = mount(createButton({ value: '123-123-1234', title: 'Title', type: 'phonenumber' }, false))
    const anchor = wrapper.find('a')
    expect(anchor.exists()).to.equal(true)
    expect(anchor.prop('href')).to.equal('tel:123-123-1234')
    wrapper.unmount()
  })
  it('should render phone 2', () => {
    const wrapper = mount(createButton(phonenumber, false))
    const anchor = wrapper.find('a')
    expect(anchor.exists()).to.equal(true)
    expect(anchor.prop('href')).to.equal(phonenumber.value)
    wrapper.unmount()
  })
  it('should render phone readonly', () => {
    const wrapper = mount(createButton(phonenumber, true))
    const anchor = wrapper.find('a')
    expect(anchor.exists()).to.equal(true)
    expect(anchor.prop('href')).to.equal('#')
    wrapper.unmount()
  })
})

