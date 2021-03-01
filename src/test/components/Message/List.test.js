import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'

import { preferences } from 'test/preferenceUtil'
import List from 'components/Message/List'

describe('<List>', () => {
  it('should render', () => {
    const wrapper = mount(
      <List
        isLastMessage
        content={{
          elements: [
            {
              title: 'Title',
              subtitle: 'subtitle',
              imageUrl: 'https://image.gif',
              buttons: [{ value: 'hi', type: 'postback', title: 'Test' }],
            },
            {
              title: 'Title',
              subtitle: 'subtitle',
              imageUrl: 'https://image.gif',
              buttons: [{ value: 'tel:1231231234', type: 'phonenumber', title: 'Test' }],
            },
            {
              title: 'Title',
              subtitle: 'subtitle',
              imageUrl: 'https://image.gif',
              buttons: [{ value: 'https://sap.com', type: 'web_url', title: 'Test' }],
            },
            {
              title: 'Title',
              subtitle: 'subtitle',
              imageUrl: 'https://image.gif',
              buttons: [{ value: 'abc123', type: 'web_url', title: 'Test' }],
            },
          ],
          buttons: [{ value: 'hi', type: 'postback', title: 'Test' }] }}
        preferences={preferences}
        onClick={() => { /* */ }} />
    )
    expect(wrapper.find('List').exists()).to.equal(true)
    wrapper.unmount()
  })
})

