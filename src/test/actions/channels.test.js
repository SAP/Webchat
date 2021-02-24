import * as channel from 'actions/channel'
import chai, { expect } from 'chai'
import like from 'chai-like'

chai.use(like)

process.on('unhandledRejection', () => {
  // ignore the promise reject since we only testing the post part for now. console.info(err)
})

describe('Action Channel', () => {
  // it('should render a valid getChannelPreferences action', (done) => {
  //   const channelId = 'TestChannelId'
  //   const token = 'TestTokenId'
  //   channel.getChannelPreferences(channelId, token).then((getChannelPreferencesAction) => {
  //     const expectedAction = {
  //       type: 'API:GET_CHANNEL_PREFERENCES',
  //       payload: {
  //         url: `/webhook/${channelId}/preferences`,
  //         method: 'get',
  //       },
  //     }
  //     expect(getChannelPreferencesAction).to.like(expectedAction)
  //     done()
  //   })
  // })
})
