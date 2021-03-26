export const createrPreference = (params) => {
  const { noColors, menu, headerTitle } = params
  const pref = {
    headerTitle: headerTitle || 'Chat with me!',
    expanderTitle: 'Expand',
    userInputPlaceholder: 'User',
    onboardingMessage: 'Welcome message',
    expanderLogo: '/bot.logo.png',
  }

  if (!noColors) {
    pref.accentColor = 'blue'
    pref.complementaryColor = 'red'
    pref.backgroundColor = 'white'
    pref.botMessageColor = 'gray'
    pref.botMessageBackgroundColor = 'blue'
  }
  if (menu) {
    pref.menu = { menu: {
      title: 'Menu Title',
      call_to_actions: [
        {
          type: 'nested',
          title: 'Nested Title',
          call_to_actions: [
            { type: 'postback', title: 'Nested Post back' },
          ],
        },
        { type: 'postback', title: 'Post back' },
        { type: 'Link', title: 'Link back' },
      ],
    } }
  }

  return pref
}

export let preferences = createrPreference({ noColors: false })
export const resetPreferences = () => {
  preferences = createrPreference({ noColors: false })
}
