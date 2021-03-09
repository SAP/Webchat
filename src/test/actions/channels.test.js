
import chai, { assert, expect } from 'chai'
import like from 'chai-like'
import nock from 'nock'

chai.use(like)

import * as channel from 'actions/channel'

process.on('unhandledRejection', () => {
  // ignore the promise reject since we only testing the post part for now. console.info(err)
})

describe('Action Channel', () => {
  it('should render a valid getChannelPreferences action', (done) => {
    const channelId = 'TestChannelId'
    const token = 'TestTokenId'
    const getChannelPreferencesAction = channel.getChannelPreferences(channelId, token)
    getChannelPreferencesAction.then((data) => {
      console.info('Return data in channel test', data)
      done()
    }).catch(_ => {
      assert.isTrue(_.response.status === 404)
      done()
    })
  })

  it('should get preferences', (done) => {
    let nockScope = nock('https://api.cai.tools.sap')
    nockScope = nockScope.get('/connect/v1/webhook/channelId/preferences')
    const response = {
      message: 'Preferences successfully rendered',
      results: { pref1: 'value1' },
    }
    nockScope.reply(200, response)
    channel.getChannelPreferences('channelId', 'token').then((data) => {
      expect(data).to.be.like(response.results)
      done()
    }).catch(_ => {
      console.log(_)
      assert.isTrue(false)
      done()
    })
  })
})
