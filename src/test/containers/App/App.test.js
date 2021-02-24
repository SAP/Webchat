import React from 'react'
import { configure, shallow } from 'enzyme'
import { expect } from 'chai'
import Adapter from 'enzyme-adapter-react-16'
import { IntlProvider } from 'react-intl'
import { store } from 'test/mockStore'
import { preferences } from 'test/preferenceUtil'

import App from 'containers/App'

configure({ adapter: new Adapter() })

describe('<App>', () => {
  it('should render empty', () => {
    const wrapper = shallow(<IntlProvider locale={'en'}><App store={store} preferences={preferences} /></IntlProvider>)
    expect(wrapper.find('div').exists()).to.equal(false)
  })
})
