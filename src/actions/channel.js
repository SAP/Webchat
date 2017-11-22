import config from '../config'

const defaultPreferences = {
  primaryColor: '',                                                                                                                                                                                                                                                       
  secondaryColor: '',                                                                                                                                                                                                                                                     
  userIconUrl: '',                                                                                                                                                                                                                                                        
  botIconUrl: '',                                                                                                                                                                                                                                                         
  launcherIconUrl: '',                                                                                                                                                                                                                                                    
  headerImageUrl: '',                                                                                                                                                                                                                                                     
  webchatTitle: '',                                                                                                                                                                                                                                                       
  timeToLive: '',
}

export const getChannelPreferences = (channelId, token) => fetch(
  `${config.apiUrl}/webhook/${channelId}/preferences`,
  {
    method: 'get',
    headers: {
      Authorization: token,
      Accept: 'application/json',
    },
  }
).then(res => res.json())
 .then(data => ({ ...data.results, ...defaultPreferences }))
