import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'

import { preferences } from 'test/preferenceUtil'
import List from 'components/Message/List'

const imageUrl = 'https://image.gif'
const uimodel = {
  elements: [
    {
      title: 'Title 1',
      subtitle: 'subtitle 1',
      imageUrl,
      buttons: [{ value: 'hi', type: 'postback', title: 'Test' }],
    },
    {
      title: 'Title 2',
      subtitle: 'subtitle 2',
      imageUrl,
      buttons: [{ value: 'tel:1231231234', type: 'phonenumber', title: 'Test' }],
    },
    {
      title: 'Title 3',
      subtitle: 'subtitle 3',
      imageUrl,
      buttons: [{ value: 'https://sap.com', type: 'web_url', title: 'Test' }],
    },
    {
      title: 'Title 4',
      subtitle: 'subtitle 4',
      imageUrl,
      buttons: [{ value: 'abc123', type: 'web_url', title: 'Test' }],
    },
  ],
  buttons: [{ value: 'hi', type: 'postback', title: 'Test' }] }

describe('<List>', () => {
  it('should render', () => {
    const wrapper = mount(
      <List
        isLastMessage
        content={uimodel}
        preferences={preferences}
        onClick={() => { /* */ }} />
    )
    expect(wrapper.find('List').exists()).to.equal(true)
    expect(wrapper.find('Button').exists()).to.equal(true)
    expect(wrapper.find('ListElement').at(3).exists()).to.equal(true)
    wrapper.unmount()
  })
  it('should render readOnly', () => {
    const wrapper = mount(
      <List
        isLastMessage
        readOnlyMode
        content={uimodel}
        preferences={preferences}
        onClick={() => { /* */ }} />
    )
    expect(wrapper.find('List').exists()).to.equal(true)
    expect(wrapper.find('Button').exists()).to.equal(true)
    expect(wrapper.find('ListElement').at(3).exists()).to.equal(true)
    wrapper.unmount()
  })
})

