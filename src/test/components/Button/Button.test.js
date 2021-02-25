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
    expect(wrapper.find('Button').exists()).to.equal(false)
  })
  it('should render', () => {
    const wrapper = mount(createButton({ value: 'Value', title: 'Title', type: 'postback' }, false))
    expect(wrapper.find('Button').exists()).to.equal(true)
    wrapper.unmount()
  })
  it('should render url', () => {
    const wrapper = mount(createButton({ value: 'http://wwww.sap.com', title: 'Url', type: 'web_url' }, false))
    expect(wrapper.find('a').exists()).to.equal(true)
    expect(
      wrapper.containsMatchingElement(
        <a
          className='RecastAppButton-Link CaiAppButton-Link' href='http://wwww.sap.com' target='_blank'
          rel='noopener noreferrer'>
          Url
        </a>
      )
    ).to.equal(true)
    wrapper.unmount()
  })
  it('should render url readonly', () => {
    const wrapper = mount(createButton({ value: 'http://wwww.sap.com', title: 'Url', type: 'web_url' }, true))
    expect(wrapper.find('a').exists()).to.equal(true)
    expect(
      wrapper.containsMatchingElement(
        <a
          className='RecastAppButton-Link CaiAppButton-Link CaiAppButton--ReadOnly' href='#' target='_self'
          rel='noopener noreferrer'>
          Url
        </a>
      )
    ).to.equal(true)
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
    expect(
      wrapper.containsMatchingElement(
        <a className='RecastAppButton-Link CaiAppButton-Link' href='tel:123-123-1234'>
          Title
        </a>
      )
    ).to.equal(true)
    wrapper.unmount()
  })
  it('should render phone 2', () => {
    const wrapper = mount(createButton({ value: '123-123-1234', title: 'Phone number 2', type: 'phonenumber' }, false))
    expect(wrapper.find('a').exists()).to.equal(true)
    expect(
      wrapper.containsMatchingElement(
        <a className='RecastAppButton-Link CaiAppButton-Link' href='tel:123-123-1234'>
          Phone number 2
        </a>
      )
    ).to.equal(true)
    wrapper.unmount()
  })
  it('should render phone readonly', () => {
    const wrapper = mount(createButton({ value: '123-123-1234', title: 'Read Only', type: 'phonenumber' }, true))
    expect(wrapper.find('a').exists()).to.equal(true)
    expect(
      wrapper.containsMatchingElement(
        <a className='RecastAppButton-Link CaiAppButton-Link CaiAppButton--ReadOnly' href='#'>
          Read Only
        </a>)
    ).to.equal(true)
    wrapper.unmount()
  })
})

