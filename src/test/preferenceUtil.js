export const createrPreference = (params) => {
  const { noColors, menu, headerTitle } = params
  const preferences = {
    headerTitle: headerTitle || 'Chat with me!',
    expanderTitle: 'Expand',
    userInputPlaceholder: 'User',
    onboardingMessage: 'Welcome message',
    expanderLogo: '/bot.logo.png',
  }

  if (!noColors) {
    preferences.accentColor = 'blue'
    preferences.complementaryColor = 'red'
    preferences.backgroundColor = 'white'
    preferences.botMessageColor = 'gray'
    preferences.botMessageBackgroundColor = 'blue'
  }
  if (menu) {
    preferences.menu = { menu: {
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

  return preferences
}

export let preferences = createrPreference({ noColors: false })
export const resetPreferences = () => {
  preferences = createrPreference({ noColors: false })
}
