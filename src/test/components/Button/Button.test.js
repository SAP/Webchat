import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect, assert } from 'chai'

import Button from 'components/Button'

describe('<Button>', () => {

  it('should render empty', () => {
    const wrapper = shallow(<Button />)
    expect(wrapper.find('div').exists()).to.equal(false)
  })
  it('should render', () => {
    const wrapper = mount(<Button button={{ value: 'Value', title: 'Title', type: 'postback' }} />)
    expect(wrapper.find('div').exists()).to.equal(true)
    wrapper.unmount()
  })
  it('should render url', () => {
    const wrapper = mount(<Button button={{ value: 'http://wwww.sap.com', title: 'Url', type: 'web_url' }} />)
    expect(wrapper.find('a').exists()).to.equal(true)
    wrapper.unmount()
  })
  it('should render url readonly', () => {
    const wrapper = mount(<Button readOnlyMode button={{ value: 'http://wwww.sap.com', title: 'Url', type: 'web_url' }} />)
    expect(wrapper.find('a').exists()).to.equal(true)
    wrapper.unmount()
  })
  it('handle render invalid url', () => {
    const wrapper = mount(<Button button={{ value: 'Testing', title: 'Url', type: 'web_url' }} />)
    expect(wrapper.find('a').exists()).to.equal(false)
    wrapper.unmount()
  })
  it('should render phone', () => {
    const wrapper = mount(<Button button={{ value: 'tel:123-123-1234', title: 'Title', type: 'phonenumber' }} />)
    expect(wrapper.find('a').exists()).to.equal(true)
    wrapper.unmount()
  })
  it('should render phone 2', () => {
    const wrapper = mount(<Button button={{ value: '123-123-1234', title: 'Title', type: 'phonenumber' }} />)
    expect(wrapper.find('a').exists()).to.equal(true)
    wrapper.unmount()
  })
  it('should render phone readonly', () => {
    const wrapper = mount(<Button readOnlyMode button={{ value: '123-123-1234', title: 'Title', type: 'phonenumber' }} />)
    expect(wrapper.find('a').exists()).to.equal(true)
    wrapper.unmount()
  })
})

