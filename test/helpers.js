// require('@babel/register')({
//   extends: './.babelrc',
//   ignore: [/node_modules\/(?!(ramda|@webcomponents\/shadycss|lit-html|@polymer|@ui5|)\/).*/],
// })

import sinon from 'sinon'
import { expect } from 'chai'
import { mount, render, shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })
global.axios = require('axios')
global.axios.defaults.adapter = require('axios/lib/adapters/http')
global.expect = expect
global.sinon = sinon
global.mount = mount
global.render = render
global.shallow = shallow
