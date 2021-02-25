import { assert } from 'chai'
import sinon from 'sinon'
import nock from 'nock'

import apiMiddleware from 'middlewares/api'

describe('Middleware::Api', () => {
  let nockScope
  describe('Conversation Tests', () => {
    beforeEach(() => {
      nockScope = nock('https://api.cai.tools.sap')
        .post('/connect/v1/webhook/channelId/conversations')
    })
    afterEach(() => {
      nock.cleanAll()
    })
    it('should pass the intercepted action to next', () => {
      nockScope = nockScope.reply(200, { status: 'ok' })
      const nextArgs = []
      const fakeNext = (...args) => {
        nextArgs.push(args)
      }
      const fakeStore = { getState: () => { /* */ } }

      const action = { type: 'SET_MESSAGES' }
      apiMiddleware(fakeStore)(fakeNext)(action)
      assert.lengthOf(nextArgs, 1)
    })

    it('should pass the intercepted action to next 2', () => {
      nockScope = nockScope.reply(200, { status: 'ok' })
      const fakeStore = { getState: () => { /* */ } }
      const fakeNext = sinon.spy()

      const action = { type: 'SET_MESSAGES' }
      apiMiddleware(fakeStore)(fakeNext)(action)

      assert.ok(fakeNext.withArgs(action).calledOnce,
        'action passed to next, once')
    })

    it('should call url with error', (done) => {
      nockScope = nockScope.reply(400, { status: 'Bad Request' })
      const fakeNext = (...args) => { /* */ }
      const dispatch = (data) => {
        return data.foo.none
      }
      const fakeStore = { dispatch, getState: () => { /* */ } }
      const action = { type: 'API:BAD_POST', payload: { query: 'hdkhdkjsadhkjd' } }

      const call = apiMiddleware(fakeStore)(fakeNext)(action)
      call.then(
        _ => {
          assert.isTrue(false)
          done()
        },
        _ => {
          assert.isTrue(true)
          done()
        },
      )
    })

    it('should call url with success', (done) => {
      nockScope = nockScope.reply(200, { status: 'ok' })
      const fakeNext = (...args) => { /* */ }
      const dispatch = (args) => { /* */ }
      const fakeStore = { dispatch, getState: () => { /* */ } }
      const action = {
        type: 'API:CREATE_CONVERSATION',
        payload: {
          url: '/webhook/channelId/conversations',
          method: 'post',
          headers: { Authorization: 'token', 'X-Request-Token': 'token' },
        },
      }
      const call = apiMiddleware(fakeStore)(fakeNext)(action)
      call.then(
        _ => {
          assert.isTrue(true)
          done()
        },
        err => {
          console.error('ERROR:', err)
          assert.isTrue(false)
          done()
        },
      )
    })
  })
})
