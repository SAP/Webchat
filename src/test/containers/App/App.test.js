import React from 'react'
import { Provider } from 'react-redux'

import { configure, shallow, mount } from 'enzyme'
import { assert, expect } from 'chai'
import Adapter from 'enzyme-adapter-react-16'
import { store } from 'test/mockStore'
import { preferences } from 'test/preferenceUtil'

import App from 'containers/App'

configure({ adapter: new Adapter() })

describe('<App>', () => {
  it('should render empty', () => {
    const wrapper = shallow(
      <App store={store} noCredentials preferences={preferences} />
    )
    expect(wrapper.find('div').exists()).to.equal(false)
  })
  it('render App', (done) => {
    const wrapper = mount(
      <Provider store={store}>
        <App
          clearMessagesOnclose
          isReady
          preferences={{ openingType: 'always', welcomeMessage: 'Hello there' }}
        />
      </Provider>
    )
    const app = wrapper.find('App')
    expect(app.exists()).to.equal(true)
    expect(wrapper.find('Header').exists()).to.equal(true)
    expect(wrapper.find('Live').exists()).to.equal(true)
    wrapper.update()
    assert.isTrue(app.state('expanded'), 'Test expand open')
    app.instance().toggleChat()
    wrapper.update()
    app.setState({ expanded: false })
    wrapper.update()
    app.instance().toggleChat()
    app.instance().componentDidCatch('Testing Error handle', 'info')
    setTimeout(() => {
      wrapper.unmount()
      done()
    }, 100)
  })
  it('render App (Open from memory)', (done) => {
    const wrapper = mount(
      <Provider store={store}>
        <App
          noCredentials
          isReady
          preferences={{ openingType: 'memory' }}
        />
      </Provider>
    )
    const app = wrapper.find('App')
    expect(app.exists()).to.equal(true)
    setTimeout(() => {
      wrapper.unmount()
      done()
    }, 100)
  })
  it('render App (Open from never)', (done) => {
    let callBackRef = false
    const wrapper = mount(
      <Provider store={store}>
        <App
          isReady
          onRef={() => { callBackRef = true }}
          preferences={{ openingType: 'never' }}
        />
      </Provider>
    )
    const app = wrapper.find('App')
    expect(app.exists()).to.equal(true)
    assert.isTrue(callBackRef, 'Call Back ref test')
    wrapper.update()
    assert.isFalse(app.state('expanded'), 'Test expand never')
    setTimeout(() => {
      wrapper.unmount()
      done()
    }, 100)
  })
})
