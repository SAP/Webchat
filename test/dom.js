const jsdom = require('jsdom')
const { JSDOM } = jsdom

import 'mock-local-storage'
// Need to test the feature code in development mode and will test the url parameters
process.env.NODE_ENV = 'development'
process.env.LOG_LEVELS = 32 // Errors only
const virtualConsole = new jsdom.VirtualConsole()
const window = new JSDOM('<!doctype html><html><head></head><body></body></html>', {
  pretendToBeVisual: true,
  url: 'https://cai.tools.sap/resources/webclient/webclient.html?caiwebfeatures=mochaTestUrlParamsFeature',
  contentType: 'text/html',
  includeNodeLocations: true,
  omitJSDOMErrors: false,
  virtualConsole,
}).window

// see https://github.com/enzymejs/enzyme/blob/master/docs/guides/jsdom.md
function copyProps (src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  })
}

// window.parent = parent
global.window = window
global.document = window.document
global.requestAnimationFrame = () => { /* do nothing */ }
global.navigator = {
  userAgent: 'node.js',
  platform: 'MacIntel',
  appVersion: '5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36',
}
window.StyleMedia = 'Edge 12' // Indicate edge browser for better code coverage
window.document.documentMode = 'Edge'
window.opera = false
window.opr = {}
global.sap = { ui: {} }
window.open = () => { /* do nothing */ }
window.onerror = function (err) { console.warn(`Error (disregard): ${err}`) }
window.onwarn = function (warn) { console.warn(`WARNING: ${warn}`) }
window.oninfo = function (info) { console.info(`INFO: ${info}`) }
window.Modernizr = {}
window.chrome = { runtime: true }
window.origin = 'https://api.cai.tools.sap'
window.webchatMethods = {
  getMemory: (conversationId) => {
    const memory = { userName: 'Dominik Bousquet', userId: 123456 }
    return { memory, merge: true }
  },
}
window.matchMedia = function () {
  return {
    matches: false,
    addListener () { /* */ },
    removeListener () { /* */ },
  }
}
Object.defineProperty(window, 'localStorage', { value: global.localStorage, configurable: true, enumerable: true, writable: true })
copyProps(window, global)
