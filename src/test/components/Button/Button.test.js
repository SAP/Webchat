import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'

import Button from 'components/Button'

const createButton = (params, readOnlyMode) => {
  return (
    <Button
      readOnlyMode={readOnlyMode}
      button={params} />
  )
}

describe('<Button>', () => {

  it('should render empty', () => {
    const wrapper = shallow(<Button />)
    expect(wrapper.find('div').exists()).to.equal(false)
  })
  it('should render', () => {
    const wrapper = mount(createButton({ value: 'Value', title: 'Title', type: 'postback' }, false))
    expect(wrapper.find('div').exists()).to.equal(true)
    wrapper.unmount()
  })
  it('should render url', () => {
    const wrapper = mount(createButton({ value: 'http://wwww.sap.com', title: 'Url', type: 'web_url' }, false))
    expect(wrapper.find('a').exists()).to.equal(true)
    wrapper.unmount()
  })
  it('should render url readonly', () => {
    const wrapper = mount(createButton({ value: 'http://wwww.sap.com', title: 'Url', type: 'web_url' }, true))
    expect(wrapper.find('a').exists()).to.equal(true)
    wrapper.unmount()
  })
  it('handle render invalid url', () => {
    const wrapper = mount(createButton({ value: 'Testing', title: 'Url', type: 'web_url' }, false))
    expect(wrapper.find('a').exists()).to.equal(false)
    wrapper.unmount()
  })
  it('should render phone', () => {
    const wrapper = mount(createButton({ value: 'tel:123-123-1234', title: 'Title', type: 'phonenumber' }, false))
    expect(wrapper.find('a').exists()).to.equal(true)
    wrapper.unmount()
  })
  it('should render phone 2', () => {
    const wrapper = mount(createButton({ value: '123-123-1234', title: 'Title', type: 'phonenumber' }, false))
    expect(wrapper.find('a').exists()).to.equal(true)
    wrapper.unmount()
  })
  it('should render phone readonly', () => {
    const wrapper = mount(createButton({ value: '123-123-1234', title: 'Title', type: 'phonenumber' }, true))
    expect(wrapper.find('a').exists()).to.equal(true)
    wrapper.unmount()
  })
})

